/**
 * Section: Features — heading, optional subheading, and a responsive grid of
 * feature cards (icon, title, description).
 *
 * Variants: `columns={2 | 3}` (default 3) sets the grid width on lg+;
 * everything collapses to one column on mobile, two on sm+.
 *
 * Motion: cards reveal on scroll (staggered fade + rise via RevealGroup,
 * once only); reduced motion renders them statically.
 *
 * Customize copy/props/imagery — preserve structure, spacing rhythm, and
 * a11y (section labelled by its h2; icons are decorative and aria-hidden).
 */
import type { ReactNode } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

import { RevealGroup } from './reveal'

export interface FeatureItem {
  title: string
  description: string
  /** Decorative icon, e.g. a lucide-react icon element. */
  icon?: ReactNode
}

export interface FeaturesProps {
  heading: string
  subheading?: string
  items: readonly FeatureItem[]
  columns?: 2 | 3
  id?: string
  className?: string
}

export function Features({
  heading,
  subheading,
  items,
  columns = 3,
  id = 'features',
  className,
}: FeaturesProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn('bg-muted/40', className)}
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
            'mt-12 grid gap-6 sm:grid-cols-2 sm:gap-8',
            columns === 3 && 'lg:grid-cols-3',
          )}
          itemClassName="h-full"
        >
          {items.map((item) => (
            <Card key={item.title} className="h-full">
              <CardHeader className="space-y-4">
                {item.icon ? (
                  <span
                    aria-hidden="true"
                    className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary [&_svg]:size-5"
                  >
                    {item.icon}
                  </span>
                ) : null}
                <CardTitle className="font-display text-lg">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {item.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
