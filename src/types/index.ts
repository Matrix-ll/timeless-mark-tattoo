export interface StudioInfo {
  name: string
  tagline: string
  address: string
  city: string
  state: string
  zip: string
  phone: string
  email: string
  instagram: string
  hours: string
}

export interface NavItem {
  label: string
  href: string
}

export interface FAQItem {
  question: string
  answer: string
  category: string
  isMostAsked: boolean
}

export interface ProductItem {
  id: number
  slug: string
  title: string
  category: string
  image: string
  price: number
  stripeUrl: string
  description: string
}
