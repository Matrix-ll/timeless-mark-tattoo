/**
 * Audited section compositions — token-wired, responsive, accessible.
 * Compose pages from these and customize via props; reach for the ui
 * primitives directly only when no section fits.
 */
export { Nav } from './nav'
export type { NavLink, NavProps } from './nav'

export { Hero } from './hero'
export type { HeroCta, HeroProps } from './hero'

export { Features } from './features'
export type { FeatureItem, FeaturesProps } from './features'

export { Testimonials } from './testimonials'
export type { TestimonialItem, TestimonialsProps } from './testimonials'

export { LeadForm } from './lead-form'
export type { LeadFormProps, LeadFormValues } from './lead-form'

export { Footer } from './footer'
export type { FooterLink, FooterLinkGroup, FooterProps } from './footer'

// Scroll-reveal substrate — below-the-fold sections and item grids reveal
// by default; the hero animates at mount instead (see reveal.tsx).
export { Reveal, RevealGroup } from './reveal'
export type { RevealGroupProps, RevealProps } from './reveal'

// Ambient shader-gradient substrate — a slow-drifting color field built
// from the brand tokens, composed behind a hero or section as a background
// layer (see ambient-gradient.tsx for the fallback story).
export { AmbientGradient } from './ambient-gradient'
export type { AmbientGradientProps } from './ambient-gradient'
