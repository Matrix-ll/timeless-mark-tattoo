/**
 * Section: Nav — top navigation bar with brand, links, an optional CTA, and
 * an accessible mobile disclosure menu.
 *
 * Variants: `sticky` (default true) pins the bar with a translucent blur;
 * pass `sticky={false}` for a static bar.
 *
 * Customize copy/props/imagery — preserve structure, spacing rhythm, and
 * a11y (the <nav> landmark, aria-expanded/aria-controls on the toggle, and
 * focus-visible rings inherited from the primitives).
 */
import * as React from 'react'
import { Menu, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface NavLink {
  label: string
  href: string
}

export interface NavProps {
  /** Brand name rendered next to the optional logo; links to `brandHref`. */
  brand: string
  brandHref?: string
  /** Optional logo image; supply meaningful `logoAlt` whenever this is set. */
  logoSrc?: string
  logoAlt?: string
  links?: readonly NavLink[]
  cta?: { label: string; href: string }
  /** Pin the bar to the top of the viewport. Default: true. */
  sticky?: boolean
  className?: string
}

export function Nav({
  brand,
  brandHref = '/',
  logoSrc,
  logoAlt = '',
  links = [],
  cta,
  sticky = true,
  className,
}: NavProps) {
  const [open, setOpen] = React.useState(false)
  const menuId = React.useId()

  return (
    <header
      className={cn(
        'z-50 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        sticky && 'sticky top-0',
        className,
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8"
      >
        <a
          href={brandHref}
          className="flex items-center gap-2 rounded-md font-display text-lg font-semibold tracking-tight text-foreground outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          {logoSrc ? (
            <img
              src={logoSrc}
              alt={logoAlt}
              className="size-8 rounded-md object-contain"
            />
          ) : null}
          <span>{brand}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-secondary-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {cta ? (
            <Button asChild className="hidden md:inline-flex">
              <a href={cta.href}>{cta.label}</a>
            </Button>
          ) : null}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      {open ? (
        <div
          id={menuId}
          className="border-t border-border md:hidden animate-in fade-in-0 slide-in-from-top-2 duration-200 motion-reduce:animate-none"
        >
          <ul className="flex flex-col gap-1 px-4 py-4 sm:px-6">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-secondary-foreground transition-colors outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            {cta ? (
              <li className="pt-2">
                <Button asChild className="w-full">
                  <a href={cta.href} onClick={() => setOpen(false)}>
                    {cta.label}
                  </a>
                </Button>
              </li>
            ) : null}
          </ul>
        </div>
      ) : null}
    </header>
  )
}
