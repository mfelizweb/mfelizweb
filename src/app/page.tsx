"use client";

import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import ServiceCard from "@/components/ServiceCard";
import ProjectPlanner from "@/components/ProjectPlanner";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

import {
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  CreditCardIcon,
  CpuChipIcon,
  LifebuoyIcon,
  SignalIcon,
  MapPinIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

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

  // 🔑 SOLO animamos desde About en adelante
  const aboutReveal = useScrollReveal();
  const servicesReveal = useScrollReveal();
  const plannerReveal = useScrollReveal();
  const ctaReveal = useScrollReveal();

  return (
    <>
      {/* HERO (NO animado) */}
      <Hero />

      {/* ABOUT */}
      <div
        ref={aboutReveal.ref}
        className={aboutReveal.visible ? "reveal-visible" : "reveal"}
      >
        <AboutUs />
      </div>

      {/* SERVICES */}
      <div
        ref={servicesReveal.ref}
        className={`mx-auto max-w-7xl px-6 py-20 ${servicesReveal.visible ? "reveal-visible" : "reveal"
          }`}
      >
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          {heading[lang]}
        </h2>
        <p className="mt-3 text-lg text-gray-600">{sub[lang]}</p>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard
            title={{ es: "Diseño y Desarrollo Web", en: "Web Design & Development" }}
            description={{
              es: "Páginas web modernas, rápidas y optimizadas para Google y móviles.",
              en: "Modern, fast websites optimized for Google and mobile devices.",
            }}
            href="/services/web"
            icon={<CodeBracketIcon className="w-8 h-8 text-indigo-500" />}
          />

          <ServiceCard
            title={{ es: "Aplicaciones Móviles", en: "Mobile Apps" }}
            description={{
              es: "Apps para iOS y Android con React Native y Expo.",
              en: "iOS & Android apps using React Native and Expo.",
            }}
            href="/services/mobile"
            icon={<DevicePhoneMobileIcon className="w-8 h-8 text-emerald-500" />}
          />

          <ServiceCard
            title={{ es: "Tarjetas NFC Inteligentes", en: "NFC Smart Cards" }}
            description={{
              es: "Tarjetas NFC + micrositio con QR y analíticas en tiempo real.",
              en: "NFC cards + microsite with QR and real-time analytics.",
            }}
            href="/services/nfc"
            icon={<SignalIcon className="w-8 h-8 text-cyan-500" />}
          />

          <ServiceCard
            title={{ es: "Integración de Pagos", en: "E-Payments Integration" }}
            description={{
              es: "Stripe / Square: checkout, suscripciones y enlaces de pago.",
              en: "Stripe / Square: checkout, subscriptions, payment links.",
            }}
            href="/services/payments"
            icon={<CreditCardIcon className="w-8 h-8 text-pink-500" />}
          />

          <ServiceCard
            title={{ es: "SEO y Google Maps", en: "SEO & Google Maps" }}
            description={{
              es: "Haz que te encuentren fácil en tu zona con SEO local.",
              en: "Get found easily in your area with local SEO.",
            }}
            href="/services/seo"
            icon={<MapPinIcon className="w-8 h-8 text-green-500" />}
          />

          <ServiceCard
            title={{ es: "Rediseño y Modernización", en: "Redesign & Modernization" }}
            description={{
              es: "Convierte tu web antigua en una experiencia moderna.",
              en: "Turn outdated websites into modern experiences.",
            }}
            href="/services/redesign"
            icon={<ArrowPathIcon className="w-8 h-8 text-blue-500" />}
          />

          <ServiceCard
            title={{ es: "Mantenimiento & Soporte", en: "Maintenance & Support" }}
            description={{
              es: "Planes mensuales con actualizaciones y seguridad.",
              en: "Monthly plans with updates and security.",
            }}
            href="/services/maintenance"
            icon={<LifebuoyIcon className="w-8 h-8 text-yellow-500" />}
          />

          <ServiceCard
            title={{ es: "Asistentes de IA & Chatbots", en: "AI Assistants & Chatbots" }}
            description={{
              es: "Chatbots personalizados para ventas y soporte 24/7.",
              en: "Custom chatbots for sales and support 24/7.",
            }}
            href="/services/ai"
            icon={<CpuChipIcon className="w-8 h-8 text-purple-500" />}
          />
        </div>
      </div>

      {/* PROJECT PLANNER */}
      <div
        ref={plannerReveal.ref}
        className={`mt-20 max-w-3xl mx-auto ${plannerReveal.visible ? "reveal-visible" : "reveal"
          }`}
      >
        <ProjectPlanner />
      </div>

      {/* FINAL CTA */}
      <div
        ref={ctaReveal.ref}
        className={`mt-20 text-center px-6 ${ctaReveal.visible ? "reveal-visible" : "reveal"
          }`}
      >
        <h3 className="text-2xl font-bold text-gray-900">
          {lang === "es"
            ? "¿Listo para atraer más clientes?"
            : "Ready to attract more customers?"}
        </h3>

        <p className="mt-3 text-gray-600">
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
            className="rounded-full border border-emerald-400 px-6 py-3 font-semibold text-emerald-600 hover:bg-emerald-50 transition"
          >
            {lang === "es" ? "Escríbenos en WhatsApp" : "Message us on WhatsApp"}
          </a>
        </div>
      </div>
    </>
  );
}
