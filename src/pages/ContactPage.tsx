import { studioInfo } from '@/data/seed'

export default function ContactPage() {
  return (
    <div data-component="src/pages/ContactPage.tsx" className="pt-24 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-12">
        <div className="space-y-4 text-center">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary">
            Get In Touch
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
            Contact Us
          </h1>
          <p className="font-body text-base text-secondary-foreground max-w-md mx-auto">
            Ready to start your next piece? Reach out and we'll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="font-body text-xs tracking-[0.2em] uppercase text-primary font-medium">Phone</span>
              <p className="font-body text-lg font-semibold text-foreground">{studioInfo.phone}</p>
            </div>
            <div className="space-y-2">
              <span className="font-body text-xs tracking-[0.2em] uppercase text-primary font-medium">Email</span>
              <p className="font-body text-foreground">{studioInfo.email}</p>
            </div>
            <div className="space-y-2">
              <span className="font-body text-xs tracking-[0.2em] uppercase text-primary font-medium">Address</span>
              <p className="font-body text-foreground">
                {studioInfo.address}<br />
                {studioInfo.city}, {studioInfo.state} {studioInfo.zip}
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-body text-xs tracking-[0.2em] uppercase text-primary font-medium">Hours</span>
              <p className="font-body text-sm text-secondary-foreground whitespace-pre-line">{studioInfo.hours}</p>
            </div>
          </div>

          <form className="space-y-5 bg-secondary p-8 rounded-2xl">
            <div>
              <label htmlFor="cname" className="block font-body text-xs tracking-widest uppercase text-secondary-foreground mb-2">Name</label>
              <input id="cname" type="text" placeholder="Your full name" className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground font-body text-sm placeholder:text-secondary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
            </div>
            <div>
              <label htmlFor="cemail" className="block font-body text-xs tracking-widest uppercase text-secondary-foreground mb-2">Email</label>
              <input id="cemail" type="email" placeholder="you@email.com" className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground font-body text-sm placeholder:text-secondary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
            </div>
            <div>
              <label htmlFor="cmessage" className="block font-body text-xs tracking-widest uppercase text-secondary-foreground mb-2">Your Idea</label>
              <textarea id="cmessage" rows={5} placeholder="Tell us about the piece you're envisioning..." className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground font-body text-sm placeholder:text-secondary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none" />
            </div>
            <button type="submit" className="w-full inline-flex items-center justify-center px-8 py-3 bg-gray-500 border-2 border-white text-white font-bold font-body text-sm tracking-widest uppercase rounded-xl hover:bg-white/10 transition-colors duration-200">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
