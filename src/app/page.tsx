"use client";

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
  SignalIcon,MapPinIcon,ArrowPathIcon
} from "@heroicons/react/24/outline";
import AboutUs from "@/components/AboutUs";
import { useEffect, useState } from "react";
 
  const heading = {
    es: "Servicios",
    en: "Services",
  };

  const sub = {
    es: "Web, Móvil, NFC, Pagos, IA, SEO, Rediseño y soporte continuo.",
    en: "Web, Mobile, NFC, Payments, AI, SEO, Redesign & ongoing support.",
  };
 
 
export default function HomePage() {

    const [lang, setLang] = useState<"es" | "en">("en");
  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setLang(navigator.language.startsWith("es") ? "es" : "en");
    }
  }, []);
  return (
    <>
    
      <Hero />
<AboutUs />
     <section className="mx-auto max-w-7xl px-6 py-20">
 
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        {heading[lang]}
      </h2>
      <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">{sub[lang]}</p>
 
     <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ServiceCard
          title={{ es: "Diseño y Desarrollo Web", en: "Web Design & Development" }}
          description={{
            es: "Páginas web modernas, rápidas y optimizadas para Google y móviles.",
            en: "Modern, fast websites optimized for Google and mobile devices.",
          }}
          href="/services/web"
          icon={
            <CodeBracketIcon className="w-8 h-8 text-indigo-500 group-hover:scale-110 transition-transform" />
          }
        />

        <ServiceCard
          title={{ es: "Aplicaciones Móviles", en: "Mobile Apps" }}
          description={{
            es: "Apps para iOS y Android con React Native y Expo.",
            en: "iOS & Android apps using React Native and Expo.",
          }}
          href="/services/mobile"
          icon={
            <DevicePhoneMobileIcon className="w-8 h-8 text-emerald-500 group-hover:scale-110 transition-transform" />
          }
        />

        <ServiceCard
          title={{ es: "Tarjetas NFC Inteligentes", en: "NFC Smart Cards" }}
          description={{
            es: "Tarjetas NFC + micrositio con QR y analíticas en tiempo real.",
            en: "NFC cards + microsite with QR and real-time analytics.",
          }}
          href="/services/nfc"
          icon={
            <SignalIcon className="w-8 h-8 text-cyan-500 group-hover:scale-110 transition-transform" />
          }
        />

        <ServiceCard
          title={{ es: "Integración de Pagos", en: "E-Payments Integration" }}
          description={{
            es: "Stripe / Square: checkout, suscripciones y enlaces de pago.",
            en: "Stripe / Square: checkout, subscriptions, payment links.",
          }}
          href="/services/payments"
          icon={
            <CreditCardIcon className="w-8 h-8 text-pink-500 group-hover:scale-110 transition-transform" />
          }
        />

        <ServiceCard
          title={{ es: "SEO y Google Maps", en: "SEO & Google Maps" }}
          description={{
            es: "Haz que te encuentren fácil en tu zona con SEO local y perfil en Google Business.",
            en: "Get found easily in your area with local SEO and Google Business profile.",
          }}
          href="/services/seo"
          icon={
            <MapPinIcon className="w-8 h-8 text-green-500 group-hover:scale-110 transition-transform" />
          }
        />

        <ServiceCard
          title={{ es: "Rediseño y Modernización", en: "Redesign & Modernization" }}
          description={{
            es: "Convierte tu web antigua en una experiencia moderna y rápida, lista para móviles.",
            en: "Turn outdated websites into modern, fast, mobile-ready experiences.",
          }}
          href="/services/redesign"
          icon={
            <ArrowPathIcon className="w-8 h-8 text-blue-500 group-hover:scale-110 transition-transform" />
          }
        />

        <ServiceCard
          title={{ es: "Mantenimiento & Soporte", en: "Maintenance & Support" }}
          description={{
            es: "Planes mensuales con actualizaciones, seguridad y pequeñas mejoras.",
            en: "Monthly plans with updates, security, and small improvements.",
          }}
          href="/services/maintenance"
          icon={
            <LifebuoyIcon className="w-8 h-8 text-yellow-500 group-hover:scale-110 transition-transform" />
          }
        />

        <ServiceCard
          title={{ es: "Asistentes de IA & Chatbots", en: "AI Assistants & Chatbots" }}
          description={{
            es: "Chatbots personalizados para ventas y soporte 24/7.",
            en: "Custom chatbots for sales and support 24/7.",
          }}
          href="/services/ai"
          icon={
            <CpuChipIcon className="w-8 h-8 text-purple-500 group-hover:scale-110 transition-transform" />
          }
        />

        </div>

        
        <section className="mx-auto max-w-7xl px-6 py-20">
  <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
    {lang === "es" ? "Proyectos recientes" : "Recent Projects"}
  </h2>
  <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
    {lang === "es"
      ? "Algunos ejemplos de sitios y apps que hemos creado."
      : "A few examples of websites and apps we’ve built."}
  </p>

  <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* Proyecto 1 */}
    <div className="rounded-xl overflow-hidden shadow-lg border border-white/10 bg-white/50 dark:bg-white/5">
      <img src="/cdl.png" alt="CDL Coach App" className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">CDL Coach App</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          {lang === "es"
            ? "Aplicación móvil para preparación de exámenes CDL."
            : "Mobile app for CDL exam preparation."}
        </p>
      </div>
    </div>

    {/* Proyecto 2 */}
    <div className="rounded-xl overflow-hidden shadow-lg border border-white/10 bg-white/50 dark:bg-white/5">
  <img
    src="/chonji.png"
    alt="School Website Demo"
    className="w-full h-48 object-fit"
  />
      <div className="p-4">
<h3 className="font-semibold text-lg text-gray-900 dark:text-white">
      {lang === "es" ? "Escuela chon ji" : "chon ji Academy "}
    </h3>
    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
      {lang === "es"
        ? "Web para academia infantil con clases de taekwondo, música y danza, horarios y registro en línea."
        : "Website for a kids academy with taekwondo, music and dance classes, schedules and online enrollment."}
    </p>
      </div>
    </div>

    {/* Proyecto 3 */}
    <div className="rounded-xl overflow-hidden shadow-lg border border-white/10 bg-white/50 dark:bg-white/5">
 <img
    src="/lacustore.png"
    alt="E-commerce Website Demo"
    className="w-full h-48 object-cover"
  />
  <div className="p-4">
    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
      {lang === "es" ? "E-commerce Lacu" : "Lacu Store"}
    </h3>
    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
      {lang === "es"
        ? "Tienda online con carrito de compras, pasarelas de pago seguras y gestión de productos."
        : "Online store with shopping cart, secure payment gateways and product management."}
    </p>
      </div>
    </div>
  </div>

<div className="mt-12 flex justify-center">
  <Link
    href="/portfolio"
    className="rounded-full border border-neutral-300 dark:border-white/20 
               bg-neutral-800 dark:bg-white/5 
               px-6 py-3 text-sm font-medium 
               text-white hover:bg-neutral-700 dark:hover:bg-white/10 transition"
  >
    {lang === "es" ? "Ver Portafolio" : "View Portfolio"}
  </Link>
</div>

</section>

        <div className="mt-16 max-w-3xl mx-auto">
          <ProjectPlanner />
        </div>

 

        <div className="mt-16 text-center">
  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
    {lang === "es"
      ? "¿Listo para atraer más clientes?"
      : "Ready to attract more customers?"}
  </h3>
  <p className="mt-3 text-gray-600 dark:text-gray-300">
    {lang === "es"
      ? "Hablemos hoy mismo. Cotización gratis y sin compromiso."
      : "Let’s talk today. Free estimate, no commitment."}
  </p>
  <div className="mt-6 flex flex-wrap justify-center gap-4">
    <Link
      href="/estimate"
      className="rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg hover:bg-indigo-500 transition"
    >
      {lang === "es" ? "Pide tu cotización gratis" : "Get your free estimate"}
    </Link>
    <a
      href="https://wa.me/19292406734"
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-full border border-emerald-400/40 px-6 py-3 font-semibold text-emerald-300 hover:bg-emerald-500/10 transition"
    >
      {lang === "es" ? "Escríbenos en WhatsApp" : "Message us on WhatsApp"}
    </a>
  </div>
</div>

      </section>
    </>
  );
}
