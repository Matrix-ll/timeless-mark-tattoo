/**
 * Section substrate: Reveal / RevealGroup — scroll-triggered entrances.
 *
 * Below-the-fold sections and item grids get reveals BY DEFAULT: content
 * fades and rises into place as it enters the viewport, once only. The hero
 * is the exception — its content is visible before any scroll, so it
 * animates at mount (tailwindcss-animate `animate-in`), never on scroll. Never
 * scroll-jack: reveals ease content in as the user scrolls normally — no
 * pinning, no hijacked wheel, no parallax choreography.
 *
 * - `Reveal` — one gentle fade + rise for a whole block (a section's inner
 *   container, a form card, the footer).
 * - `RevealGroup` — staggered container for grids: each child gets its own
 *   `Reveal` with a per-index delay, so cards appear one after another as
 *   the grid enters the viewport.
 *
 * Reduced motion: both bail to static rendering (same DOM, no transform or
 * opacity animation) when the user prefers reduced motion.
 */
import { Children } from 'react'
import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export interface RevealProps {
  children: ReactNode
  /** Seconds before the entrance starts (RevealGroup staggers via this). */
  delay?: number
  /** Initial downward offset in px; the content rises to rest. */
  y?: number
  className?: string
}

export function Reveal({ children, delay = 0, y = 24, className }: RevealProps) {
  const reducedMotion = useReducedMotion()
  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export interface RevealGroupProps {
  children: ReactNode
  /** Seconds between one child's entrance and the next. */
  stagger?: number
  /** Seconds before the first child's entrance. */
  delay?: number
  /** Initial downward offset in px for every child. */
  y?: number
  className?: string
  /** Class for each child's wrapper — e.g. `h-full` for equal-height grid cards. */
  itemClassName?: string
}

export function RevealGroup({
  children,
  stagger = 0.08,
  delay = 0,
  y = 24,
  className,
  itemClassName,
}: RevealGroupProps) {
  return (
    <div className={className}>
      {Children.map(children, (child, index) => (
        <Reveal delay={delay + index * stagger} y={y} className={itemClassName}>
          {child}
        </Reveal>
      ))}
    </div>
  )
}
