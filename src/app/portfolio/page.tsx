// app/portfolio/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

type Lang = "es" | "en";

type Project = {
  title: string;
  tags: string[];
  images: string[];
  featured?: boolean;
  description: Record<Lang, string>;
  results: Record<Lang, string[]>;
  metrics?: Record<Lang, { label: string; value: string }[]>;
};

export default function PortfolioPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [activeProject, setActiveProject] = useState<null | number>(null);

  // Gallery state per card
  const [activeImageByProject, setActiveImageByProject] = useState<
    Record<number, number>
  >({});

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setLang(navigator.language.startsWith("es") ? "es" : "en");
    }
  }, []);

  const projects: Project[] = [
    { title: "CDL Coach", tags: ["React Native", "AsyncStorage", "RevenueCat"], images: ["/cdl.png"], description: { en: "Bilingual mobile app to prepare for the U.S. CDL exam with AI study flow.", es: "App móvil bilingüe para prepararse al examen CDL en EE.UU. con flujo de estudio por IA.", }, results: { en: ["Reduced study time by 50%", "Subscription-ready with in-app purchases",], es: ["Reducción del tiempo de estudio en 50%", "Listo para suscripciones con compras dentro de la app",], }, },
    {
      title: "OSHA Coach",
      tags: ["React Native", "Supabase", "AI Tutor"],
      images: ["/osha.webp"],
      featured: true,
      description: {
        en: "Mobile app to prepare for OSHA safety certification exams with AI explanations.",
        es: "App móvil para prepararse para certificaciones OSHA con explicaciones guiadas por IA.",
      },
      results: {
        en: ["Improved pass rate on first attempt", "AI-powered explanations per question"],
        es: ["Mejora del porcentaje de aprobación en el primer intento", "Explicaciones con IA por cada pregunta"],
      },
      metrics: {
        en: [
          { label: "Focus", value: "Safety exam prep" },
          { label: "Core feature", value: "AI explanations" },
        ],
        es: [
          { label: "Enfoque", value: "Preparación de seguridad" },
          { label: "Función clave", value: "Explicaciones con IA" },
        ],
      },
    },
    {
      title: "HVAC Coach",
      tags: ["React Native", "Supabase", "Exam Engine"],
      images: ["/e3.jpg"],
      featured: true,
      description: {
        en: "Exam prep app for EPA 608 HVAC certification with structured practice tests.",
        es: "App de preparación para la certificación HVAC EPA 608 con exámenes estructurados.",
      },
      results: {
        en: ["Covers all EPA 608 sections", "Designed for scalable certification niches"],
        es: ["Cubre todas las secciones del EPA 608", "Diseñada para escalar a otros nichos de certificación"],
      },
      metrics: {
        en: [
          { label: "Exam", value: "EPA 608" },
          { label: "Flow", value: "Structured tests" },
        ],
        es: [
          { label: "Examen", value: "EPA 608" },
          { label: "Flujo", value: "Tests estructurados" },
        ],
      },
    },
    {
      title: "Mi Cheque",
      tags: ["React Native", "Finance", "UX"],
      images: ["/micheque.jpg"],
      description: {
        en: "Payroll calculator app to estimate net pay after taxes and deductions.",
        es: "Calculadora de nómina para estimar el pago neto después de impuestos y deducciones.",
      },
      results: {
        en: ["Clear net pay estimation for workers", "Optimized for Spanish-speaking users"],
        es: ["Estimación clara del pago neto para trabajadores", "Optimizada para usuarios de habla hispana"],
      },
    },
    {
      title: "CDL Coach",
      tags: ["React Native", "AsyncStorage", "RevenueCat"],
      images: ["/cdl.png"],
      featured: true,
      description: {
        en: "Bilingual mobile app to prepare for the U.S. CDL exam with AI study flow.",
        es: "App móvil bilingüe para prepararse al examen CDL en EE.UU. con flujo de estudio por IA.",
      },
      results: {
        en: ["Reduced study time by 50%", "Subscription-ready with in-app purchases"],
        es: ["Reducción del tiempo de estudio en 50%", "Listo para suscripciones con compras dentro de la app"],
      },
      metrics: {
        en: [
          { label: "Platform", value: "iOS / Android" },
          { label: "Monetization", value: "RevenueCat" },
        ],
        es: [
          { label: "Plataforma", value: "iOS / Android" },
          { label: "Monetización", value: "RevenueCat" },
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
        en: ["Improved tourist engagement across 3+ regions", "Integrated local storage and geolocation"],
        es: ["Mejoró la interacción turística en 3+ regiones", "Integración de almacenamiento local y geolocalización"],
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
        en: ["Increased online participation in church events", "Enabled real-time interaction with members via chat"],
        es: ["Incremento de participación en eventos en línea", "Interacción en tiempo real con miembros vía chat"],
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
        es: ["Checkout simplificado con integración de Stripe", "Mejor atención al cliente mediante chat en vivo."],
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

  const featuredProjects = useMemo(
    () => projects.map((p, i) => ({ ...p, __index: i })).filter((p: any) => p.featured),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  ) as (Project & { __index: number })[];

  const restProjects = useMemo(
    () => projects.map((p, i) => ({ ...p, __index: i })).filter((p: any) => !p.featured),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  ) as (Project & { __index: number })[];

  function setActiveImage(projectIndex: number, imageIndex: number) {
    setActiveImageByProject((prev) => ({ ...prev, [projectIndex]: imageIndex }));
  }

  function getActiveImageIndex(projectIndex: number) {
    return activeImageByProject[projectIndex] ?? 0;
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      {/* Header */}
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

      {/* Featured */}
      {featuredProjects.length > 0 && (
        <section className="mb-12">
          <div className="flex items-end justify-between gap-4 flex-wrap mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {lang === "es" ? "Destacados" : "Featured"}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {lang === "es"
                ? "Los proyectos con más enfoque en producto, crecimiento y arquitectura."
                : "Projects with strong product focus, growth mindset, and scalable architecture."}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {featuredProjects.slice(0, 2).map((p) => {
              const idx = p.__index;
              const activeImg = getActiveImageIndex(idx);

              return (
                <article
                  key={p.title}
                  className="rounded-3xl border border-gray-200/30 bg-white/70 dark:bg-gray-900/50 p-6 backdrop-blur-xl shadow-sm hover:shadow-xl transition"
                >
                  <div className="grid md:grid-cols-5 gap-6 items-start">
                    {/* Image */}
                    <div className="md:col-span-3">
                      {p.images?.length > 0 && (
                        <>
                          <div
                            className="overflow-hidden rounded-2xl cursor-pointer border border-gray-200/20 dark:border-white/10"
                            onClick={() => setActiveProject(idx)}
                          >
                            <Image
                              src={p.images[activeImg] ?? p.images[0]}
                              alt={`${p.title} screenshot`}
                              width={1200}
                              height={720}
                              className="rounded-2xl object-cover hover:scale-[1.02] transition-transform"
                              priority
                            />
                          </div>

                          {/* Thumbnails */}
                          {p.images.length > 1 && (
                            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                              {p.images.slice(0, 5).map((img, i) => {
                                const isActive = i === activeImg;
                                return (
                                  <button
                                    key={img + i}
                                    type="button"
                                    onClick={() => setActiveImage(idx, i)}
                                    className={[
                                      "relative h-10 w-14 shrink-0 overflow-hidden rounded-xl border transition",
                                      isActive
                                        ? "border-gray-900/40 dark:border-white/40"
                                        : "border-gray-200/30 dark:border-white/10 hover:border-gray-900/30 dark:hover:border-white/20",
                                    ].join(" ")}
                                    aria-label={`Select image ${i + 1} for ${p.title}`}
                                  >
                                    <Image
                                      src={img}
                                      alt={`${p.title} thumbnail ${i + 1}`}
                                      fill
                                      className="rounded-2xl object-cover max-h-[340px] w-full hover:scale-[1.02] transition-transform"

                                    />
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {/* Content */}
                    <div className="md:col-span-2">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                          {p.title}
                        </h3>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="text-xs font-medium rounded-full border border-gray-300/30 bg-gray-100/20 px-3 py-1 text-gray-800 dark:text-gray-200"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <p className="mt-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        {p.description[lang]}
                      </p>

                      {p.metrics?.[lang]?.length ? (
                        <div className="mt-4 grid grid-cols-2 gap-3">
                          {p.metrics[lang].slice(0, 4).map((m, i) => (
                            <div
                              key={m.label + i}
                              className="rounded-2xl border border-gray-200/30 dark:border-white/10 bg-white/50 dark:bg-gray-900/40 p-3"
                            >
                              <div className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                {m.label}
                              </div>
                              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                {m.value}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : null}

                      <ul className="mt-4 list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        {p.results[lang].map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>

                      <button
                        type="button"
                        className="mt-5 inline-flex items-center justify-center rounded-2xl border border-gray-200/40 dark:border-white/10 bg-white/60 dark:bg-gray-900/40 px-4 py-2 text-sm text-gray-900 dark:text-white hover:shadow transition"
                        onClick={() => setActiveProject(idx)}
                      >
                        {lang === "es" ? "Ver imágenes" : "View images"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* Projects grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {restProjects.map((p) => {
          const idx = p.__index;
          const activeImg = getActiveImageIndex(idx);

          return (
            <article
              key={p.title}
              className="rounded-2xl border border-gray-200/20 bg-white/60 dark:bg-gray-900/40 p-6 backdrop-blur-lg hover:shadow-xl transition"
            >
              {/* Image + thumbnails */}
              {p.images?.length > 0 && (
                <>


                  <div
                    className="mb-3 relative h-[220px] overflow-hidden rounded-xl cursor-pointer border border-gray-200/20 dark:border-white/10"
                    onClick={() => setActiveProject(idx)}
                  >
                    <Image
                      src={p.images[activeImg] ?? p.images[0]}
                      alt={`${p.title} screenshot`}
                      fill
                      className="object-cover transition-transform hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>


                  {p.images.length > 1 && (
                    <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
                      {p.images.slice(0, 5).map((img, i) => {
                        const isActive = i === activeImg;
                        return (
                          <button
                            key={img + i}
                            type="button"
                            onClick={() => setActiveImage(idx, i)}
                            className={[
                              "relative h-12 w-16 shrink-0 overflow-hidden rounded-lg border transition",
                              isActive
                                ? "border-gray-900/40 dark:border-white/40"
                                : "border-gray-200/30 dark:border-white/10 hover:border-gray-900/30 dark:hover:border-white/20",
                            ].join(" ")}
                            aria-label={`Select image ${i + 1} for ${p.title}`}
                          >
                            <Image src={img} alt={`${p.title} thumbnail ${i + 1}`} fill className="object-cover" />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </>
              )}

              {/* Title + tags */}
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

              {/* Description */}
              <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {p.description[lang]}
              </p>

              {/* Results */}
              <ul className="mt-4 list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                {p.results[lang].map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>

              <button
                type="button"
                className="mt-5 inline-flex items-center justify-center rounded-2xl border border-gray-200/40 dark:border-white/10 bg-white/60 dark:bg-gray-900/40 px-4 py-2 text-sm text-gray-900 dark:text-white hover:shadow transition"
                onClick={() => setActiveProject(idx)}
              >
                {lang === "es" ? "Ver imágenes" : "View images"}
              </button>
            </article>
          );
        })}
      </div>

      {/* Modal */}
      {activeProject !== null && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setActiveProject(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="max-w-6xl w-full max-h-[90vh] overflow-y-auto p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <div>
                <div className="text-white text-lg font-semibold">
                  {projects[activeProject].title}
                </div>
                <div className="text-white/70 text-sm">
                  {lang === "es" ? "Galería" : "Gallery"}
                </div>
              </div>

              <button
                className="text-white/90 hover:text-white rounded-xl border border-white/15 px-4 py-2"
                onClick={() => setActiveProject(null)}
                type="button"
              >
                ✕ {lang === "es" ? "Cerrar" : "Close"}
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {projects[activeProject].images.map((img, i) => (
                <div
                  key={img + i}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-black/20"
                >
                  <Image
                    src={img}
                    alt={`${projects[activeProject].title} screenshot ${i + 1}`}
                    width={1200}
                    height={900}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
