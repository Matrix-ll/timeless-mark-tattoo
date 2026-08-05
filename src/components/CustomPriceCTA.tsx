import { Link } from 'react-router-dom'

export default function CustomPriceCTA() {
  return (
    <section data-component="src/components/CustomPriceCTA.tsx" className="py-16 sm:py-20 bg-primary">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center space-y-6">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground tracking-tight">
          Custom Price
        </h2>
        <p className="font-display text-2xl sm:text-3xl italic text-primary-foreground/80">
          $1 — $2,000
        </p>
        <p className="font-body text-base text-primary-foreground/70 max-w-xl mx-auto leading-relaxed">
          Not every piece fits a fixed price. Whether it&rsquo;s a tiny symbol or a forearm portrait, we&rsquo;ll work with you. Bring your idea, your budget, and we&rsquo;ll make something timeless &mdash; starting at just one dollar for the smallest pieces, scaling up to $2,000 for larger custom work. Every budget deserves great art.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center px-8 py-3 bg-white border-2 border-white text-primary font-bold font-body text-sm tracking-widest uppercase hover:bg-white/90 transition-colors duration-200"
        >
          Tell Us Your Idea
        </Link>
      </div>
    </section>
  )
}
