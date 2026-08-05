export default function AboutPage() {
  return (
    <div data-component="src/pages/AboutPage.tsx" className="pt-24 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-16">
        <div className="space-y-4 text-center">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary">
            Our Story
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
            About the Studio
          </h1>
        </div>

        <div className="space-y-6 font-body text-base text-secondary-foreground leading-relaxed max-w-2xl mx-auto">
          <p>
            Timeless Mark Tattoo opened its doors in Monterey Park with a simple belief: that every tattoo
            should be as permanent as the story it tells. We're not a factory. We're not a trend mill.
            We're a studio where craft comes first, where every client sits down with an artist who listens,
            and where the result is something you'll be proud to wear for the rest of your life.
          </p>
          <p>
            Our artists span a range of disciplines — fine line, blackwork, Japanese traditional, realism,
            botanical, ornamental, and script — but they share one thing: an obsession with getting it right.
            Clean lines. Solid shading. Thoughtful composition. The fundamentals that never go out of style.
          </p>
          <p>
            We're fully licensed by the County of Los Angeles, and we hold ourselves to the highest
            standards of cleanliness and safety. Every needle is single-use. Every surface is sterilized.
            Every client leaves with clear aftercare instructions and the confidence that they've been
            treated with respect.
          </p>
        </div>

        <div className="bg-secondary rounded-2xl p-8 space-y-6 max-w-2xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-foreground">Visit Us</h2>
          <div className="space-y-2 font-body text-sm text-secondary-foreground">
            <p className="text-foreground font-medium">501 W Garvey Ave 104</p>
            <p>Monterey Park, CA 91754</p>
            <p className="pt-2"><span className="text-primary font-medium">Phone:</span> 626-236-8539</p>
            <p><span className="text-primary font-medium">Email:</span> hello@timelessmarktattoo.com</p>
          </div>
          <div>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-primary font-medium mb-2">Hours</p>
            <p className="font-body text-sm text-secondary-foreground whitespace-pre-line">Monday – Friday: 12:00 PM – 5:00 PM</p>
            <p className="font-body text-sm text-secondary-foreground">Saturday: 12:00 PM – 3:00 PM</p>
            <p className="font-body text-sm text-secondary-foreground">Sunday: Closed</p>
          </div>
        </div>
      </div>
    </div>
  )
}
