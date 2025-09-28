"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import AnimatedBackground from "@/components/AnimatedBackground";

const texts = {
  es: {
    title1: "Haz crecer tu negocio",
    title2: "rápido y con presupuesto real",
    subtitle:
      "Páginas web y apps móviles para Tu negocios  . Más clientes, más reservas y mejor presencia en Google.",
    bullets: ["Móvil y rápido", "Aparece en Google/Maps", "Listo en pocos días"],
    ctaEstimate: "Pide tu cotización gratis",
    ctaWhatsApp: "Escríbenos por WhatsApp",
    srHero: "Servicios web y móviles para negocios locales ",
  },
  en: {
    title1: "Grow your business",
    title2: "fast and within budget",
    subtitle:
      "Websites and mobile apps for Your businesses. Get more customers, more bookings, and better visibility on Google.",
    bullets: ["Mobile-friendly", "Show up on Google/Maps", "Ready in days"],
    ctaEstimate: "Get your free estimate",
    ctaWhatsApp: "Message us on WhatsApp",
    srHero: "Web and mobile services for local businesses ",
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white py-5"
      aria-label={t.srHero}
    >
      {/* Fondo canvas animado */}
      <AnimatedBackground />

      {/* Contenido */}
      <div className="relative z-10 w-full max-w-5xl px-4 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">
            {t.title1}
          </span>
          <span className="block mt-2 text-white">{t.title2}</span>
        </h1>

        <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">{t.subtitle}</p>

        {/* Beneficios rápidos */}
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {t.bullets.map((b, i) => (
            <li
              key={i}
              className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-sm text-white/90"
            >
              {b}
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/estimate"
            className="rounded-full bg-indigo-500 px-6 py-3 font-semibold text-white shadow-xl hover:bg-indigo-400 transition focus:outline-none focus:ring-2 focus:ring-indigo-300"
            aria-label={t.ctaEstimate}
          >
            {t.ctaEstimate}
          </Link>

          <Link
            href="/portfolio"
            className="rounded-full border border-white/30 px-6 py-3 font-semibold text-white/90 hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-white/40"
            aria-label="See portfolio"
          >
            {lang === "es" ? "Ver proyectos" : "See portfolio"}
          </Link>

          {/* WhatsApp directo (ajusta tu número) */}
          <a
  href="https://wa.me/19292406734"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-emerald-400/40 px-6 py-3 font-semibold text-emerald-300 hover:bg-emerald-500/10 transition focus:outline-none focus:ring-2 focus:ring-emerald-300"
            aria-label={t.ctaWhatsApp}
          >
            {t.ctaWhatsApp}
          </a>
        </div>
      </div>
    </section>
  );
}
