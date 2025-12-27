"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AnimatedBackground from "@/components/AnimatedBackground";

const texts = {
  es: {
    title1: "Diseñamos y construimos",
    title2: "productos digitales",
    subtitle:
      "Plataformas web, aplicaciones móviles y automatización de procesos para startups y empresas en crecimiento. Tecnología a medida, lista para escalar.",
    bullets: [
      "Web apps y mobile apps",
      "Automatización de procesos",
      "Soluciones escalables y seguras",
    ],
    ctaEstimate: "Iniciar un proyecto",
    ctaWhatsApp: "Hablar con un especialista",
    srHero: "Empresa de desarrollo de software y automatización",
  },
  en: {
    title1: "We design and build",
    title2: "digital products",
    subtitle:
      "Web platforms, mobile applications, and automation solutions for startups and growing businesses. Custom-built, scalable, and production-ready.",
    bullets: [
      "Web platforms & mobile apps",
      "Business process automation",
      "Scalable, secure solutions",
    ],
    ctaEstimate: "Start a project",
    ctaWhatsApp: "Talk to a specialist",
    srHero: "Software development and automation company",
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
    <section
      className="relative min-h-screen overflow-hidden
             bg-gradient-to-b from-white via-white to-slate-50 text-slate-900 py-6"
    >

      {/* Fondo 3D animado */}
      <AnimatedBackground />

      {/* Panel de contenido */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div
          className="w-full max-w-5xl mx-auto
               px-6 py-10 md:px-10 md:py-14
               rounded-3xl
               bg-white/70 backdrop-blur-xl
               border border-slate-200/60
               shadow-[0_20px_60px_rgba(0,0,0,0.08)]
               text-center"
        >

          {/* Título */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            <span className="block text-slate-900">
              {t.title1}
            </span>
            <span
              className="block mt-2
                       bg-clip-text text-transparent
                       bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600"
            >
              {t.title2}
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>

          {/* Features */}
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {t.bullets.map((b, i) => (
              <li
                key={i}
                className="flex items-center gap-2
                         rounded-full
                         bg-slate-900 text-white
                         px-4 py-2 text-sm font-medium
                         shadow-sm"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                {b}
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {/* CTA principal */}
            <Link
              href="/estimate"
              className="rounded-full
                       bg-slate-900 px-7 py-3
                       font-semibold text-white
                       shadow-xl
                       hover:bg-slate-800 transition
                       focus:outline-none focus:ring-2 focus:ring-slate-400"
              aria-label={t.ctaEstimate}
            >
              {t.ctaEstimate}
            </Link>

            {/* CTA secundario */}
            <Link
              href="/portfolio"
              className="rounded-full
                       border border-slate-300
                       px-7 py-3
                       font-semibold text-slate-700
                       hover:bg-slate-100 transition"
              aria-label="See portfolio"
            >
              {lang === "es" ? "Ver proyectos" : "See portfolio"}
            </Link>

            {/* WhatsApp */}
            <a
              href="https://wa.me/19292406734"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full
                       border border-emerald-400
                       px-7 py-3
                       font-semibold text-emerald-600
                       hover:bg-emerald-50 transition"
              aria-label={t.ctaWhatsApp}
            >
              {t.ctaWhatsApp}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
