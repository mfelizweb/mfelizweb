"use client";
import { useEffect, useState } from "react";
import ServiceCard from "@/components/ServiceCard";

export default function ServicesPage() {
  const [lang, setLang] = useState<"es" | "en">("en");

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setLang(navigator.language.startsWith("es") ? "es" : "en");
    }
  }, []);

  const texts = {
    es: {
      title: "Servicios",
      subtitle: "Soluciones modulares: elige solo lo que tu negocio necesita.",
      services: [
        {
          title: { es: "Diseño y Desarrollo Web", en: "Web Design & Development" },
          description: {
            es: "Sitios modernos, rápidos y optimizados para atraer clientes.",
            en: "Modern, fast, and optimized websites to attract clients.",
          },
          href: "/services/web",
        },
        {
          title: { es: "Aplicaciones Móviles", en: "Mobile Apps" },
          description: {
            es: "Apps profesionales para iOS y Android, fáciles de usar y seguras.",
            en: "Professional iOS & Android apps that are easy to use and secure.",
          },
          href: "/services/mobile",
        },
        {
          title: { es: "Tarjetas NFC Inteligentes", en: "NFC Smart Cards" },
          description: {
            es: "Tarjetas de contacto inteligentes con QR y estadísticas.",
            en: "Smart contact cards with QR and real-time analytics.",
          },
          href: "/services/nfc",
        },
        {
          title: { es: "Pagos en Línea", en: "E-Payments Integration" },
          description: {
            es: "Cobros fáciles y seguros: enlaces, suscripciones y checkout.",
            en: "Easy and secure payments: links, subscriptions, checkout.",
          },
          href: "/services/payments",
        },
        {
          title: { es: "Mantenimiento & Soporte", en: "Maintenance & Support" },
          description: {
            es: "Planes mensuales para mantener tu web siempre estable y segura.",
            en: "Monthly plans to keep your site always stable and secure.",
          },
          href: "/services/maintenance",
        },
      ],
      ai: {
        title: "Asistentes de IA & Chatbots",
        subtitle:
          "Chatbots inteligentes que responden preguntas, atienden clientes 24/7 y capturan prospectos para tu negocio.",
      },
    },
    en: {
      title: "Services",
      subtitle: "Modular solutions — choose only what your business needs.",
      services: [
        {
          title: { es: "Diseño y Desarrollo Web", en: "Web Design & Development" },
          description: {
            es: "Sitios modernos, rápidos y optimizados para atraer clientes.",
            en: "Modern, fast, and optimized websites to attract clients.",
          },
          href: "/services/web",
        },
        {
          title: { es: "Aplicaciones Móviles", en: "Mobile Apps" },
          description: {
            es: "Apps profesionales para iOS y Android, fáciles de usar y seguras.",
            en: "Professional iOS & Android apps that are easy to use and secure.",
          },
          href: "/services/mobile",
        },
        {
          title: { es: "Tarjetas NFC Inteligentes", en: "NFC Smart Cards" },
          description: {
            es: "Tarjetas de contacto inteligentes con QR y estadísticas.",
            en: "Smart contact cards with QR and real-time analytics.",
          },
          href: "/services/nfc",
        },
        {
          title: { es: "Pagos en Línea", en: "E-Payments Integration" },
          description: {
            es: "Cobros fáciles y seguros: enlaces, suscripciones y checkout.",
            en: "Easy and secure payments: links, subscriptions, checkout.",
          },
          href: "/services/payments",
        },
        {
          title: { es: "Mantenimiento & Soporte", en: "Maintenance & Support" },
          description: {
            es: "Planes mensuales para mantener tu web siempre estable y segura.",
            en: "Monthly plans to keep your site always stable and secure.",
          },
          href: "/services/maintenance",
        },
      ],
      ai: {
        title: "AI Assistants & Chatbots",
        subtitle:
          "Smart chatbots that answer questions, serve customers 24/7, and capture leads for your business.",
      },
    },
  };

  const t = texts[lang];

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
        {t.title}
      </h1>
      <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">{t.subtitle}</p>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {t.services.map((service, i) => (
          <ServiceCard
            key={i}
            title={service.title}
            description={service.description}
            href={service.href}
          />
        ))}
      </div>

      <div id="ai" className="mt-16">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {t.ai.title}
        </h2>
        <p className="mt-3 text-gray-600 dark:text-gray-300 text-base">
          {t.ai.subtitle}
        </p>
      </div>
    </section>
  );
}
