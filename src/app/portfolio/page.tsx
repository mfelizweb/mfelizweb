// app/portfolio/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function PortfolioPage() {
  const [lang, setLang] = useState<"es" | "en">("en");

  // Detecta idioma del navegador
  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setLang(navigator.language.startsWith("es") ? "es" : "en");
    }
  }, []);

  const projects = [
        {
      title: "CDL Coach",
      tags: ["React Native", "AsyncStorage", "RevenueCat"],
      image: "/cdl.png",
      description: {
        en: "Bilingual mobile app to prepare for the U.S. CDL exam with AI study flow.",
        es: "App móvil bilingüe para prepararse al examen CDL en EE.UU. con flujo de estudio por IA.",
      },
      results: {
        en: ["Reduced study time by 50%", "Subscription-ready with in-app purchases"],
        es: ["Reducción del tiempo de estudio en 50%", "Listo para suscripciones con compras dentro de la app"],
      },
    },
    {
      title: "Adondeir App",
      tags: ["Angular", "Ionic", "Firebase"],
      image: "/adondeir-app.png",
      description: {
        en: "Tourism discovery app with location-based listings and offline support.",
        es: "App de turismo con listados basados en ubicación y soporte offline.",
      },
      results: {
        en: ["Improved tourist engagement across 3+ regions", "Integrated local storage and geolocation"],
        es: ["Mejoró la interacción turística en 3+ regiones", "Integración de almacenamiento local y geolocalización"],
      },
    },
    {
      title: "Hablando de Vehículos",
      tags: ["Angular", "Ionic", "Firebase"],
      image: "/hablando-app.png",
      description: {
        en: "Mobile app for gas station octane meter  .",
        es: "App móvil de medidor de octanaje de estaciones  de gasolina.",
      },
      results: {
        en: ["Boosted daily views by 40%", ],
        es: ["Aumento de 40% en vistas diarias" ],
      },
    },
     {
      title: "Academia Chon Ji",
      tags: ["WordPress"],
      image: "/chonji.png",
      description: {
        en: "Official website for a Taekwondo and Arts academy in DR.",
        es: "Sitio oficial para academia de Taekwondo y Artes en RD.",
      },
      results: {
        en: ["+70% increase in contact form leads", "Integrated WhatsApp and Google Maps"],
        es: ["+70% de aumento en leads de formulario", "Integración con WhatsApp y Google Maps"],
      },
    },
    {
      title: "Rule Builder (FireRules)",
      tags: ["Next.js", "Supabase", "OpenAI"],
      image: "/firebuilder.webp",
      description: {
        en: "Visual rule engine to generate Firestore security rules using AI.",
        es: "Motor visual para generar reglas de seguridad de Firestore con IA.",
      },
      results: {
        en: ["First visual tool of its kind for Firebase", "Automated validation with GPT-4"],
        es: ["Primer generador visual de reglas para Firebase", "Validación automática con GPT-4"],
      },
    },
 
    
    {
      title: "Coin Sentinel",
      tags: ["Angular", "Node.js", "Express"],
      image: "/coinsentinel.png",
      description: {
        en: "Crypto wallet alert system with real-time monitoring.",
        es: "Sistema de alertas de criptomonedas con monitoreo en tiempo real.",
      },
      results: {
        en: ["Custom alerts for 12+ blockchains", "Reduced false positives using filters"],
        es: ["Alertas personalizadas para 12+ blockchains", "Menos falsos positivos con filtros avanzados"],
      },
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      {/* Encabezado SEO-friendly */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          {lang === "es" ? "Portafolio" : "Portfolio"}
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          {lang === "es"
            ? "Proyectos seleccionados con impacto real en el mundo."
            : "Selected projects built with real-world impact."}
        </p>
      </header>

      {/* Lista de proyectos */}
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((p) => (
          <article
            key={p.title}
            className="rounded-2xl border border-gray-200/20 bg-white/60 dark:bg-gray-900/40 p-6 backdrop-blur-lg hover:shadow-xl transition"
          >
            {/* Imagen destacada */}
            {p.image && (
              <div className="mb-4 overflow-hidden rounded-xl">
                <Image
                  src={p.image}
                  alt={`${p.title} screenshot`}
                  width={800}
                  height={450}
                  className="rounded-xl object-cover hover:scale-105 transition-transform"
                  priority
                />
              </div>
            )}

            {/* Título + tags */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{p.title}</h2>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-medium rounded-full border border-gray-300/30 bg-gray-100/20 px-3 py-1 text-gray-800 dark:text-gray-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Descripción */}
            <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {p.description[lang]}
            </p>

            {/* Resultados */}
            <ul className="mt-4 list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
              {p.results[lang].map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
