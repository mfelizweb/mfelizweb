// app/portfolio/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function PortfolioPage() {
  const [lang, setLang] = useState<"es" | "en">("en");
  const [activeProject, setActiveProject] = useState<null | number>(null);

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
      images: ["/cdl.png" ],
      description: {
        en: "Bilingual mobile app to prepare for the U.S. CDL exam with AI study flow.",
        es: "App móvil bilingüe para prepararse al examen CDL en EE.UU. con flujo de estudio por IA.",
      },
      results: {
        en: [
          "Reduced study time by 50%",
          "Subscription-ready with in-app purchases",
        ],
        es: [
          "Reducción del tiempo de estudio en 50%",
          "Listo para suscripciones con compras dentro de la app",
        ],
      },
    },
    {
      title: "Adondeir App",
      tags: ["Angular", "Ionic", "Firebase"],
      images: ["/adondeir-app.png"],
      description: {
        en: "Tourism discovery app with location-based listings and offline support.",
        es: "App de turismo con listados basados en ubicación y soporte offline.",
      },
      results: {
        en: [
          "Improved tourist engagement across 3+ regions",
          "Integrated local storage and geolocation",
        ],
        es: [
          "Mejoró la interacción turística en 3+ regiones",
          "Integración de almacenamiento local y geolocalización",
        ],
      },
    },
    {
      title: "Hablando de Vehículos",
      tags: ["Angular", "Ionic", "Firebase"],
      images: ["/hablando-app.png"],
      description: {
        en: "Mobile app for gas station octane meter.",
        es: "App móvil de medidor de octanaje de estaciones de gasolina.",
      },
      results: {
        en: ["Boosted daily views by 40%"],
        es: ["Aumento de 40% en vistas diarias"],
      },
    },
    {
      title: "Academia Chon Ji",
      tags: ["WordPress"],
      images: ["/chonji.png", "/chonji-mobile.png"],
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
      images: ["/firebuilder.webp"],
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
      images: ["/coinsentinel.png"],
      description: {
        en: "Crypto wallet alert system with real-time monitoring.",
        es: "Sistema de alertas de criptomonedas con monitoreo en tiempo real.",
      },
      results: {
        en: ["Custom alerts for 12+ blockchains", "Reduced false positives using filters"],
        es: ["Alertas personalizadas para 12+ blockchains", "Menos falsos positivos con filtros avanzados"],
      },
    },
    {
      title: "Alianza Oasis",
      tags: ["Wix"],
      images: ["/aos.png"],
      description: {
        en: "Church website built with Wix including live events, YouTube integration and chat.",
        es: "Página de iglesia creada con Wix con eventos en vivo, integración de YouTube y chat.",
      },
      results: {
        en: [
          "Increased online participation in church events",
          "Enabled real-time interaction with members via chat",
        ],
        es: [
          "Incremento de participación en eventos en línea",
          "Interacción en tiempo real con miembros vía chat",
        ],
      },
    },
    {
      title: "Lacu Store",
      tags: ["WordPress", "WooCommerce", "Stripe"],
      images: ["/lacustore.png"],
      description: {
        en: "E-commerce store built with WooCommerce and WordPress, including Stripe payments and live chat.",
        es: "E-commerce realizado con WooCommerce y WordPress, con pagos Stripe y chat en vivo.",
      },
      results: {
        en: ["Streamlined checkout with Stripe integration", "Enhanced customer support through live chat"],
        es: ["Checkout simplificado con integración de Stripe", "Mejor atención al cliente mediante chat en vivo"],
      },
    },
    {
      title: "Divina Home Care",
      tags: ["WordPress"],
      images: ["/did.png"],
      description: {
        en: "Website for elderly care services with clear service presentation and easy contact.",
        es: "Sitio web para servicios de asistencia a ancianos con presentación clara y contacto fácil.",
      },
      results: {
        en: ["Improved visibility for home care services", "Integrated contact forms for quick inquiries"],
        es: ["Mayor visibilidad para servicios de cuidado", "Integración de formularios de contacto rápidos"],
      },
    },
    {
      title: "SammyArtGrafic",
      tags: ["WordPress"],
      images: ["/sa.png"],
      description: {
        en: "Portfolio website for a graphic designer showcasing creative projects and services.",
        es: "Página portafolio para un diseñador gráfico mostrando proyectos creativos y servicios.",
      },
      results: {
        en: ["Professional online showcase for client projects", "Optimized gallery for fast loading"],
        es: ["Muestra profesional de proyectos para clientes", "Galería optimizada para carga rápida"],
      },
    },
    {
      title: "Raul Resuelve",
      tags: ["WordPress"],
      images: ["/ra.png"],
      description: {
        en: "Website for an electrician technician offering repair and installation services.",
        es: "Web para técnico electricista ofreciendo servicios de reparación e instalación.",
      },
      results: {
        en: ["Simplified customer booking for technical services", "Boosted local presence on Google Maps"],
        es: ["Reservas de clientes simplificadas para servicios técnicos", "Mayor presencia local en Google Maps"],
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
        {projects.map((p, index) => (
          <article
            key={p.title}
            className="rounded-2xl border border-gray-200/20 bg-white/60 dark:bg-gray-900/40 p-6 backdrop-blur-lg hover:shadow-xl transition"
          >
            {/* Imagen destacada */}
            {p.images?.length > 0 && (
              <div
                className="mb-4 overflow-hidden rounded-xl cursor-pointer"
                onClick={() => setActiveProject(index)}
              >
                <Image
                  src={p.images[0]}
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
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {p.title}
              </h2>
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

      {/* Modal de imágenes */}
      {activeProject !== null && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="max-w-5xl max-h-[90vh] overflow-y-auto p-4">
            <button
              className="text-white mb-4"
              onClick={() => setActiveProject(null)}
            >
              ✕ {lang === "es" ? "Cerrar" : "Close"}
            </button>
            <div className="grid sm:grid-cols-2 gap-4">
              {projects[activeProject].images.map((img, i) => (
                <Image
                  key={i}
                  src={img}
                  alt={`${projects[activeProject].title} screenshot ${i + 1}`}
                  width={800}
                  height={600}
                  className="rounded-xl object-cover"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
