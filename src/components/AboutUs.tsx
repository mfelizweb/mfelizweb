"use client";

import { useEffect, useState } from "react";

const texts = {
  en: {
    title: "About Us",
    paragraph:
      "We’re a bilingual team focused on building modern digital products. From mobile applications to scalable web platforms, we design technology that helps businesses grow with confidence.",
    blocks: [
      {
        title: "Innovation",
        desc: "We transform ideas into scalable, elegant solutions using modern technologies.",
      },
      {
        title: "Collaboration",
        desc: "We work closely with our clients at every stage — from strategy to launch and beyond.",
      },
      {
        title: "Growth",
        desc: "We design digital systems that evolve with your business and scale without friction.",
      },
    ],
  },
  es: {
    title: "Sobre Nosotros",
    paragraph:
      "Somos un equipo bilingüe enfocado en construir productos digitales modernos. Desde aplicaciones móviles hasta plataformas web escalables, diseñamos tecnología que impulsa el crecimiento de los negocios.",
    blocks: [
      {
        title: "Innovación",
        desc: "Convertimos ideas en soluciones elegantes y escalables usando tecnología moderna.",
      },
      {
        title: "Colaboración",
        desc: "Trabajamos junto a nuestros clientes en cada etapa — de la estrategia al lanzamiento y más allá.",
      },
      {
        title: "Crecimiento",
        desc: "Creamos sistemas digitales que evolucionan con tu negocio sin fricción.",
      },
    ],
  },
};

export default function AboutUs() {
  const [lang, setLang] = useState<"en" | "es">("en");

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setLang(navigator.language?.toLowerCase().startsWith("es") ? "es" : "en");
    }
  }, []);

  const t = texts[lang];

  return (
    <section
      id="about"
      className="relative bg-white text-slate-900
                 px-6 sm:px-10 lg:px-20
                 py-24 overflow-hidden"
    >
      {/* Contenedor principal */}
      <div className="max-w-6xl mx-auto text-center">
        {/* Título */}
        <h2
          className="text-4xl sm:text-5xl md:text-6xl
                     font-semibold tracking-tight"
        >
          {t.title}
        </h2>

        {/* Descripción */}
        <p
          className="mt-6 max-w-3xl mx-auto
                     text-lg text-slate-600 leading-relaxed"
        >
          {t.paragraph}
        </p>

        {/* Bloques */}
        <div
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {t.blocks.map((block, i) => (
            <div
              key={i}
              className="group relative
                         rounded-2xl
                         border border-slate-200/60
                         bg-white
                         p-8 text-left
                         shadow-sm
                         transition
                         hover:shadow-xl
                         hover:-translate-y-1"
            >
              {/* Línea decorativa */}
              <div
                className="absolute top-0 left-0 h-1 w-full
                           rounded-t-2xl
                           bg-gradient-to-r
                           from-indigo-500 via-purple-500 to-indigo-500
                           opacity-0 group-hover:opacity-100
                           transition"
              />

              <h3 className="text-xl font-semibold text-slate-900">
                {block.title}
              </h3>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {block.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
