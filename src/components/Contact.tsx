import { studioInfo } from '@/data/seed'

export default function Contact() {
  return (
    <section data-component="src/components/Contact.tsx" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="font-body text-xs tracking-[0.3em] uppercase text-primary">
                Get In Touch
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
                Let's Talk
              </h2>
              <p className="font-body text-base text-secondary-foreground max-w-md leading-relaxed">
                Ready to start your next piece? Reach out by phone, email, or stop by the studio. We're here to help bring your vision to life.
              </p>
            </div>

            <div className="space-y-4 font-body text-sm">
              <div>
                <span className="text-primary uppercase tracking-widest text-xs font-medium">Phone</span>
                <p className="text-foreground text-lg font-semibold mt-1">{studioInfo.phone}</p>
              </div>
              <div>
                <span className="text-primary uppercase tracking-widest text-xs font-medium">Email</span>
                <p className="text-foreground mt-1">{studioInfo.email}</p>
              </div>
              <div>
                <span className="text-primary uppercase tracking-widest text-xs font-medium">Address</span>
                <p className="text-foreground mt-1">{studioInfo.address}<br />{studioInfo.city}, {studioInfo.state} {studioInfo.zip}</p>
              </div>
              <div>
                <span className="text-primary uppercase tracking-widest text-xs font-medium">Hours</span>
                <p className="text-foreground mt-1 whitespace-pre-line">{studioInfo.hours}</p>
              </div>
            </div>
          </div>

          <form className="space-y-5 bg-secondary p-8 rounded-2xl">
            <div>
              <label htmlFor="name" className="block font-body text-xs tracking-widest uppercase text-secondary-foreground mb-2">Name</label>
              <input id="name" type="text" placeholder="Your full name" className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground font-body text-sm placeholder:text-secondary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
            </div>
            <div>
              <label htmlFor="email" className="block font-body text-xs tracking-widest uppercase text-secondary-foreground mb-2">Email</label>
              <input id="email" type="email" placeholder="you@email.com" className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground font-body text-sm placeholder:text-secondary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
            </div>
            <div>
              <label htmlFor="message" className="block font-body text-xs tracking-widest uppercase text-secondary-foreground mb-2">Your Idea</label>
              <textarea id="message" rows={4} placeholder="Tell us about the piece you're envisioning — style, size, placement, budget..." className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground font-body text-sm placeholder:text-secondary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none" />
            </div>
            <button type="submit" className="w-full inline-flex items-center justify-center px-8 py-3 bg-gray-500 border-2 border-white text-white font-bold font-body text-sm tracking-widest uppercase rounded-xl hover:bg-white/10 transition-colors duration-200">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
