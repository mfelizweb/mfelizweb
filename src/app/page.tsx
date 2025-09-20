import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
 import Link from "next/link";
import ProjectPlanner from "@/components/ProjectPlanner";
import {
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  CreditCardIcon,
  SparklesIcon,
  CpuChipIcon,
  LifebuoyIcon,
  SignalIcon,
} from "@heroicons/react/24/outline";
import AboutUs from "@/components/AboutUs";

export default function HomePage() {
  return (
    <>
    
      <Hero />
<AboutUs />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Services
        </h2>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
          Mobile App, Web,NFC,Chats Bot , AI,BlockChain, payments  and ongoing support.
        </p>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">



<ServiceCard
  title={{ es: "Diseño y Desarrollo Web", en: "Web Design & Development" }}
  description={{
    es: "Sitios web de alto rendimiento con Next.js, optimizados para convertir.",
    en: "High-performance websites with Next.js, built to convert.",
  }}
  href="/services/web"
  icon={<CodeBracketIcon className="w-8 h-8 text-indigo-500 group-hover:scale-110 transition-transform" />}
/>

<ServiceCard
  title={{ es: "Aplicaciones Móviles", en: "Mobile Apps" }}
  description={{
    es: "Apps para iOS y Android con React Native y Expo.",
    en: "iOS & Android apps using React Native and Expo.",
  }}
  href="/services/mobile"
  icon={<DevicePhoneMobileIcon className="w-8 h-8 text-emerald-500 group-hover:scale-110 transition-transform" />}
/>

<ServiceCard
  title={{ es: "Tarjetas NFC Inteligentes", en: "NFC Smart Cards" }}
  description={{
    es: "Tarjetas NFC + micrositio con QR y analíticas en tiempo real.",
    en: "NFC cards + microsite with QR and real-time analytics.",
  }}
  href="/services/nfc"
  icon={<SignalIcon className="w-8 h-8 text-cyan-500 group-hover:scale-110 transition-transform" />}
/>

<ServiceCard
  title={{ es: "Integración de Pagos", en: "E-Payments Integration" }}
  description={{
    es: "Stripe / Square: checkout, suscripciones y enlaces de pago.",
    en: "Stripe / Square: checkout, subscriptions, payment links.",
  }}
  href="/services/payments"
  icon={<CreditCardIcon className="w-8 h-8 text-pink-500 group-hover:scale-110 transition-transform" />}
/>

<ServiceCard
  title={{ es: "Mantenimiento & Soporte", en: "Maintenance & Support" }}
  description={{
    es: "Planes mensuales con actualizaciones, monitoreo y SLA.",
    en: "Monthly plans with updates, monitoring and SLAs.",
  }}
  href="/services/maintenance"
  icon={<LifebuoyIcon className="w-8 h-8 text-yellow-500 group-hover:scale-110 transition-transform" />}
/>

<ServiceCard
  title={{ es: "Asistentes de IA & Chatbots", en: "AI Assistants & Chatbots" }}
  description={{
    es: "Chatbots personalizados para ventas y soporte — 24/7.",
    en: "Custom chatbots for sales and support — 24/7.",
  }}
  href="/services/ai"
  icon={<CpuChipIcon className="w-8 h-8 text-purple-500 group-hover:scale-110 transition-transform" />}
/>




        </div>

        <div className="mt-16 max-w-3xl mx-auto">
          <ProjectPlanner />
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
