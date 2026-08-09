import { useParams, Link } from 'react-router-dom'
import { Img } from '@/components/ui/Img'
import { products } from '@/data/products'

export default function GalleryDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const product = products.find(p => p.slug === slug)

  if (!product) {
    return (
      <div className="pt-24 pb-16 text-center">
        <h1 className="font-display text-3xl font-bold">Piece not found</h1>
        <Link to="/gallery" className="text-primary mt-4 inline-block">Back to Gallery</Link>
      </div>
    )
  }

  return (
    <div data-component="src/pages/GalleryDetailPage.tsx" className="pt-24 pb-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Link to="/gallery" className="font-body text-sm text-secondary-foreground hover:text-primary transition-colors mb-8 inline-block">
          &larr; Back to Gallery
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-muted">
            <Img
              src={product.image}
              fallbackSeed={`detail-${product.slug}`}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6 flex flex-col justify-center">
            <div>
              <p className="font-body text-xs tracking-[0.2em] uppercase text-primary">
                {product.category}
              </p>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">
                {product.title}
              </h1>
            </div>

            <p className="font-body text-base text-secondary-foreground leading-relaxed">
              {product.description}
            </p>

            <div className="border-t border-b border-border py-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-body text-sm text-secondary-foreground">Price</span>
                <span className="font-display text-2xl font-bold text-foreground">${product.price}</span>
              </div>
            </div>

            <a
              href={product.stripeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 bg-gray-500 border-2 border-white text-white font-bold font-body text-sm tracking-widest uppercase rounded-xl hover:bg-white/10 transition-colors duration-200 w-full text-center"
            >
              Purchase &mdash; ${product.price}
            </a>

            <p className="font-body text-xs text-secondary-foreground text-center">
              Secure payment processed by Stripe. You will be redirected to complete your purchase.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
