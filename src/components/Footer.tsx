import { Link } from 'react-router-dom'
import { studioInfo } from '@/data/seed'

export default function Footer() {
  return (
    <footer data-component="src/components/Footer.tsx" className="border-t border-border py-16 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4 lg:col-span-2">
            <Link to="/" className="font-display text-xl tracking-wide text-foreground">
              Timeless Mark Tattoo
            </Link>
            <p className="font-body text-sm text-secondary-foreground max-w-sm leading-relaxed">
              A custom tattoo studio in Monterey Park, California. Your story, permanently told.
            </p>
          </div>

          <div className="space-y-3">
            <p className="font-body text-xs tracking-[0.2em] uppercase text-primary font-medium">Navigate</p>
            <ul className="space-y-2 font-body text-sm text-secondary-foreground">
              <li><Link to="/gallery" className="hover:text-foreground transition-colors">Gallery</Link></li>
              <li><Link to="/about" className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link to="/faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="font-body text-xs tracking-[0.2em] uppercase text-primary font-medium">Contact</p>
            <ul className="space-y-2 font-body text-sm text-secondary-foreground">
              <li>{studioInfo.phone}</li>
              <li>{studioInfo.email}</li>
              <li>{studioInfo.address}</li>
              <li>{studioInfo.city}, {studioInfo.state} {studioInfo.zip}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border font-body text-xs text-secondary-foreground text-center">
          &copy; {new Date().getFullYear()} {studioInfo.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
