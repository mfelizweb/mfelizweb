"use client";

import { useEffect, useState } from "react";

const texts = {
  en: {
    label: "About us",
    title: "Small team.",
    titleAccent: "Big output.",
    paragraph:
      "We're a bilingual studio based in New York, obsessed with clean code and conversion-focused design. We build web platforms, mobile apps, and digital tools for startups and local businesses that want to grow.",
    blocks: [
      {
        icon: "⚡",
        title: "Innovation",
        desc: "We turn ideas into elegant, scalable solutions using modern technologies like React Native, Next.js, and AI.",
      },
      {
        icon: "🤝",
        title: "Collaboration",
        desc: "We work closely with clients at every step — from strategy and design to launch and ongoing support.",
      },
      {
        icon: "📈",
        title: "Growth",
        desc: "We build systems that evolve with your business, designed to scale without friction from day one.",
      },
    ],
    stats: [
      { number: "40+", label: "Projects delivered" },
      { number: "5★", label: "Client satisfaction" },
      { number: "2", label: "Languages" },
      { number: "∞", label: "Support included" },
    ],
  },
  es: {
    label: "Sobre nosotros",
    title: "Equipo pequeño.",
    titleAccent: "Gran resultado.",
    paragraph:
      "Somos un estudio bilingüe en Nueva York, enfocados en código limpio y diseño que convierte. Construimos plataformas web, apps móviles y herramientas digitales para startups y negocios que quieren crecer.",
    blocks: [
      {
        icon: "⚡",
        title: "Innovación",
        desc: "Convertimos ideas en soluciones elegantes y escalables usando React Native, Next.js e IA.",
      },
      {
        icon: "🤝",
        title: "Colaboración",
        desc: "Trabajamos con nuestros clientes en cada etapa — de la estrategia al lanzamiento y más allá.",
      },
      {
        icon: "📈",
        title: "Crecimiento",
        desc: "Creamos sistemas que evolucionan con tu negocio, diseñados para escalar sin fricción desde el día uno.",
      },
    ],
    stats: [
      { number: "40+", label: "Proyectos entregados" },
      { number: "5★", label: "Satisfacción del cliente" },
      { number: "2", label: "Idiomas" },
      { number: "∞", label: "Soporte incluido" },
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
    <section id="about" className="bg-white px-6 sm:px-10 lg:px-20 py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Top row: label + heading + paragraph */}
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-20">

          {/* Left */}
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-indigo-500 mb-4 block">
              {t.label}
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              {t.title}{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-500">
                {t.titleAccent}
              </span>
            </h2>
          </div>

          {/* Right */}
          <p className="text-slate-500 text-lg leading-relaxed font-normal lg:pt-6">
            {t.paragraph}
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-100 rounded-2xl overflow-hidden mb-20 border border-slate-100">
          {t.stats.map((s, i) => (
            <div key={i} className="bg-white px-8 py-8 text-center group hover:bg-slate-50 transition">
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">{s.number}</div>
              <div className="text-xs text-slate-400 mt-1 font-medium uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Blocks */}
        <div className="grid sm:grid-cols-3 gap-6">
          {t.blocks.map((block, i) => (
            <div
              key={i}
              className="group relative rounded-2xl border border-slate-100 bg-slate-50 p-8 text-left
                         transition duration-300 hover:border-indigo-200 hover:bg-white hover:shadow-lg hover:-translate-y-1"
            >
              {/* Top accent line on hover */}
              <div className="absolute top-0 left-0 h-[2px] w-full rounded-t-2xl
                              bg-gradient-to-r from-indigo-500 to-violet-500
                              scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              <div className="text-2xl mb-5">{block.icon}</div>

              <h3 className="text-base font-bold text-slate-900 mb-2">
                {block.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {block.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}