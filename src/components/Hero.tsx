import { Link } from 'react-router-dom'
import { Img } from '@/components/ui/Img'
import { studioInfo, logoUrl } from '@/data/seed'

export default function Hero() {
  return (
    <section data-component="src/components/Hero.tsx" className="min-h-screen flex items-center bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 w-full grid md:grid-cols-2 gap-12 items-center min-h-screen pt-16 pb-8">
        <div className="space-y-8">
          <img src={logoUrl} alt="Timeless Mark Tattoo" className="h-20 w-20 rounded-xl object-cover border-2 border-primary/20" />
          <h1 className="font-display text-5xl sm:text-7xl font-bold leading-none tracking-tight text-foreground">
            {studioInfo.name}
          </h1>
          <p className="font-display text-2xl sm:text-3xl italic text-secondary-foreground leading-relaxed">
            {studioInfo.tagline}
          </p>
          <p className="font-body text-base text-secondary-foreground max-w-md leading-relaxed">
            A custom tattoo studio in the heart of Monterey Park, California. We create bespoke, permanent art — from fine-line to Japanese traditional — in a clean, welcoming environment.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              to="/gallery"
              className="inline-flex items-center px-8 py-3 bg-gray-500 border-2 border-white text-white font-bold font-body text-sm tracking-widest uppercase hover:bg-white/10 transition-colors duration-200"
            >
              Browse the Gallery
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-3 bg-gray-500 border-2 border-white text-white font-bold font-body text-sm tracking-widest uppercase hover:bg-white/10 transition-colors duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="relative h-[70vh] min-h-[500px] overflow-hidden rounded-2xl">
          <Img
            src="https://storage.googleapis.com/figapp-44eac.appspot.com/chat-attachments/eaif8ssL2XQD47wTDX7ZoRjOmmk1/efd69dba-0f77-4241-ae15-325722400785/images/1785870267019-14xoidcykr6.png"
            fallbackSeed="timeless-hero"
            alt="Custom tattoo artwork — back piece with intricate detail"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
