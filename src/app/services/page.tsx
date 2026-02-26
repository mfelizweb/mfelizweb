"use client";
import { useEffect, useState, useRef } from "react";
import ServiceCard from "@/components/ServiceCard";
import {
  Globe,
  Smartphone,
  Contact,
  CreditCard,
  Wrench,
  Bot,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function ServicesPage() {
  const [lang, setLang] = useState<"es" | "en">("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setLang(navigator.language.startsWith("es") ? "es" : "en");
    }
    setMounted(true);
  }, []);

  const services = [
    {
      icon: Globe,
      color: "indigo",
      gradient: "from-indigo-500 to-violet-500",
      bg: "bg-indigo-50 dark:bg-indigo-950/30",
      border: "border-indigo-100 dark:border-indigo-900/40",
      title: { es: "Diseño y Desarrollo Web", en: "Web Design & Development" },
      description: {
        es: "Sitios modernos, rápidos y optimizados para atraer clientes.",
        en: "Modern, fast, and optimized websites to attract and convert clients.",
      },
      href: "/services/web",
    },
    {
      icon: Smartphone,
      color: "sky",
      gradient: "from-sky-500 to-cyan-500",
      bg: "bg-sky-50 dark:bg-sky-950/30",
      border: "border-sky-100 dark:border-sky-900/40",
      title: { es: "Aplicaciones Móviles", en: "Mobile Apps" },
      description: {
        es: "Apps profesionales para iOS y Android, fáciles de usar y seguras.",
        en: "Professional iOS & Android apps — intuitive, fast, and secure.",
      },
      href: "/services/mobile",
    },
    {
      icon: Contact,
      color: "emerald",
      gradient: "from-emerald-500 to-teal-500",
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
      border: "border-emerald-100 dark:border-emerald-900/40",
      title: { es: "Tarjetas NFC Inteligentes", en: "NFC Smart Cards" },
      description: {
        es: "Tarjetas de contacto inteligentes con QR y estadísticas.",
        en: "Smart contact cards with QR codes and real-time analytics.",
      },
      href: "/services/nfc",
    },
    {
      icon: CreditCard,
      color: "violet",
      gradient: "from-violet-500 to-purple-500",
      bg: "bg-violet-50 dark:bg-violet-950/30",
      border: "border-violet-100 dark:border-violet-900/40",
      title: { es: "Pagos en Línea", en: "E-Payments Integration" },
      description: {
        es: "Cobros fáciles y seguros: enlaces, suscripciones y checkout.",
        en: "Seamless payments: links, subscriptions, and custom checkout.",
      },
      href: "/services/payments",
    },
    {
      icon: Wrench,
      color: "amber",
      gradient: "from-amber-500 to-orange-500",
      bg: "bg-amber-50 dark:bg-amber-950/30",
      border: "border-amber-100 dark:border-amber-900/40",
      title: { es: "Mantenimiento & Soporte", en: "Maintenance & Support" },
      description: {
        es: "Planes mensuales para mantener tu web siempre estable y segura.",
        en: "Monthly plans to keep your site always stable, fast, and secure.",
      },
      href: "/services/maintenance",
    },
  ];

  const t = {
    title: lang === "es" ? "Servicios" : "Services",
    eyebrow: lang === "es" ? "Lo que construimos" : "What we build",
    subtitle:
      lang === "es"
        ? "Soluciones modulares — elige solo lo que tu negocio necesita."
        : "Modular solutions — pick exactly what your business needs.",
    cta: lang === "es" ? "Ver más" : "Learn more",
    ai: {
      badge: lang === "es" ? "Nuevo · 2026" : "New · 2026",
      title: lang === "es" ? "Asistentes de IA & Chatbots" : "AI Assistants & Chatbots",
      subtitle:
        lang === "es"
          ? "Chatbots inteligentes que responden preguntas, atienden clientes 24/7 y capturan prospectos para tu negocio."
          : "Smart chatbots that answer questions, serve customers 24/7, and capture leads for your business.",
      cta: lang === "es" ? "Explorar IA" : "Explore AI",
    },
  };

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24 overflow-hidden">

      {/* ── Ambient background blobs ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-indigo-200/30 dark:bg-indigo-900/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-violet-200/30 dark:bg-violet-900/20 blur-[120px]"
      />

      {/* ── Header ── */}
      <div className={`relative transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-4">
          <Sparkles className="w-3 h-3" />
          {t.eyebrow}
        </span>

        <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.1]">
          {t.title}
        </h1>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-xl">
          {t.subtitle}
        </p>
      </div>

      {/* ── Services grid ── */}
      <div className="relative mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <a
              key={i}
              href={service.href}
              style={{ transitionDelay: `${i * 60}ms` }}
              className={`
                group relative flex flex-col gap-4 rounded-2xl border p-6
                ${service.bg} ${service.border}
                hover:shadow-xl hover:-translate-y-1
                transition-all duration-300 ease-out
                ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
              `}
            >
              {/* Icon container */}
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-sm`}>
                <Icon className="w-5 h-5 text-white" />
              </div>

              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                  {service.title[lang]}
                </h3>
                <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {service.description[lang]}
                </p>
              </div>

              <div className={`flex items-center gap-1 text-sm font-medium bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                {t.cta}
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1 text-gray-400 group-hover:text-current" />
              </div>
            </a>
          );
        })}
      </div>

      {/* ── AI Feature Banner ── */}
      <div
        id="ai"
        className={`
          relative mt-10 rounded-3xl overflow-hidden border border-blue-100 dark:border-blue-900/40
          bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50
          dark:from-blue-950/40 dark:via-indigo-950/40 dark:to-violet-950/40
          p-8 sm:p-10
          transition-all duration-700 delay-300
          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
      >
        {/* Glow */}
        <div aria-hidden className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-blue-400/20 to-transparent rounded-full blur-3xl" />

        <div className="relative flex flex-col sm:flex-row sm:items-center gap-6">
          {/* Icon */}
          <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
            <Bot className="w-7 h-7 text-white" />
          </div>

          <div className="flex-1">
            <span className="inline-block rounded-full bg-blue-100 dark:bg-blue-900/50 px-2.5 py-0.5 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
              {t.ai.badge}
            </span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t.ai.title}
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 max-w-lg">
              {t.ai.subtitle}
            </p>
          </div>

          <a
            href="/services/ai"
            className="flex-shrink-0 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 hover:-translate-y-0.5"
          >
            {t.ai.cta}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}