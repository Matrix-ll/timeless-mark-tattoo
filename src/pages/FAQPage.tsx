import { useState } from 'react'
import { Link } from 'react-router-dom'
import { faqItems } from '@/data/seed'

const categories = ['All', 'Booking', 'Pricing', 'Preparation', 'Aftercare', 'Services', 'Studio']

export default function FAQPage() {
  const [active, setActive] = useState('All')
  const [search, setSearch] = useState('')

  const mostAsked = faqItems.filter(f => f.isMostAsked)
  const filtered = faqItems.filter(f => {
    const matchCat = active === 'All' || f.category === active
    const matchSearch = !search || f.question.toLowerCase().includes(search.toLowerCase()) || f.answer.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })
  const nonMostAsked = filtered.filter(f => !f.isMostAsked)

  return (
    <div data-component="src/pages/FAQPage.tsx" className="pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-12 space-y-4 text-center">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary">
            You Ask, We Answer
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
            Frequently Asked Questions
          </h1>
        </div>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-secondary border border-border rounded-xl px-5 py-4 text-foreground font-body text-sm placeholder:text-secondary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-xl font-body text-sm transition-colors ${
                active === cat
                  ? 'bg-gray-500 border-2 border-white text-white font-bold'
                  : 'bg-gray-200 border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {active === 'All' && !search && mostAsked.length > 0 && (
          <div className="mb-12">
            <h2 className="font-display text-xl font-bold text-foreground mb-4">Most Asked</h2>
            <div className="space-y-3">
              {mostAsked.map((faq, i) => (
                <details key={i} className="bg-secondary rounded-xl p-5 group">
                  <summary className="font-body font-medium text-foreground cursor-pointer list-none">{faq.question}</summary>
                  <p className="font-body text-sm text-secondary-foreground mt-3 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-3">
          {nonMostAsked.map((faq, i) => (
            <details key={i} className="bg-secondary rounded-xl p-5 group">
              <summary className="font-body font-medium text-foreground cursor-pointer list-none">{faq.question}</summary>
              <p className="font-body text-sm text-secondary-foreground mt-3 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-secondary-foreground py-12">No questions match your search. Try a different term.</p>
        )}

        <div className="mt-16 text-center space-y-4 bg-secondary rounded-2xl p-10">
          <h2 className="font-display text-2xl font-bold text-foreground">Still Have a Question?</h2>
          <p className="font-body text-sm text-secondary-foreground max-w-md mx-auto">
            Send us a message or give us a call and we'll guide you from there.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center px-8 py-3 bg-gray-500 border-2 border-white text-white font-bold font-body text-sm tracking-widest uppercase rounded-xl hover:bg-white/10 transition-colors">
              Contact the Studio
            </Link>
            <a href="tel:626-236-8539" className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-bold bg-gray-500 font-body text-sm tracking-widest uppercase rounded-xl hover:bg-white/10 transition-colors">
              Call Now
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
