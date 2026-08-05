/**
 * Section: Hero — the page's opening statement: eyebrow kicker, the single
 * h1, supporting subline, up to two CTAs (real Buttons, never bare text
 * links), and an optional image.
 *
 * Variants:
 * - `backgroundImage` — full-bleed photo behind the copy under a
 *   luminance-stable dark scrim; the cinematic default for visually-led
 *   businesses (photography, food, travel, real estate, …). Copy renders
 *   in `text-white` over the scrim — the scrim always darkens the photo,
 *   so white copy holds in light AND dark themes (a foreground-toned scrim
 *   inverts to a white-out on dark-first themes). Bare white is acceptable
 *   ONLY over this scrim. Takes precedence over `image`/`layout`.
 * - `layout="center"` (default) — stacked and centered; height is budgeted
 *   (min-h clamp + capped padding) so a text-only hero never balloons into
 *   empty whitespace. When `image` is set it renders below the copy.
 * - `layout="split"` — copy left, `image` right on md+.
 *
 * Customize copy/props/imagery — preserve structure, spacing rhythm, and
 * a11y (this renders the page's only h1; keep image `alt` text meaningful).
 */
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface HeroCta {
  label: string
  href?: string
  onClick?: () => void
}

export interface HeroProps {
  /** Short kicker rendered as an uppercase accent line above the headline. */
  eyebrow?: string
  headline: string
  subline?: string
  primaryCta?: HeroCta
  secondaryCta?: HeroCta
  /** Supporting visual inside the layout; `alt` is required for screen readers. */
  image?: { src: string; alt: string }
  /** Full-bleed photo behind the copy (cinematic; wins over `image`/`layout`). */
  backgroundImage?: { src: string; alt: string }
  layout?: 'center' | 'split'
  id?: string
  className?: string
}

function CtaButton({
  cta,
  secondary = false,
  onImage = false,
}: {
  cta: HeroCta
  secondary?: boolean
  onImage?: boolean
}) {
  const variant = secondary ? 'outline' : 'default'
  // Over the photo scrim the outline variant's --background fill goes
  // white-on-white; the ghost pattern keeps the secondary CTA legible.
  const ghostClassName =
    secondary && onImage
      ? 'border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white'
      : undefined
  if (cta.href) {
    return (
      <Button asChild size="lg" variant={variant} className={ghostClassName}>
        <a href={cta.href} onClick={cta.onClick}>
          {cta.label}
        </a>
      </Button>
    )
  }
  return (
    <Button
      size="lg"
      variant={variant}
      className={ghostClassName}
      onClick={cta.onClick}
    >
      {cta.label}
    </Button>
  )
}

// fig-entrance: hero-copy-rise — the copy block fades and rises at mount
// (animate-in utilities below); reduced motion renders it statically.
export function Hero({
  eyebrow,
  headline,
  subline,
  primaryCta,
  secondaryCta,
  image,
  backgroundImage,
  layout = 'center',
  id = 'hero',
  className,
}: HeroProps) {
  const onImage = Boolean(backgroundImage)
  const split = !onImage && layout === 'split' && Boolean(image)

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn(
        'overflow-hidden bg-background',
        onImage && 'relative isolate',
        className,
      )}
    >
      {backgroundImage ? (
        <>
          <img
            src={backgroundImage.src}
            alt={backgroundImage.alt}
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
          {/* Luminance-stable scrim: always darkens the photo so white copy
              stays legible in light and dark themes alike. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/55 to-black/30"
          />
        </>
      ) : null}
      <div
        className={cn(
          'mx-auto max-w-6xl px-4 sm:px-6 lg:px-8',
          onImage &&
            'flex min-h-[clamp(28rem,72svh,44rem)] flex-col items-center justify-center py-16 text-center sm:py-20',
          split &&
            'grid items-center gap-10 py-16 sm:py-24 md:grid-cols-2 lg:gap-16 lg:py-28',
          !onImage &&
            !split &&
            'flex flex-col items-center py-16 text-center sm:py-20 lg:py-24',
          !onImage &&
            !split &&
            !image &&
            'min-h-[clamp(22rem,52svh,36rem)] justify-center',
        )}
      >
        <div
          className={cn(
            'flex max-w-2xl flex-col gap-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 motion-reduce:animate-none',
            !split && 'items-center',
          )}
        >
          {eyebrow ? (
            <p
              className={cn(
                'text-sm font-semibold uppercase tracking-widest',
                onImage ? 'text-white/80' : 'text-primary',
              )}
            >
              {eyebrow}
            </p>
          ) : null}
          <h1
            id={`${id}-heading`}
            className={cn(
              'font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl',
              onImage ? 'text-white' : 'text-foreground',
            )}
          >
            {headline}
          </h1>
          {subline ? (
            <p
              className={cn(
                'max-w-xl text-lg text-pretty sm:text-xl',
                onImage ? 'text-white/85' : 'text-secondary-foreground',
              )}
            >
              {subline}
            </p>
          ) : null}
          {primaryCta || secondaryCta ? (
            <div
              className={cn(
                'flex flex-col gap-3 sm:flex-row',
                !split && 'sm:justify-center',
              )}
            >
              {primaryCta ? <CtaButton cta={primaryCta} /> : null}
              {secondaryCta ? (
                <CtaButton cta={secondaryCta} secondary onImage={onImage} />
              ) : null}
            </div>
          ) : null}
        </div>

        {!onImage && image ? (
          <div
            className={cn(
              'w-full animate-in fade-in-0 duration-700 motion-reduce:animate-none',
              !split && 'mt-12 max-w-4xl',
            )}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="aspect-[4/3] w-full rounded-xl border border-border object-cover shadow-sm"
            />
          </div>
        ) : null}
      </div>
    </section>
  )
}
