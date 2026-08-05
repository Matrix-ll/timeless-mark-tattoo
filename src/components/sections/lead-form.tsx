/**
 * Section: LeadForm — contact / lead-capture form (name, email, message)
 * with client-side required validation and an inline success state.
 *
 * Variants: none — copy is driven by props (`heading`, `subheading`,
 * `submitLabel`, `successTitle`, `successMessage`).
 *
 * Wiring: pass `onSubmit(values)` to deliver the lead (e.g. a Supabase
 * insert); the component owns validation and the pending/success/error UI.
 * If `onSubmit` rejects, an inline error is shown and the form stays filled.
 *
 * Motion: the section content reveals once on scroll (one gentle fade +
 * rise via Reveal); reduced motion renders it statically.
 *
 * Customize copy/props/imagery — preserve structure, spacing rhythm, and
 * a11y (label/field pairing, aria-invalid + aria-describedby on errors,
 * role="status" on success, role="alert" on failure).
 */
import * as React from 'react'
import { Check } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

import { Reveal } from './reveal'

export interface LeadFormValues {
  name: string
  email: string
  message: string
}

export interface LeadFormProps {
  heading?: string
  subheading?: string
  submitLabel?: string
  successTitle?: string
  successMessage?: string
  /** Delivery seam — e.g. insert into Supabase. Reject to surface an error. */
  onSubmit?: (values: LeadFormValues) => void | Promise<void>
  id?: string
  className?: string
}

type Errors = Partial<Record<keyof LeadFormValues, string>>

const EMPTY: LeadFormValues = { name: '', email: '', message: '' }

function validate(values: LeadFormValues): Errors {
  const errors: Errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!values.message.trim()) errors.message = 'Please enter a message.'
  return errors
}

export function LeadForm({
  heading = 'Get in touch',
  subheading,
  submitLabel = 'Send message',
  successTitle = 'Message sent',
  successMessage = "Thanks for reaching out — we'll get back to you shortly.",
  onSubmit,
  id = 'contact',
  className,
}: LeadFormProps) {
  const [values, setValues] = React.useState<LeadFormValues>(EMPTY)
  const [errors, setErrors] = React.useState<Errors>({})
  const [status, setStatus] = React.useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle')

  const setField =
    (field: keyof LeadFormValues) =>
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }))
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) return
    setStatus('submitting')
    try {
      await onSubmit?.(values)
      setStatus('success')
      setValues(EMPTY)
    } catch {
      setStatus('error')
    }
  }

  const fieldError = (field: keyof LeadFormValues) =>
    errors[field] ? (
      <p id={`${id}-${field}-error`} className="text-sm text-destructive">
        {errors[field]}
      </p>
    ) : null

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn('bg-muted/40', className)}
    >
      <Reveal className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
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

        <Card className="mx-auto mt-12 max-w-xl">
          <CardContent className="pt-6">
            {status === 'success' ? (
              <div
                role="status"
                className="flex flex-col items-center gap-3 py-8 text-center animate-in fade-in-0 slide-in-from-bottom-2 duration-500 motion-reduce:animate-none"
              >
                <span
                  aria-hidden="true"
                  className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary"
                >
                  <Check className="size-6" />
                </span>
                <p className="font-display text-lg font-semibold text-foreground">
                  {successTitle}
                </p>
                <p className="max-w-sm text-sm text-pretty text-secondary-foreground">
                  {successMessage}
                </p>
              </div>
            ) : (
              <form
                noValidate
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
              >
                <div className="flex flex-col gap-2">
                  <Label htmlFor={`${id}-name`}>Name</Label>
                  <Input
                    id={`${id}-name`}
                    name="name"
                    autoComplete="name"
                    required
                    value={values.name}
                    onChange={setField('name')}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={
                      errors.name ? `${id}-name-error` : undefined
                    }
                  />
                  {fieldError('name')}
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor={`${id}-email`}>Email</Label>
                  <Input
                    id={`${id}-email`}
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={values.email}
                    onChange={setField('email')}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email ? `${id}-email-error` : undefined
                    }
                  />
                  {fieldError('email')}
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor={`${id}-message`}>Message</Label>
                  <Textarea
                    id={`${id}-message`}
                    name="message"
                    rows={4}
                    required
                    value={values.message}
                    onChange={setField('message')}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? `${id}-message-error` : undefined
                    }
                  />
                  {fieldError('message')}
                </div>
                {status === 'error' ? (
                  <p role="alert" className="text-sm text-destructive">
                    Something went wrong sending your message. Please try
                    again.
                  </p>
                ) : null}
                <Button
                  type="submit"
                  size="lg"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? 'Sending…' : submitLabel}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </Reveal>
    </section>
  )
}
