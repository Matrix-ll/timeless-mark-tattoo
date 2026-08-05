/**
 * Section: Testimonials — heading plus a responsive grid of quote cards with
 * attribution (avatar, name, role).
 *
 * Variants: none beyond the item count — 1 item reads as a spotlight, 2–3
 * as a grid (two columns on md+, three on lg+ when there are 3+ items).
 *
 * Motion: cards reveal on scroll (staggered fade + rise via RevealGroup,
 * once only); reduced motion renders them statically.
 *
 * Customize copy/props/imagery — preserve structure, spacing rhythm, and
 * a11y (figure/blockquote/figcaption semantics, avatar alt text).
 */
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

import { RevealGroup } from './reveal'

export interface TestimonialItem {
  quote: string
  name: string
  role?: string
  /** Headshot for the attribution; `avatarAlt` defaults to the name. */
  avatarSrc?: string
  avatarAlt?: string
}

export interface TestimonialsProps {
  heading: string
  subheading?: string
  items: readonly TestimonialItem[]
  id?: string
  className?: string
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export function Testimonials({
  heading,
  subheading,
  items,
  id = 'testimonials',
  className,
}: TestimonialsProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn('bg-background', className)}
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto flex max-w-2xl flex-col gap-4 text-center">
          <h2
            id={`${id}-heading`}
            className="font-display text-3xl font-bold tracking-tight text-balance text-foreground sm:text-4xl"
          >
            {heading}
          </h2>
          {subheading ? (
            <p className="text-lg text-pretty text-secondary-foreground">
              {subheading}
            </p>
          ) : null}
        </div>

        <RevealGroup
          className={cn(
            'mt-12 grid gap-6 md:grid-cols-2',
            items.length >= 3 && 'lg:grid-cols-3',
          )}
          itemClassName="h-full"
        >
          {items.map((item) => (
            <Card key={item.name} className="h-full">
              <CardContent className="flex h-full flex-col gap-6 pt-6">
                <figure className="flex h-full flex-col gap-6">
                  <blockquote className="flex-1 text-base leading-relaxed text-pretty text-foreground">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                  <figcaption className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      {item.avatarSrc ? (
                        <AvatarImage
                          src={item.avatarSrc}
                          alt={item.avatarAlt ?? item.name}
                        />
                      ) : null}
                      <AvatarFallback>{initials(item.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-foreground">
                        {item.name}
                      </span>
                      {item.role ? (
                        <span className="text-sm text-secondary-foreground">
                          {item.role}
                        </span>
                      ) : null}
                    </div>
                  </figcaption>
                </figure>
              </CardContent>
            </Card>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
