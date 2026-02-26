"use client";

import ProjectFlipCards from "@/components/ProjectFlipCards";
import { useEffect, useState } from "react";
import { Sparkles, ArrowUpRight } from "lucide-react";

type Lang = "es" | "en";

type Project = {
  title: string;
  tags: string[];
  images: string[];
  description: Record<Lang, string>;
};

const TAG_COLORS: Record<string, string> = {
  "react-native": "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400",
  supabase: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  ai: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-400",
  revenuecat: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400",
  admob: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400",
  nextjs: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  firebase: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
  openai: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-400",
  stripe: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400",
  wordpress: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  web3: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",
  maps: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
};

const defaultTag = "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";

export default function PortfolioPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setLang(navigator.language.startsWith("es") ? "es" : "en");
    }
    setMounted(true);
  }, []);

  const projects: Project[] = [
    {
      title: "USPS 474 Postal Coach",
      tags: ["react-native", "supabase", "exam-engine", "revenuecat", "admob"],
      images: ["/usps474.png"],
      description: {
        en: "Comprehensive preparation tool for the USPS Virtual Entry Assessment 474, featuring practice tests and career guidance.",
        es: "Herramienta de preparación integral para la Evaluación Virtual de Entrada 474 de USPS, con exámenes de práctica y guía profesional.",
      },
    },
    {
      title: "ASVAB Military Coach",
      tags: ["react-native", "supabase", "exam-engine", "revenuecat", "admob"],
      images: ["/asvab.png"],
      description: {
        en: "Advanced training platform for the Armed Services Vocational Aptitude Battery (ASVAB) to help users qualify for military careers.",
        es: "Plataforma de entrenamiento avanzado para el ASVAB, ayudando a los usuarios a calificar para carreras militares en EE. UU.",
      },
    },
    {
      title: "USA Civics Prep",
      tags: ["react-native", "supabase", "exam-engine", "revenuecat", "admob"],
      images: ["/uscis.png"],
      description: {
        en: "Interactive study guide for the USCIS Naturalization Test, covering all 100 civics questions and citizenship path milestones.",
        es: "Guía de estudio interactiva para el examen de naturalización de USCIS, cubriendo las 100 preguntas de educación cívica y pasos hacia la ciudadanía.",
      },
    },
    {
      title: "HVAC / EPA 608 Coach",
      tags: ["react-native", "supabase", "exam-engine", "revenuecat", "admob"],
      images: ["/hvca.png"],
      description: {
        en: "EPA 608 HVAC exam preparation app with structured questions, timed tests, and professional exam flow.",
        es: "App de preparación para el examen HVAC EPA 608 con preguntas estructuradas, pruebas cronometradas y flujo profesional.",
      },
    },
    {
      title: "TSA CBT Test Coach",
      tags: ["react-native", "supabase", "ai", "revenuecat"],
      images: ["/tsa.png"],
      description: {
        en: "Professional exam prep app for the TSA CBT test, including AI explanations, practice exams, and compliance-focused design.",
        es: "App profesional de preparación para el examen TSA CBT, con explicaciones por IA, prácticas y diseño alineado a políticas.",
      },
    },
    {
      title: "CDL Coach",
      tags: ["react-native", "supabase", "ai", "revenuecat", "admob"],
      images: ["/cdl.png"],
      description: {
        en: "Production-grade mobile app to prepare for the U.S. CDL exam with AI explanations, simulations, voice mode, and monetization.",
        es: "Aplicación móvil en producción para el examen CDL en EE.UU., con IA, simulador, modo voz y monetización.",
      },
    },
    {
      title: "Adondeir (ADI)",
      tags: ["react-native", "supabase", "maps"],
      images: ["/adi.png"],
      description: {
        en: "Tourism discovery app to explore places, rivers, and itineraries with maps, filters, and community content.",
        es: "App de turismo para descubrir lugares, ríos e itinerarios con mapas, filtros y contenido comunitario.",
      },
    },
    {
      title: "OSHA Coach",
      tags: ["react-native", "supabase", "ai", "revenuecat", "admob"],
      images: ["/osha.png"],
      description: {
        en: "Certification prep app for OSHA exams with AI tutor, practice tests, and progress tracking.",
        es: "App de preparación para certificaciones OSHA con tutor IA, prácticas y seguimiento de progreso.",
      },
    },
    {
      title: "Academia Chonji",
      tags: ["wordpress", "education", "membership"],
      images: ["/chonji.jpg"],
      description: {
        en: "Educational website for an academy with course content, institutional info, and professional presentation.",
        es: "Sitio web educativo para una academia con contenido formativo e información institucional.",
      },
    },
    {
      title: "Mi Cheque",
      tags: ["react-native", "finance", "revenuecat"],
      images: ["/micheque.png"],
      description: {
        en: "Simple payroll calculator app to estimate net income after taxes and deductions for U.S. workers.",
        es: "Calculadora de nómina para estimar ingresos netos después de impuestos en EE.UU.",
      },
    },
    {
      title: "Firebase Rule Builder",
      tags: ["nextjs", "firebase", "openai", "stripe"],
      images: ["/RuleBuilder.png"],
      description: {
        en: "Web-based tool to generate secure Firebase Firestore rules using AI, with auth and Stripe payments.",
        es: "Herramienta web para generar reglas seguras de Firestore con IA, autenticación y pagos vía Stripe.",
      },
    },
    {
      title: "J832 Crypto Contract",
      tags: ["web3", "crypto", "smart-contract", "landing"],
      images: ["/j832.png"],
      description: {
        en: "Landing page for a crypto project explaining the J832 smart contract, token utility, and roadmap.",
        es: "Landing page para un proyecto cripto con el contrato J832, utilidad del token y roadmap.",
      },
    },
    {
      title: "Lacu App",
      tags: ["woocommerce", "wordpress", "ecommerce"],
      images: ["/lacu.png"],
      description: {
        en: "E-commerce platform built with WooCommerce, including product management, payments, and responsive design.",
        es: "Plataforma e-commerce con WooCommerce, gestión de productos, pagos y diseño responsivo.",
      },
    },
    {
      title: "Divina Home Care",
      tags: ["wordpress", "business-website"],
      images: ["/divina.png"],
      description: {
        en: "Corporate website for a home care company, focused on services, trust, and lead generation.",
        es: "Sitio web corporativo para una empresa de home care enfocado en servicios y generación de clientes.",
      },
    },
  ];

  // Collect unique top-level tag categories for filter pills
  const categoryMap: Record<string, string> = {
    all: lang === "es" ? "Todos" : "All",
    "react-native": "Mobile",
    nextjs: "Web App",
    wordpress: "WordPress",
    ai: "AI",
    web3: "Web3",
  };

  const filtered =
    filter === "all"
      ? projects
      : projects.filter((p) => p.tags.includes(filter));

  const stats = [
    { value: "14+", label: lang === "es" ? "Proyectos" : "Projects" },
    { value: "9+", label: lang === "es" ? "Apps en producción" : "Live apps" },
    { value: "3", label: lang === "es" ? "Plataformas" : "Platforms" },
    { value: "∞", label: lang === "es" ? "Escalabilidad" : "Scalability" },
  ];

  return (
    <main className="relative min-h-screen bg-white dark:bg-[#0a0a0a] overflow-hidden">

      {/* ── Ambient blobs ── */}
      <div aria-hidden className="pointer-events-none fixed -top-60 -left-60 w-[700px] h-[700px] rounded-full bg-indigo-200/20 dark:bg-indigo-900/15 blur-[140px]" />
      <div aria-hidden className="pointer-events-none fixed -bottom-60 -right-60 w-[600px] h-[600px] rounded-full bg-violet-200/20 dark:bg-violet-900/15 blur-[140px]" />

      {/* ── Hero header ── */}
      <section className="relative max-w-5xl mx-auto px-6 pt-24 pb-10">
        <div className={`transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-5">
            <Sparkles className="w-3 h-3" />
            {lang === "es" ? "Trabajo real" : "Real work"}
          </span>

          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.05]">
            {lang === "es" ? "Portafolio" : "Portfolio"}
          </h1>

          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl">
            {lang === "es"
              ? "Proyectos tecnológicos construidos con enfoque en producto, escalabilidad y experiencia de usuario."
              : "Technology projects built with a strong focus on product, scalability, and user experience."}
          </p>
        </div>

        {/* ── Stats row ── */}
        <div className={`mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 transition-all duration-700 delay-150 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {stats.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 px-5 py-4"
            >
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{s.value}</p>
              <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── Filter pills ── */}
        <div className={`mt-8 flex flex-wrap gap-2 transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {Object.entries(categoryMap).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium border transition-all duration-200 ${filter === key
                ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-500/20"
                : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* ── Project cards ── */}
      <section className="relative max-w-5xl mx-auto px-6 pb-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project, i) => (
            <div
              key={project.title}
              style={{ transitionDelay: `${i * 50}ms` }}
              className={`group relative flex flex-col rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/60 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              {/* Image */}
              <div className="relative h-50 bg-gray-100 dark:bg-gray-800 overflow-hidden">
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-gray-900/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                  <ArrowUpRight className="w-4 h-4 text-gray-800 dark:text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5 gap-3">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white leading-snug">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-1">
                  {project.description[lang]}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-md px-2 py-0.5 text-xs font-medium ${TAG_COLORS[tag] ?? defaultTag}`}
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${defaultTag}`}>
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3D Flip Cards (existing component) ── */}
      <ProjectFlipCards
        projects={projects.map((p) => ({
          title: p.title,
          tags: p.tags,
          image: p.images[0],
          description: p.description,
        }))}
      />

      {/* ── Footer note ── */}
      <section className="text-center pb-24 px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 px-4 py-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <p className="text-sm text-gray-500 dark:text-gray-500">
            {lang === "es"
              ? "Cada proyecto representa una solución real construida para escalar."
              : "Each project represents a real-world solution built to scale."}
          </p>
        </div>
      </section>
    </main>
  );
}