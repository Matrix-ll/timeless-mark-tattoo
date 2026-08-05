/**
 * Scroll substrate: gsap + ScrollTrigger, with opt-in Lenis smooth scroll.
 *
 * Always import from here — `import { gsap, ScrollTrigger } from '@/lib/scroll'`
 * — and never call gsap.registerPlugin(ScrollTrigger) yourself: this module
 * registers the plugin exactly once for the whole app (registerPlugin is
 * idempotent, and the registration is SSR-guarded).
 *
 * Smooth scroll is a PER-SITE choice, never a default. Sites that want it
 * opt in from one top-level client effect:
 *
 *   useEffect(() => initSmoothScroll(), [])
 *
 * initSmoothScroll() starts Lenis on its own rAF loop, keeps ScrollTrigger
 * in sync on every Lenis scroll, and returns a destroy function (hand it
 * straight to the effect cleanup, as above). It respects reduced motion by
 * no-oping: native scroll stays untouched and the destroy is a no-op too.
 */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export { gsap, ScrollTrigger }

export interface SmoothScrollOptions {
  /** Lenis easing duration in seconds; the default is a gentle 1.1. */
  duration?: number
}

export function initSmoothScroll(options: SmoothScrollOptions = {}): () => void {
  if (
    typeof window === 'undefined' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return () => {}
  }
  const lenis = new Lenis({ duration: options.duration ?? 1.1 })
  lenis.on('scroll', ScrollTrigger.update)
  // The scaffold's base CSS sets `scroll-behavior: smooth`; Lenis drives the
  // scroll position every frame, so native smooth easing would fight it.
  const html = document.documentElement
  const previousScrollBehavior = html.style.scrollBehavior
  html.style.scrollBehavior = 'auto'
  let frame = requestAnimationFrame(function loop(time) {
    lenis.raf(time)
    frame = requestAnimationFrame(loop)
  })
  return () => {
    cancelAnimationFrame(frame)
    lenis.destroy()
    html.style.scrollBehavior = previousScrollBehavior
    ScrollTrigger.refresh()
  }
}
