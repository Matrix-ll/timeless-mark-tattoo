// fig-inspector: visual-edit bridge injected into the dev preview (never built).
// Framework-agnostic (pure DOM). Speaks postMessage to the parent app across the
// cross-origin iframe boundary; the parent initiates via fig:init and every
// subsequent message is checked against that origin + nonce.
(() => {
  'use strict';
  if (window.top === window) return; // only meaningful inside the preview iframe
  if (window.__figInspector) return; // idempotent across duplicate injection
  window.__figInspector = true;

  const PROTOCOL_VERSION = 1;
  const CHILD = 'fig-inspector';
  const PARENT = 'fig-parent';
  const TEXT_LIMIT = 300;
  const HTML_LIMIT = 1200;

  let parentOrigin = null;
  let nonce = null;
  let editMode = false;
  let hoverEl = null;
  let selectedEl = null;

  // editId -> { el, saved: [{kind, prop?, value, priority?}] } for optimistic patches
  const patches = new Map();

  // ---------- messaging ----------

  function post(type, payload) {
    if (!parentOrigin) return;
    window.parent.postMessage({ source: CHILD, type, nonce, payload }, parentOrigin);
  }

  window.addEventListener('message', (e) => {
    const d = e.data;
    if (!d || typeof d !== 'object' || d.source !== PARENT || typeof d.type !== 'string') return;
    if (d.type === 'fig:init') {
      // First contact wins and pins the trusted origin for the whole session.
      if (parentOrigin && e.origin !== parentOrigin) return;
      parentOrigin = e.origin;
      nonce = d.nonce;
      post('fig:ready', { protocolVersion: PROTOCOL_VERSION });
      return;
    }
    if (e.origin !== parentOrigin || d.nonce !== nonce) return;
    handle(d.type, d.payload || {});
  });

  // Announce presence so the parent knows to send fig:init. Carries no data, so
  // the '*' target is safe; nothing else is ever posted before init pins origin.
  window.parent.postMessage({ source: CHILD, type: 'fig:hello' }, '*');

  function handle(type, p) {
    switch (type) {
      case 'fig:edit-mode':
        setEditMode(!!p.enabled);
        break;
      case 'fig:apply-patch':
        applyPatch(p);
        break;
      case 'fig:revert-patch':
        revertPatch(p.editId);
        break;
      case 'fig:revert-all':
        for (const id of Array.from(patches.keys())) revertPatch(id);
        break;
      case 'fig:annotate':
        setAnnotations(Array.isArray(p.items) ? p.items : []);
        break;
    }
  }

  // ---------- element identity ----------

  // Repeated JSX (list .map) shares one data-fig-loc; nth disambiguates the instance.
  function locPeers(loc) {
    return document.querySelectorAll('[data-fig-loc="' + CSS.escape(loc) + '"]');
  }

  function findTarget(figLoc, nth) {
    if (!figLoc) return null;
    return locPeers(figLoc)[nth || 0] || null;
  }

  // Untagged elements (e.g. framer-motion media) are addressed by the
  // structural selector the inspector itself generated.
  function findAnnotationTarget(item) {
    const el = findTarget(item.figLoc, item.nth);
    if (el) return el;
    if (!item.selectorPath) return null;
    try {
      return document.querySelector(item.selectorPath);
    } catch {
      return null;
    }
  }

  // Resolve a raw event target to the editable element: nearest tagged ancestor,
  // else the element itself (fallback mode), never our own overlay or the root.
  // Media elements win over their tagged ancestor: an untagged <img> (e.g. a
  // framer-motion component the tagger can't stamp) is still what the user
  // means when they click it — selector-path fallback covers agent targeting.
  function resolve(target) {
    if (!(target instanceof Element) || layer.contains(target)) return null;
    const media = target.closest('img, video');
    if (media && !media.hasAttribute('data-fig-loc')) return media;
    const tagged = target.closest('[data-fig-loc]');
    if (tagged) return tagged;
    if (target === document.documentElement || target === document.body) return null;
    return target;
  }

  // Click offset within the selected element — the parent anchors its floating
  // panel here (element-relative so it rides fig:rect updates through scroll).
  let lastClickOffset = null;

  function describe(el) {
    const figLoc = el.getAttribute('data-fig-loc') || null;
    let nth = 0;
    let count = 1;
    if (figLoc) {
      const peers = locPeers(figLoc);
      count = peers.length;
      nth = Array.prototype.indexOf.call(peers, el);
    }
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    const text = (el.textContent || '').trim();
    // Own text nodes only — lets the parent show text controls for real text
    // elements but not for containers whose text lives in children.
    let direct = '';
    for (const node of el.childNodes) {
      if (node.nodeType === Node.TEXT_NODE) direct += node.textContent || '';
    }
    return {
      figLoc,
      nth,
      count,
      tag: el.tagName.toLowerCase(),
      component: null,
      rect: { x: r.x, y: r.y, width: r.width, height: r.height },
      click: lastClickOffset,
      textContent: text.slice(0, TEXT_LIMIT),
      directText: direct.trim().slice(0, TEXT_LIMIT),
      imgSrc: el instanceof HTMLImageElement ? el.currentSrc || el.src : undefined,
      classList: Array.prototype.slice.call(el.classList, 0, 30),
      selectorPath: cssPath(el),
      outerHTMLExcerpt: el.outerHTML.slice(0, HTML_LIMIT),
      computedStyle: {
        color: cs.color,
        background: cs.backgroundColor,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        fontFamily: cs.fontFamily,
        textAlign: cs.textAlign,
        textDecoration: cs.textDecorationLine,
        borderColor: cs.borderTopColor,
        borderStyle: cs.borderTopStyle,
        borderWidth: cs.borderTopWidth,
        borderRadius: cs.borderTopLeftRadius,
        display: cs.display,
        opacity: cs.opacity,
        paddingTop: cs.paddingTop,
        paddingRight: cs.paddingRight,
        paddingBottom: cs.paddingBottom,
        paddingLeft: cs.paddingLeft,
        marginTop: cs.marginTop,
        marginRight: cs.marginRight,
        marginBottom: cs.marginBottom,
        marginLeft: cs.marginLeft,
        width: cs.width,
        height: cs.height,
      },
    };
  }

  // Structural fallback anchor for untagged elements (non-React templates etc).
  function cssPath(el) {
    const parts = [];
    let node = el;
    while (node instanceof Element && node !== document.body && parts.length < 6) {
      let part = node.tagName.toLowerCase();
      const parent = node.parentElement;
      if (parent) {
        const siblings = Array.prototype.filter.call(
          parent.children,
          (c) => c.tagName === node.tagName,
        );
        if (siblings.length > 1) part += ':nth-of-type(' + (siblings.indexOf(node) + 1) + ')';
      }
      parts.unshift(part);
      node = node.parentElement;
    }
    return parts.join(' > ');
  }

  // ---------- optimistic patches ----------

  function applyPatch(p) {
    const editId = p.editId;
    const target = p.target || {};
    if (!editId) return;
    revertPatch(editId); // re-apply semantics: a tweaked edit replaces its old patch
    const el = findTarget(target.figLoc, target.nth) || (selectedEl && selectedEl.isConnected ? selectedEl : null);
    if (!el) {
      post('fig:patch-failed', { editId });
      return;
    }
    const patch = p.patch || {};
    const saved = [];
    for (const key of Object.keys(patch.style || {})) {
      const prop = key.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
      saved.push({
        kind: 'style',
        prop,
        value: el.style.getPropertyValue(prop),
        priority: el.style.getPropertyPriority(prop),
      });
      el.style.setProperty(prop, String(patch.style[key]));
    }
    if (patch.text != null) {
      saved.push({ kind: 'text', value: el.textContent });
      el.textContent = patch.text;
    }
    if (patch.src != null && el.hasAttribute('src')) {
      saved.push({ kind: 'src', value: el.getAttribute('src') });
      el.setAttribute('src', patch.src);
    }
    patches.set(editId, { el, saved });
  }

  function revertPatch(editId) {
    const entry = patches.get(editId);
    patches.delete(editId);
    if (!entry || !entry.el.isConnected) return; // HMR replaced it; nothing to restore
    // Restore in reverse so stacked writes to the same prop unwind correctly.
    for (let i = entry.saved.length - 1; i >= 0; i--) {
      const s = entry.saved[i];
      if (s.kind === 'style') entry.el.style.setProperty(s.prop, s.value, s.priority);
      else if (s.kind === 'text') entry.el.textContent = s.value;
      else if (s.kind === 'src') {
        if (s.value == null) entry.el.removeAttribute('src');
        else entry.el.setAttribute('src', s.value);
      }
    }
  }

  // ---------- overlay ----------

  const layer = document.createElement('div');
  layer.setAttribute('data-fig-overlay', '');
  layer.style.cssText =
    'position:fixed;inset:0;pointer-events:none;z-index:2147483646;display:none;';

  function makeBox(outline, bg) {
    const b = document.createElement('div');
    b.style.cssText =
      'position:fixed;display:none;box-sizing:border-box;outline:' + outline +
      ';outline-offset:-1px;background:' + bg + ';';
    layer.appendChild(b);
    return b;
  }

  const hoverBox = makeBox('1.5px dashed #3b82f6', 'rgba(59,130,246,0.08)');
  const selectBox = makeBox('2px solid #2563eb', 'transparent');
  const badge = document.createElement('div');
  badge.style.cssText =
    'position:fixed;display:none;background:#2563eb;color:#fff;font:600 10px/1 ' +
    'system-ui,sans-serif;padding:3px 6px;border-radius:4px;white-space:nowrap;';
  layer.appendChild(badge);

  function placeBox(box, el) {
    if (!el || !el.isConnected) {
      box.style.display = 'none';
      return;
    }
    const r = el.getBoundingClientRect();
    box.style.display = 'block';
    box.style.left = r.left + 'px';
    box.style.top = r.top + 'px';
    box.style.width = r.width + 'px';
    box.style.height = r.height + 'px';
  }

  // Manus-style comment pills pinned to their elements while edits are queued.
  let annotationPills = [];
  function setAnnotations(items) {
    for (const pill of annotationPills) pill.node.remove();
    annotationPills = items.map((item) => {
      const node = document.createElement('div');
      node.textContent = String(item.label || '').slice(0, 40);
      node.style.cssText =
        'position:fixed;display:none;background:#2563eb;color:#fff;font:500 11px/1 ' +
        'system-ui,sans-serif;padding:4px 9px;border-radius:999px;white-space:nowrap;' +
        'max-width:220px;overflow:hidden;text-overflow:ellipsis;box-shadow:0 2px 8px rgba(0,0,0,0.25);';
      layer.appendChild(node);
      return { item, node };
    });
  }

  function placePills() {
    for (const pill of annotationPills) {
      const el = findAnnotationTarget(pill.item);
      if (!el || !el.isConnected) {
        pill.node.style.display = 'none';
        continue;
      }
      const r = el.getBoundingClientRect();
      pill.node.style.display = 'block';
      pill.node.style.left = Math.max(4, r.left - 6) + 'px';
      pill.node.style.top = Math.max(4, r.top - 12) + 'px';
    }
  }

  let raf = 0;
  let lastRect = null;
  let lastRectPostAt = 0;
  // Stream the selected element's rect (throttled, on real movement) so the
  // parent's floating panel stays glued through scroll and layout shifts.
  function maybePostRect() {
    if (!selectedEl || !selectedEl.isConnected) return;
    const now = Date.now();
    if (now - lastRectPostAt < 120) return;
    const r = selectedEl.getBoundingClientRect();
    if (
      lastRect &&
      Math.abs(r.x - lastRect.x) < 1 &&
      Math.abs(r.y - lastRect.y) < 1 &&
      Math.abs(r.width - lastRect.width) < 1 &&
      Math.abs(r.height - lastRect.height) < 1
    ) {
      return;
    }
    lastRect = r;
    lastRectPostAt = now;
    post('fig:rect', { rect: { x: r.x, y: r.y, width: r.width, height: r.height } });
  }

  function frame() {
    placeBox(hoverBox, hoverEl !== selectedEl ? hoverEl : null);
    placeBox(selectBox, selectedEl);
    placePills();
    maybePostRect();
    const badgeFor = hoverEl || selectedEl;
    if (badgeFor && badgeFor.isConnected) {
      const r = badgeFor.getBoundingClientRect();
      badge.style.display = 'block';
      badge.textContent = badgeFor.tagName.toLowerCase();
      badge.style.left = r.left + 'px';
      badge.style.top = Math.max(0, r.top - 20) + 'px';
    } else {
      badge.style.display = 'none';
    }
    if (editMode) raf = requestAnimationFrame(frame);
  }

  // ---------- edit mode ----------

  function setEditMode(enabled) {
    if (editMode === enabled) return;
    editMode = enabled;
    layer.style.display = enabled ? 'block' : 'none';
    if (enabled) {
      if (!layer.isConnected) document.documentElement.appendChild(layer);
      raf = requestAnimationFrame(frame);
    } else {
      cancelAnimationFrame(raf);
      hoverEl = null;
      setSelected(null);
    }
  }

  function setSelected(el) {
    if (selectedEl === el) return;
    selectedEl = el;
    if (el) post('fig:selected', describe(el));
    else post('fig:deselected', {});
  }

  function onMove(e) {
    if (!editMode) return;
    const el = resolve(e.target);
    if (el !== hoverEl) {
      hoverEl = el;
      if (el) {
        const loc = el.getAttribute('data-fig-loc');
        const r = el.getBoundingClientRect();
        post('fig:hover', {
          figLoc: loc,
          tag: el.tagName.toLowerCase(),
          rect: { x: r.x, y: r.y, width: r.width, height: r.height },
        });
      }
    }
  }

  function onClick(e) {
    if (!editMode) return;
    // Swallow the interaction entirely: edit mode must never navigate or submit.
    e.preventDefault();
    e.stopImmediatePropagation();
    const el = resolve(e.target);
    if (el) {
      const r = el.getBoundingClientRect();
      lastClickOffset = { dx: e.clientX - r.left, dy: e.clientY - r.top };
      setSelected(el);
    }
  }

  function onKey(e) {
    if (!editMode) return;
    if (e.key === 'Escape') setSelected(null);
  }

  document.addEventListener('mousemove', onMove, true);
  document.addEventListener('click', onClick, true);
  document.addEventListener('submit', (e) => editMode && e.preventDefault(), true);
  document.addEventListener('keydown', onKey, true);
})();
