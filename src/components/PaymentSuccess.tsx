import { useEffect, useState } from 'react'

export default function PaymentSuccess() {
  const [paid, setPaid] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setPaid(params.has('session_id'))
  }, [])

  if (!paid) return null

  return (
    <div
      data-component="src/components/PaymentSuccess.tsx"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
        <h2 className="font-display text-2xl font-bold text-foreground">Thank You!</h2>
        <p className="mt-2 font-body text-sm text-gray-600">
          Your purchase was successful. A receipt is on its way to your email. We will contact you soon to discuss your tattoo design.
        </p>
        <a
          href="/"
          className="mt-6 inline-flex items-center px-8 py-3 bg-gray-500 border-2 border-white text-white font-bold font-body text-sm tracking-widest uppercase rounded-xl hover:bg-gray-600 transition-colors"
        >
          Back to Site
        </a>
      </div>
    </div>
  )
}
