// fig-tagger jsx-dev-runtime: stamps host elements with data-fig-loc in dev.
// Bundler-agnostic: Babel/SWC/esbuild all emit jsxDEV(type, props, key, isStatic,
// source) in development, so this works for any React template (Vite, Next, ...).
// Production builds compile to jsx/jsxs and never import this module.
import * as ReactJSXDev from 'react/jsx-dev-runtime';

export const Fragment = ReactJSXDev.Fragment;

// Tag user code only; library internals (incl. scaffold shadcn ui) resolve to
// their usage site instead, which is what a visual edit should target.
const SKIP = /\/node_modules\/|\/components\/ui\//;

function figLoc(source) {
  const file = source.fileName;
  const i = file.lastIndexOf('/src/');
  const rel = i >= 0 ? file.slice(i + 1) : file.split('/').slice(-2).join('/');
  return rel + ':' + source.lineNumber + ':' + source.columnNumber;
}

export function jsxDEV(type, props, key, isStaticChildren, source, self) {
  if (typeof type === 'string' && source && source.fileName && !SKIP.test(source.fileName)) {
    props = { ...props, 'data-fig-loc': figLoc(source) };
  }
  return ReactJSXDev.jsxDEV(type, props, key, isStaticChildren, source, self);
}
