import ServiceCard from "@/components/ServiceCard";

export default function ServicesPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
        Services
      </h1>
      <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
        Modular solutions — choose only what your business needs.
      </p>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ServiceCard
          title="Web Design & Development"
          description="Next.js 15, SEO, accessibility, performance — 2025 standards."
          href="/services/web"
        />
        <ServiceCard
          title="Mobile Apps"
          description="React Native, Expo, Stripe, RevenueCat, Supabase."
          href="/services/mobile"
        />
        <ServiceCard
          title="NFC Smart Cards"
          description="Physical NFC cards + CTA microsites, QR, analytics."
          href="/services/nfc"
        />
        <ServiceCard
          title="E‑Payments Integration"
          description="Stripe / Square: checkout, subscriptions, secure flows."
          href="/services/payments"
        />
        <ServiceCard
          title="Maintenance & Support"
          description="Monthly plans with clear SLAs and proactive updates."
          href="/services/maintenance"
        />
      </div>

      <div id="ai" className="mt-16">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          AI Assistants & Chatbots
        </h2>
        <p className="mt-3 text-gray-600 dark:text-gray-300 text-base">
          Smart chatbots that answer “Do you offer X?” with quotes and lead capture — ideal for service businesses.
        </p>
      </div>
    </section>
  );
}
