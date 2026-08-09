export default function CustomPriceCTA() {
  const stripeUrl = 'https://buy.stripe.com/fZu9AN91A6Q6ghK3OiaIM0E'

  return (
    <section data-component="src/components/CustomPriceCTA.tsx" className="py-16 sm:py-20 bg-primary">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center space-y-6 border-4 border-[#D4A84B] rounded-2xl py-12 px-6 sm:px-12 bg-primary shadow-[0_0_30px_rgba(212,168,75,0.15)]">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground tracking-tight">
          Custom Price
        </h2>
        <p className="font-display text-2xl sm:text-3xl italic text-primary-foreground/80">
          $1 — $2,000
        </p>
        <p className="font-body text-base text-primary-foreground/70 max-w-xl mx-auto leading-relaxed">
          Not every piece fits a fixed price. Whether it&rsquo;s a tiny symbol or a forearm portrait, we&rsquo;ll work with you. Bring your idea, your budget, and we&rsquo;ll make something timeless &mdash; starting at just one dollar for the smallest pieces, scaling up to $2,000 for larger custom work. Every budget deserves great art.
        </p>
        <a
          href={stripeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-8 py-3 bg-[#D4A84B] border-2 border-[#D4A84B] text-primary font-bold font-body text-sm tracking-widest uppercase rounded-xl hover:bg-[#C49A3C] transition-colors duration-200"
        >
          Tell Us Your Idea
        </a>
      </div>
    </section>
  )
}
