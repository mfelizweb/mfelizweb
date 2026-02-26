"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AnimatedBackground from "@/components/AnimatedBackground";

const texts = {
  es: {
    badge: "Disponible para nuevos proyectos",
    title1: "Diseñamos y construimos",
    title2: "productos digitales",
    subtitle:
      "Plataformas web, apps móviles y automatización para startups y empresas en crecimiento. A medida, escalable, listo para producción.",
    bullets: [
      "Web apps y mobile apps",
      "Automatización de procesos",
      "Soluciones escalables y seguras",
    ],
    ctaEstimate: "Iniciar un proyecto",
    ctaPortfolio: "Ver proyectos",
    ctaWhatsApp: "Hablar por WhatsApp",
  },
  en: {
    badge: "Available for new projects",
    title1: "We design and build",
    title2: "digital products",
    subtitle:
      "Web platforms, mobile apps, and automation for startups and growing businesses. Custom-built, scalable, and production-ready.",
    bullets: [
      "Web platforms & mobile apps",
      "Business process automation",
      "Scalable, secure solutions",
    ],
    ctaEstimate: "Start a project",
    ctaPortfolio: "See portfolio",
    ctaWhatsApp: "Message on WhatsApp",
  },
};

export default function Hero() {
  const [lang, setLang] = useState<"es" | "en">("en");

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setLang(navigator.language?.toLowerCase().startsWith("es") ? "es" : "en");
    }
  }, []);

  const t = texts[lang];

  return (
    <section className="relative min-h-screen overflow-hidden bg-white text-slate-900">

      {/* Fondo animado */}
      <AnimatedBackground />

      {/* Orb decorativo */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-200px] left-1/2 -translate-x-1/2
                   w-[700px] h-[700px] rounded-full
                   bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.10)_0%,transparent_65%)]"
      />

      {/* Contenido */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 py-32">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-600 shadow-sm mb-10">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {t.badge}
        </div>

        {/* Título */}
        <h1 className="max-w-4xl text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.05] tracking-tight">
          <span className="block text-slate-900">{t.title1}</span>
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500 mt-1">
            {t.title2}
          </span>
        </h1>

        {/* Subtítulo */}
        <p className="mt-7 max-w-xl text-lg text-slate-500 leading-relaxed font-normal">
          {t.subtitle}
        </p>

        {/* Bullets */}
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {t.bullets.map((b, i) => (
            <li
              key={i}
              className="flex items-center gap-2 rounded-full bg-slate-50 border border-slate-200 px-4 py-1.5 text-sm font-medium text-slate-700"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
              {b}
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/estimate"
            className="rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white shadow-lg
                       hover:bg-indigo-600 transition-colors duration-200
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
          >
            {t.ctaEstimate}
          </Link>

          <Link
            href="/portfolio"
            className="rounded-full border border-slate-200 bg-white px-7 py-3 text-sm font-semibold text-slate-700
                       hover:border-slate-300 hover:bg-slate-50 transition-colors duration-200"
          >
            {t.ctaPortfolio}
          </Link>

          <a
            href="https://wa.me/19292406734"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-emerald-200 bg-emerald-50 px-7 py-3 text-sm font-semibold text-emerald-700
                       hover:bg-emerald-100 transition-colors duration-200"
          >
            {t.ctaWhatsApp}
          </a>
        </div>

        {/* Social proof */}
        <div className="mt-16 flex items-center gap-6 text-xs text-slate-400">
          <span className="text-amber-400 tracking-wide text-sm">★★★★★</span>
          <div className="w-px h-4 bg-slate-200" />
          <span>AI</span>
          <div className="w-px h-4 bg-slate-200" />
          <span>NYC based</span>
        </div>
      </div>
    </section>
  );
}