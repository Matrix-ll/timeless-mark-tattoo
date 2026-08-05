import type { StudioInfo, NavItem, FAQItem } from '@/types'

export const studioInfo: StudioInfo = {
  name: 'Timeless Mark Tattoo',
  tagline: 'Your story, permanently told.',
  address: '501 W Garvey Ave 104',
  city: 'Monterey Park',
  state: 'CA',
  zip: '91754',
  phone: '626-236-8539',
  email: 'hello@timelessmarktattoo.com',
  instagram: '@timelessmarktattoo',
  hours: 'Mon-Fri 12PM-5PM, Sat 12PM-3PM, Sun Closed',
}

export const logoUrl = 'https://storage.googleapis.com/figapp-44eac.appspot.com/chat-attachments/eaif8ssL2XQD47wTDX7ZoRjOmmk1/efd69dba-0f77-4241-ae15-325722400785/images/1785867843504-jdxruymmb08.png'

export const navigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
]

export const faqItems: FAQItem[] = [
  { question: 'How do I book an appointment?', answer: 'Call us at 626-236-8539 or email hello@timelessmarktattoo.com. For custom pieces, we recommend an in-person consultation so we can discuss your vision, placement, and design details.', category: 'Booking', isMostAsked: true },
  { question: 'Is a deposit required?', answer: 'Yes. A deposit is required to secure your appointment and goes toward the final cost of your tattoo. Deposit amounts vary based on the size and complexity of the piece.', category: 'Booking', isMostAsked: true },
  { question: 'How much does a tattoo cost?', answer: 'Our shop minimum is $150. Pricing depends on size, detail, placement, and the artist. We provide a full estimate during your consultation. Browse our Gallery for example pieces with their listed prices.', category: 'Pricing', isMostAsked: true },
  { question: 'Do you accept walk-ins?', answer: 'Yes, we welcome walk-ins during business hours. However, larger or custom pieces require a consultation and scheduled appointment.', category: 'Booking', isMostAsked: true },
  { question: 'What should I do before my appointment?', answer: 'Get a good night\'s rest, eat a full meal, and stay hydrated. Avoid alcohol for 24 hours prior. Wear comfortable clothing that provides easy access to the area being tattooed.', category: 'Preparation', isMostAsked: true },
  { question: 'How should I care for my new tattoo?', answer: 'Keep the bandage on for the time your artist recommends. Wash gently with unscented antibacterial soap, pat dry, and apply a thin layer of aftercare ointment. Avoid sun exposure, swimming, and tight clothing during the 2-4 week healing period.', category: 'Aftercare', isMostAsked: true },
  { question: 'What styles do you specialize in?', answer: 'Our artists cover a wide range: fine line, blackwork, Japanese traditional, realism, botanical, ornamental, and script lettering. Check our Gallery and About pages for artist specialties.', category: 'Services', isMostAsked: false },
  { question: 'Can you cover up an old tattoo?', answer: 'We evaluate cover-ups on a case-by-case basis. Bring your existing tattoo in for a consultation and we\'ll discuss what\'s possible. Some pieces may require laser fading first for the best result.', category: 'Services', isMostAsked: false },
  { question: 'Is the studio clean and licensed?', answer: 'Absolutely. We are fully licensed by the County of Los Angeles and follow strict sterilization protocols. All needles are single-use. Your safety is our top priority.', category: 'Studio', isMostAsked: false },
  { question: 'Can I bring a friend?', answer: 'One guest is usually fine, but please ask when booking. Space in the tattooing area is limited, and we want to maintain a calm, focused environment.', category: 'Studio', isMostAsked: false },
  { question: 'What forms of payment do you accept?', answer: 'We accept cash and all major credit cards. You can also prepay for your piece through our secure online payment links in the Gallery.', category: 'Pricing', isMostAsked: false },
  { question: 'Do you do piercings?', answer: 'No, we are a tattoo-only studio. We focus entirely on delivering the highest quality tattoo work.', category: 'Services', isMostAsked: false },
]
