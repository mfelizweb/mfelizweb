"use client";
import { useEffect, useState } from "react";
import AnimatedBackground from "@/components/AnimatedBackground"; // ajusta si tu ruta es distinta

const texts = {
  es: {
    title1: "Impulsa tu idea",
    title2: "con soluciones digitales",
    subtitle: "Creamos apps y sitios que transforman negocios.",
    cta1: "Solicita una consulta",
    cta2: "Ver proyectos",
  },
  en: {
    title1: "Boost your idea",
    title2: "with digital solutions",
    subtitle: "We build apps and websites that transform businesses.",
    cta1: "Request a Consultation",
    cta2: "See Portfolio",
  },
};

export default function Hero() {
  const [lang, setLang] = useState<"es" | "en">("en");

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setLang(navigator.language.startsWith("es") ? "es" : "en");
    }
  }, []);

  const t = texts[lang];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Fondo canvas animado */}
      <AnimatedBackground />

      {/* Contenido */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">
            {t.title1}
          </span>
          <span className="block mt-2 text-white">{t.title2}</span>
        </h1>

        <p className="mt-6 text-lg text-white/70 max-w-xl mx-auto">{t.subtitle}</p>

        <div className="mt-8 flex justify-center gap-4">
          <a
            href="/contact"
            className="rounded-full bg-indigo-500 px-6 py-3 font-semibold text-white shadow-xl hover:bg-indigo-400 transition"
          >
            {t.cta1}
          </a>
          <a
            href="/portfolio"
            className="rounded-full border border-white/30 px-6 py-3 font-semibold text-white/80 hover:bg-white/10 transition"
          >
            {t.cta2}
          </a>
        </div>
      </div>
    </section>
  );
}
