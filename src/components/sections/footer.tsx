/**
 * Section: Footer — brand column with tagline, grouped link columns, and a
 * legal bottom bar with auto-generated copyright.
 *
 * Variants: none — column count follows `linkGroups.length` (wraps 2-up on
 * mobile, all columns beside the brand on lg+).
 *
 * Motion: the footer content reveals once on scroll (one gentle fade +
 * rise via Reveal); reduced motion renders it statically.
 *
 * Customize copy/props/imagery — preserve structure, spacing rhythm, and
 * a11y (the <footer> landmark, nav labelled per group, focus-visible links).
 */
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

import { Reveal } from './reveal'

export interface FooterLink {
  label: string
  href: string
}

export interface FooterLinkGroup {
  heading: string
  links: readonly FooterLink[]
}

export interface FooterProps {
  brand: string
  tagline?: string
  linkGroups?: readonly FooterLinkGroup[]
  legalLinks?: readonly FooterLink[]
  /** Defaults to an auto-dated "© {year} {brand}. All rights reserved." */
  copyright?: string
  className?: string
}

function FooterAnchor({ link }: { link: FooterLink }) {
  return (
    <a
      href={link.href}
      className="rounded-md text-sm text-secondary-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
    >
      {link.label}
    </a>
  )
}

export function Footer({
  brand,
  tagline,
  linkGroups = [],
  legalLinks = [],
  copyright,
  className,
}: FooterProps) {
  const notice =
    copyright ??
    `© ${new Date().getFullYear()} ${brand}. All rights reserved.`

  return (
    <footer className={cn('border-t border-border bg-muted/40', className)}>
      <Reveal className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16">
          <div className="flex max-w-sm flex-col gap-3">
            <p className="font-display text-lg font-semibold tracking-tight text-foreground">
              {brand}
            </p>
            {tagline ? (
              <p className="text-sm text-pretty text-secondary-foreground">
                {tagline}
              </p>
            ) : null}
          </div>

          {linkGroups.length > 0 ? (
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              {linkGroups.map((group) => (
                <nav
                  key={group.heading}
                  aria-label={group.heading}
                  className="flex flex-col gap-3"
                >
                  <p className="text-sm font-semibold text-foreground">
                    {group.heading}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <FooterAnchor link={link} />
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          ) : null}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-secondary-foreground">{notice}</p>
          {legalLinks.length > 0 ? (
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <FooterAnchor link={link} />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Reveal>
    </footer>
  )
}
