import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import ChatEstimator from "@/components/ChatEstimator";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Services
        </h2>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
          Your strengths: Mobile and Web. We also cover NFC, payments, and ongoing support.
        </p>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard
            title="Web Design & Development"
            description="High-performance websites with Next.js, built to convert."
            href="/services/web"
          />
          <ServiceCard
            title="Mobile Apps"
            description="iOS & Android apps using React Native and Expo."
            href="/services/mobile"
          />
          <ServiceCard
            title="NFC Smart Cards"
            description="NFC cards + microsite with QR and real-time analytics."
            href="/services/nfc"
          />
          <ServiceCard
            title="E‑Payments Integration"
            description="Stripe / Square: checkout, subscriptions, payment links."
            href="/services/payments"
          />
          <ServiceCard
            title="Maintenance & Support"
            description="Monthly plans with updates, monitoring and SLAs."
            href="/services/maintenance"
          />
          <ServiceCard
            title="AI Assistants & Chatbots"
            description="Custom chatbots for sales and support — 24/7."
            href="/services#ai"
          />
        </div>

        <div className="mt-16 max-w-3xl mx-auto">
          <ChatEstimator />
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/portfolio"
            className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white hover:bg-white/10 transition"
          >
            View Portfolio
          </Link>
        </div>
      </section>
    </>
  );
}
