"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";

type Lang = "es" | "en";
type Category = "all" | "mobile" | "web" | "ai" | "web3";

interface Project {
  id: number;
  title: string;
  category: Category[];
  tags: string[];
  image: string;
  year: string;
  platform: string;
  description: { es: string; en: string };
  accent: string; // tailwind gradient classes
}

const PROJECTS: Project[] = [

  {
    id: 2,
    title: "TSA CBT Coach",
    category: ["mobile", "ai"],
    tags: ["React Native", "Supabase", "AI", "RevenueCat"],
    image: "/tsa.png",
    year: "2026",
    platform: "iOS & Android",
    accent: "from-indigo-500 to-violet-400",
    description: {
      en: "Professional exam prep app for the TSA CBT test with AI explanations, practice exams, and compliance-focused design.",
      es: "App de preparación para el examen TSA CBT con explicaciones por IA y prácticas.",
    },
  },

  {
    id: 4,
    title: "USPS 474 Coach",
    category: ["mobile"],
    tags: ["React Native", "Supabase", "RevenueCat", "AdMob"],
    image: "/usps474.png",
    year: "2026",
    platform: "iOS & Android",
    accent: "from-blue-600 to-blue-400",
    description: {
      en: "Comprehensive preparation tool for the USPS Virtual Entry Assessment 474 with practice tests and career guidance.",
      es: "Herramienta integral para la Evaluación USPS 474 con exámenes de práctica.",
    },
  },
  {
    id: 5,
    title: "ASVAB Military Coach",
    category: ["mobile"],
    tags: ["React Native", "Supabase", "RevenueCat", "AdMob"],
    image: "/asvab.png",
    year: "2026",
    platform: "iOS & Android",
    accent: "from-slate-600 to-slate-400",
    description: {
      en: "Advanced training platform for the ASVAB to help users qualify for military careers.",
      es: "Plataforma de entrenamiento avanzado para el examen ASVAB militar.",
    },
  },



  {
    id: 9,
    title: "USA Civics Prep",
    category: ["mobile"],
    tags: ["React Native", "Supabase", "RevenueCat", "AdMob"],
    image: "/uscis.png",
    year: "2026",
    platform: "iOS & Android",
    accent: "from-red-500 to-rose-400",
    description: {
      en: "Interactive study guide for the USCIS Naturalization Test covering all 100 civics questions.",
      es: "Guía interactiva para el examen USCIS con las 100 preguntas de educación cívica.",
    },
  },
  {
    id: 10,
    title: "HVAC EPA 608 Coach",
    category: ["mobile"],
    tags: ["React Native", "Supabase", "RevenueCat"],
    image: "/hvca.png",
    year: "2026",
    platform: "iOS & Android",
    accent: "from-cyan-500 to-sky-400",
    description: {
      en: "EPA 608 HVAC exam preparation app with structured questions, timed tests, and professional exam flow.",
      es: "App de preparación para el examen HVAC EPA 608 con pruebas cronometradas.",
    },
  },
  {
    id: 6,
    title: "OSHA Coach",
    category: ["mobile", "ai"],
    tags: ["React Native", "Supabase", "AI", "RevenueCat"],
    image: "/osha.png",
    year: "2025",
    platform: "iOS & Android",
    accent: "from-orange-500 to-amber-400",
    description: {
      en: "Certification prep app for OSHA exams with AI tutor, practice tests, and progress tracking.",
      es: "App de preparación OSHA con tutor IA y seguimiento de progreso.",
    },
  },
  {
    id: 1,
    title: "CDL Coach",
    category: ["mobile", "ai"],
    tags: ["React Native", "Supabase", "OpenAI", "RevenueCat"],
    image: "/cdl.png",
    year: "2025",
    platform: "iOS & Android",
    accent: "from-blue-500 to-cyan-400",
    description: {
      en: "Production-grade mobile app to prepare for the U.S. CDL exam with AI explanations, simulations, voice mode, and full monetization.",
      es: "App móvil para el examen CDL con IA, simulador, modo voz y monetización completa.",
    },
  },
  {
    id: 12,
    title: "Mi Cheque",
    category: ["mobile"],
    tags: ["React Native", "Finance", "RevenueCat"],
    image: "/micheque.png",
    year: "2025",
    platform: "iOS & Android",
    accent: "from-green-500 to-emerald-400",
    description: {
      en: "Payroll calculator app to estimate net income after taxes and deductions for U.S. workers.",
      es: "Calculadora de nómina para estimar ingresos netos después de impuestos.",
    },


  },

  {
    id: 7,
    title: "Firebase Rule Builder",
    category: ["web", "ai"],
    tags: ["Next.js", "Firebase", "OpenAI", "Stripe"],
    image: "/RuleBuilder.png",
    year: "2025",
    platform: "Web App",
    accent: "from-amber-500 to-orange-400",
    description: {
      en: "Web-based tool to generate secure Firebase Firestore rules using AI, with auth and Stripe payments.",
      es: "Herramienta web para generar reglas de Firestore con IA y pagos vía Stripe.",
    },
  }, {

    id: 8,
    title: "J832 Crypto Contract",
    category: ["web", "web3"],
    tags: ["Next.js", "Web3", "Smart Contract", "Landing"],
    image: "/j832.png",
    year: "2025",
    platform: "Web",
    accent: "from-violet-500 to-purple-400",
    description: {
      en: "Landing page for a crypto project explaining the J832 smart contract, token utility, and roadmap.",
      es: "Landing page para proyecto cripto con el contrato J832 y utilidad del token.",
    },
  },
  {
    id: 15,
    title: "HDV",
    category: ["mobile"],
    tags: ["React Native", "Maps"],
    image: "/hdv.png",
    year: "2024",
    platform: "iOS & Android",
    accent: "from-green-500 to-emerald-400",
    description: {
      en: "Fuel monitoring app for gas stations.",
      es: "App de monitoreo de combustible para estaciones de servicio.",
    },
  },


  {
    id: 13,
    title: "Lacu App",
    category: ["web"],
    tags: ["WooCommerce", "WordPress", "E-commerce"],
    image: "/lacu.png",
    year: "2023",
    platform: "Web",
    accent: "from-pink-500 to-rose-400",
    description: {
      en: "E-commerce platform with WooCommerce, product management, payments, and responsive design.",
      es: "Plataforma e-commerce con WooCommerce, pagos y diseño responsivo.",
    },
  },
  {
    id: 3,
    title: "Adondeir (ADI)",
    category: ["mobile"],
    tags: ["React Native", "Supabase", "Maps", "TypeScript"],
    image: "/adi.png",
    year: "2022",
    platform: "iOS & Android",
    accent: "from-emerald-500 to-teal-400",
    description: {
      en: "Tourism discovery app to explore places, rivers, and itineraries with maps, filters, and community content.",
      es: "App de turismo para descubrir lugares e itinerarios con mapas y filtros avanzados.",
    },
  },
  {
    id: 11,
    title: "Academia Chonji",
    category: ["web"],
    tags: ["WordPress", "Education", "Membership"],
    image: "/chonji.jpg",
    year: "2022",
    platform: "Web",
    accent: "from-teal-500 to-emerald-400",
    description: {
      en: "Educational website for an academy with course content, institutional info, and professional presentation.",
      es: "Sitio educativo para academia con contenido formativo e información institucional.",
    },
  },
  {
    id: 14,
    title: "Divina Home Care",
    category: ["web"],
    tags: ["WordPress", "Business"],
    image: "/divina.png",
    year: "2022",
    platform: "Web",
    accent: "from-blue-500 to-indigo-400",
    description: {
      en: "Corporate website for a home care company focused on services, trust, and lead generation.",
      es: "Sitio corporativo para empresa de home care con enfoque en generación de clientes.",
    },
  },

];

const CATEGORIES: { key: Category; label_en: string; label_es: string }[] = [
  { key: "all", label_en: "All Work", label_es: "Todo" },
  { key: "mobile", label_en: "Mobile Apps", label_es: "Apps Móviles" },
  { key: "web", label_en: "Web", label_es: "Web" },
  { key: "ai", label_en: "AI", label_es: "IA" },
  { key: "web3", label_en: "Web3", label_es: "Web3" },
];

// ── Animated number counter ──────────────────────────────────────────────────
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const hasRun = useRef(false);

  useEffect(() => {
    if (!isInView || !ref.current || hasRun.current) return;
    hasRun.current = true;
    const start = performance.now();
    const duration = 1800;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      if (ref.current) ref.current.textContent = Math.round(ease * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, target, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

// ── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, index, lang }: { project: Project; index: number; lang: Lang }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isFeatured = index === 0 || index === 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay: (index % 3) * 0.1 }}
      className={`group relative rounded-[28px] border border-slate-200 bg-white overflow-hidden
                  hover:shadow-2xl hover:shadow-slate-900/10 hover:-translate-y-2 hover:border-blue-200
                  transition-all duration-500 flex flex-col
                  ${isFeatured ? "md:col-span-1 lg:col-span-1" : ""}`}
    >
      {/* Top gradient accent line */}
      <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${project.accent} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10`} />

      {/* Image container */}
      <div className="relative overflow-hidden bg-slate-100" style={{ height: isFeatured ? 280 : 220 }}>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
        />
        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {/* Hover CTA overlay */}
        <div className="absolute inset-0 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0">
          <Link
            href="/estimate"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-black uppercase tracking-widest text-slate-900 shadow-lg hover:bg-blue-600 hover:text-white transition-colors"
          >
            {lang === "es" ? "Iniciar proyecto similar" : "Start similar project"}
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* Year badge */}
        <div className="absolute top-4 left-4 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-700 shadow-sm">
          {project.year}
        </div>

        {/* Platform badge */}
        <div className="absolute top-4 right-4 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-700 shadow-sm">
          {project.platform}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Index watermark */}
        <div className="absolute top-[220px] right-4 text-[72px] font-black text-slate-100 leading-none select-none pointer-events-none group-hover:text-blue-50 transition-colors duration-500" style={{ top: isFeatured ? 280 : 220 }}>
          {String(project.id).padStart(2, "0")}
        </div>

        <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 mb-2 group-hover:text-blue-700 transition-colors relative z-10">
          {project.title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-4 relative z-10">
          {project.description[lang]}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 relative z-10">
          {project.tags.slice(0, 3).map(tag => (
            <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600">
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-bold text-slate-400">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function PortfolioPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [filter, setFilter] = useState<Category>("all");

  useEffect(() => {
    if (typeof navigator !== "undefined")
      setLang(navigator.language.toLowerCase().startsWith("es") ? "es" : "en");
  }, []);

  const L = (es: string, en: string) => lang === "es" ? es : en;

  const filtered = filter === "all"
    ? PROJECTS
    : PROJECTS.filter(p => p.category.includes(filter));

  return (
    <main className="relative bg-white min-h-screen overflow-hidden">

      {/* Subtle background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_40%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse,rgba(37,99,235,0.05)_0%,transparent_70%)] pointer-events-none" />

      <section className="relative max-w-7xl mx-auto px-6 pt-28 pb-32">

        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-20"
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-black tracking-[0.2em] uppercase mb-6 shadow-sm">
            {L("Trabajo real", "Real work")}
          </span>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-none text-slate-900">
              {L("Port", "Port")}<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">{L("folio.", "folio.")}</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-md lg:pb-3 leading-relaxed font-light">
              {L(
                "Proyectos en producción construidos con enfoque en producto, escalabilidad y experiencia de usuario.",
                "Production projects built with a strong focus on product quality, scalability, and user experience."
              )}
            </p>
          </div>
        </motion.div>

        {/* ── Stats strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-100 rounded-3xl overflow-hidden border border-slate-100 mb-16"
        >
          {[
            { target: 15, suffix: "+", label_en: "Projects", label_es: "Proyectos" },
            { target: 9, suffix: "+", label_en: "Live apps", label_es: "Apps en producción" },
            { target: 3, suffix: "", label_en: "Platforms", label_es: "Plataformas" },
            { target: 40, suffix: "+", label_en: "Downloads (K)", label_es: "Descargas (K)" },
          ].map((s, i) => (
            <div key={i} className="bg-white px-8 py-8 text-center group hover:bg-slate-50 transition-colors">
              <div className="text-4xl font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors duration-300 tabular-nums">
                <Counter target={s.target} suffix={s.suffix} />
              </div>
              <div className="text-[10px] text-slate-400 mt-2 font-black uppercase tracking-[0.2em]">
                {lang === "es" ? s.label_es : s.label_en}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Filter tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`relative rounded-full px-6 py-2.5 text-xs font-black uppercase tracking-widest transition-all duration-300
                ${filter === cat.key
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 scale-105"
                  : "border border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-600 bg-white"}`}
            >
              {lang === "es" ? cat.label_es : cat.label_en}
              {filter === cat.key && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-blue-600 -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
          <span className="ml-auto self-center text-[10px] font-black uppercase tracking-widest text-slate-400">
            {filtered.length} {L("proyectos", "projects")}
          </span>
        </motion.div>

        {/* ── Project grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} lang={lang} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── CTA footer ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-24 relative rounded-[2.5rem] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-8 py-20 sm:px-20 text-center overflow-hidden shadow-xl shadow-blue-900/5"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05)_0%,transparent_70%)]" />
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">
                {L("Disponible para nuevos proyectos", "Available for new projects")}
              </p>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-slate-900 mb-5">
              {L("¿Tu proyecto es el siguiente?", "Is your project next?")}
            </h2>
            <p className="text-slate-500 mb-10 max-w-lg mx-auto">
              {L(
                "Cuéntanos tu idea y te damos un plan de acción en 24 horas.",
                "Tell us your idea and we'll give you an action plan within 24 hours."
              )}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/estimate"
                className="rounded-full bg-blue-600 px-10 py-4 text-sm font-black uppercase tracking-widest text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:scale-105 transition-all"
              >
                {L("Planear mi proyecto →", "Plan my project →")}
              </Link>
              <a
                href="https://wa.me/19292406734"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-10 py-4 text-sm font-black uppercase tracking-widest text-blue-700 shadow-sm hover:bg-blue-50 hover:scale-105 transition-all"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </motion.div>

      </section>
    </main>
  );
}