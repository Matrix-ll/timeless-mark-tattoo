import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { navigation, logoUrl } from '@/data/seed'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header data-component="src/components/Navbar.tsx" className="fixed top-0 inset-x-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoUrl} alt="Timeless Mark Tattoo" className="h-10 w-10 rounded-full object-cover" />
          <span className="font-display text-lg tracking-wide text-foreground">Timeless Mark</span>
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-sm font-body tracking-widest uppercase text-secondary-foreground">
          {navigation.filter(n => n.href !== '/').map(item => (
            <li key={item.href}>
              <Link to={item.href} className="hover:text-primary transition-colors duration-200">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <button className="md:hidden text-secondary-foreground" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-background border-t border-border px-4 pb-6">
          <ul className="flex flex-col gap-4 text-sm font-body tracking-widest uppercase text-secondary-foreground">
            {navigation.filter(n => n.href !== '/').map(item => (
              <li key={item.href}>
                <Link to={item.href} className="block py-1 hover:text-primary transition-colors" onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
