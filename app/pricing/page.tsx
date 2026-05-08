export const metadata = {
  title: 'Pricing – Hatch Bot',
}

export default function PricingPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Pricing</h1>
      <p className="text-gray-300 mb-12">
        Our pricing plans are not available yet. Stay tuned for updates or contact us for more information.
      </p>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="p-6 bg-primary-light/50 rounded-xl border border-primary-light backdrop-blur-md">
          <h3 className="text-xl font-semibold mb-2">Free</h3>
          <p className="text-sm text-gray-400">Get started with limited usage and explore Hatch Bot’s features.</p>
        </div>
        <div className="p-6 bg-primary-light/50 rounded-xl border border-primary-light backdrop-blur-md">
          <h3 className="text-xl font-semibold mb-2">Pro</h3>
          <p className="text-sm text-gray-400">Unlock higher usage limits and premium features (coming soon).</p>
        </div>
        <div className="p-6 bg-primary-light/50 rounded-xl border border-primary-light backdrop-blur-md">
          <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
          <p className="text-sm text-gray-400">Tailored solutions for your team or organisation (coming soon).</p>
        </div>
      </div>
    </main>
  )
}