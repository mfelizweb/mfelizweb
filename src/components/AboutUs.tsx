"use client";
import { useEffect, useState } from "react";

const texts = {
  en: {
    title: "About Us",
    paragraph:
      "We're a bilingual team passionate about crafting powerful digital products. From mobile apps to web platforms, we build modern tools for modern businesses.",
    blocks: [
      {
        title: "💡 Innovation",
        desc: "We transform ideas into scalable, elegant solutions using modern tech.",
      },
      {
        title: "🤝 Collaboration",
        desc: "We partner with clients at every step — from planning to launch and beyond.",
      },
      {
        title: "🚀 Growth",
        desc: "We focus on creating digital systems that grow with your business.",
      },
    ],
  },
  es: {
    title: "Sobre Nosotros",
    paragraph:
      "Somos un equipo bilingüe apasionado por crear productos digitales potentes. Desde apps móviles hasta plataformas web, construimos herramientas modernas para negocios modernos.",
    blocks: [
      {
        title: "💡 Innovación",
        desc: "Transformamos ideas en soluciones escalables y elegantes con tecnología moderna.",
      },
      {
        title: "🤝 Colaboración",
        desc: "Acompañamos a nuestros clientes en cada paso — del plan al lanzamiento y más allá.",
      },
      {
        title: "🚀 Crecimiento",
        desc: "Creamos sistemas digitales que crecen con tu negocio.",
      },
    ],
  },
};

export default function AboutUs() {
  const [lang, setLang] = useState<"en" | "es">("en");

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setLang(navigator.language.startsWith("es") ? "es" : "en");
    }
  }, []);

  const t = texts[lang];

  return (
    <section
      id="about"
      className="relative min-h-[80vh] flex items-center justify-center bg-white text-gray-800 px-6 sm:px-10 lg:px-20"
    >
      <div className="max-w-5xl w-full text-center">
        <h2 className="text-4xl sm:text-5xl font-light">
          {t.title}
        </h2>

        <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
          {t.paragraph}
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {t.blocks.map((block, i) => (
            <div
              key={i}
              className="p-6 text-left bg-white hover:bg-gray-50 border border-gray-100 rounded-xl transition"
            >
              <h3 className="text-xl font-semibold text-gray-900">{block.title}</h3>
              <p className="mt-2 text-sm text-gray-500">{block.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
