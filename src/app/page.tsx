"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import ProjectPlanner from "@/components/ProjectPlanner";
import {
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  CreditCardIcon,
  CpuChipIcon,
  LifebuoyIcon,
  SignalIcon,
  MapPinIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

/* ─── helpers ─── */
function useLang() {
  const [lang, setLang] = useState<"es" | "en">("en");
  useEffect(() => {
    if (typeof navigator !== "undefined")
      setLang(navigator.language.toLowerCase().startsWith("es") ? "es" : "en");
  }, []);
  return lang;
}

const L = (lang: "es" | "en", es: string, en: string) => (lang === "es" ? es : en);

/* ─── Magnetic wrapper ─── */
function Magnetic({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 20 });
  const sy = useSpring(y, { stiffness: 150, damping: 20 });
  const rotX = useSpring(useMotionValue(0), { stiffness: 80, damping: 15 });
  const rotY = useSpring(useMotionValue(0), { stiffness: 80, damping: 15 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current!.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = (e.clientX - cx) / (r.width / 2);
    const dy = (e.clientY - cy) / (r.height / 2);
    x.set(dx * 12);
    y.set(dy * 12);
    rotX.set(-dy * 6);
    rotY.set(dx * 6);
  };

  const onLeave = () => {
    x.set(0); y.set(0); rotX.set(0); rotY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy, rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
      className={`cursor-none ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ─── Service Card ─── */
function Card({
  icon, title, desc, href, featured = false, lang, colorClass = "text-blue-600",
}: {
  icon: React.ReactNode; title: string; desc: string; href: string;
  featured?: boolean; lang: "es" | "en"; colorClass?: string;
}) {
  return (
    <Magnetic className="h-full">
      <Link
        href={href}
        data-cursor
        className={`group relative flex flex-col h-full rounded-3xl border border-slate-200 bg-white p-8 overflow-hidden shadow-sm
                   transition-all duration-400 hover:border-blue-200 hover:shadow-xl hover:-translate-y-1`}
      >
        {/* Sliding top line */}
        <div className="absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r from-blue-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

        <div className={`w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6
                        group-hover:scale-110 group-hover:bg-blue-50 group-hover:border-blue-100 transition-all duration-300 shadow-sm`}>
          {icon}
        </div>

        <h3 className={`font-black tracking-tight text-slate-900 mb-3 uppercase ${featured ? "text-2xl sm:text-3xl" : "text-lg"}`}>
          {title}
        </h3>
        <p className={`text-slate-500 leading-relaxed flex-1 ${featured ? "text-base" : "text-sm"}`}>{desc}</p>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            {L(lang, "Explorar", "Explore")}
          </span>
          <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-colors duration-300">
            <svg className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </Link>
    </Magnetic>
  );
}

/* ─── PAGE ─── */
export default function HomePage() {
  const lang = useLang();
  const servicesRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  const plannerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Services header
      gsap.fromTo(".services-title", { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: servicesRef.current, start: "top 80%" },
      });

      // Service cards stagger
      gsap.fromTo(".service-card-wrap", { y: 60, opacity: 0, rotateX: -10 }, {
        y: 0, opacity: 1, rotateX: 0, duration: 0.9, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: servicesRef.current, start: "top 70%" },
      });

      // Process steps 3D reveal
      gsap.fromTo(".process-step", { y: 80, opacity: 0, rotateY: -15 }, {
        y: 0, opacity: 1, rotateY: 0, duration: 1, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: processRef.current, start: "top 75%" },
      });

      // CTA
      gsap.fromTo(".cta-inner", { y: 60, opacity: 0, scale: 0.96 }, {
        y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ctaRef.current, start: "top 80%" },
      });

      // Planner
      gsap.fromTo(".planner-wrap", { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: plannerRef.current, start: "top 80%" },
      });
    });

    return () => ctx.revert();
  }, []);

  const services = [
    { icon: <DevicePhoneMobileIcon className="w-7 h-7 text-blue-600" />, title: L(lang, "Apps Móviles", "Mobile Apps"), desc: L(lang, "iOS & Android nativas con React Native.", "Native iOS & Android with React Native."), href: "/services/mobile", featured: true },
    { icon: <CpuChipIcon className="w-6 h-6 text-indigo-500" />, title: L(lang, "IA & Automatización", "AI & Automation"), desc: L(lang, "Agentes autónomos y flujos inteligentes.", "Autonomous agents & intelligent flows."), href: "/services/ai" },
    { icon: <CodeBracketIcon className="w-6 h-6 text-emerald-500" />, title: L(lang, "Arquitectura Web", "Web Dev"), desc: L(lang, "Plataformas Next.js ultrarrápidas.", "Blazing fast Next.js platforms."), href: "/services/web" },
    { icon: <SignalIcon className="w-6 h-6 text-cyan-500" />, title: L(lang, "Tarjetas NFC", "NFC Cards"), desc: L(lang, "Networking inteligente con analíticas.", "Smart networking & analytics."), href: "/services/nfc" },
    { icon: <CreditCardIcon className="w-6 h-6 text-amber-500" />, title: L(lang, "Pagos", "Payments"), desc: L(lang, "Stripe/Square: checkout & suscripciones.", "Stripe/Square: checkout & subscriptions."), href: "/services/payments" },
    { icon: <MapPinIcon className="w-6 h-6 text-rose-500" />, title: L(lang, "SEO Local", "Local SEO"), desc: L(lang, "Posicionamiento top en tu zona.", "Top organic positioning in your area."), href: "/services/seo" },
    { icon: <ArrowPathIcon className="w-6 h-6 text-violet-500" />, title: L(lang, "Rediseño", "Redesign"), desc: L(lang, "Webs antiguas → experiencias modernas.", "Old sites → modern experiences."), href: "/services/redesign" },
    { icon: <LifebuoyIcon className="w-6 h-6 text-orange-500" />, title: L(lang, "Soporte", "Support"), desc: L(lang, "Mantenimiento y seguridad mensual.", "Monthly maintenance & security."), href: "/services/maintenance" },
  ];

  const steps = [
    { num: "01", title: L(lang, "Discovery", "Discovery"), desc: L(lang, "Análisis de visión, auditoría técnica y arquitectura.", "Vision analysis, technical audit & architecture.") },
    { num: "02", title: L(lang, "Diseño UX", "UX Design"), desc: L(lang, "Interfaces premium y prototipos dinámicos.", "Premium interfaces & dynamic prototypes.") },
    { num: "03", title: L(lang, "Ingeniería", "Engineering"), desc: L(lang, "Sprints ágiles, código limpio, updates semanales.", "Agile sprints, clean code, weekly updates.") },
    { num: "04", title: L(lang, "Deploy", "Deploy"), desc: L(lang, "Lanzamiento, monitoreo y soporte activo.", "Launch, monitoring & active support.") },
  ];

  return (
    <div className="bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">

      {/* ── HERO ── */}
      <Hero />

      {/* ── MARQUEE ── */}
      <div className="border-y border-slate-100 bg-slate-50 py-5 overflow-hidden">
        <div className="marquee-track gap-0">
          {[
            "React Native", "Next.js", "Stripe", "NFC",
            "OpenAI", "SEO", "iOS & Android", "TypeScript",
            "React Native", "Next.js", "Stripe", "NFC",
            "OpenAI", "SEO", "iOS & Android", "TypeScript",
          ].map((item, i) => (
            <span key={i} className="flex items-center gap-3 text-[10px] font-black tracking-[0.25em] uppercase text-slate-400 flex-shrink-0 px-8">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <AboutUs />

      {/* ── SERVICES ── */}
      <section ref={servicesRef} className="relative bg-white px-6 sm:px-10 lg:px-20 py-32 border-t border-slate-100 overflow-hidden">
        {/* Background accent */}
        <div className="absolute right-0 top-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_80%_20%,rgba(37,99,235,0.04)_0%,transparent_60%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto">

          {/* Header row */}
          <div className="services-title flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-20 opacity-0">
            <div>
              <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-black tracking-[0.2em] uppercase mb-5 shadow-sm">
                {L(lang, "Capacidades", "Capabilities")}
              </span>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-none text-slate-900">
                {L(lang, "Lo que hacemos", "What we")}<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
                  {L(lang, "mejor.", "do best.")}
                </span>
              </h2>
            </div>
            <Link href="/services" data-cursor
              className="self-start sm:self-auto inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-bold text-slate-700 shadow-sm hover:border-blue-300 hover:text-blue-700 hover:scale-105 transition-all whitespace-nowrap">
              {L(lang, "Ver todos los servicios →", "All services →")}
            </Link>
          </div>

          {/* Featured top 2 — large side-by-side */}
          <div className="service-card-wrap opacity-0 grid md:grid-cols-2 gap-5 mb-5">
            {services.slice(0, 2).map((s, i) => (
              <Card key={i} {...s} lang={lang} featured />
            ))}
          </div>

          {/* Remaining 6 — compact list rows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {services.slice(2).map((s, i) => (
              <div key={i} className="service-card-wrap opacity-0">
                <Link
                  href={s.href}
                  data-cursor
                  className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 hover:border-blue-300 hover:bg-blue-50/30 hover:shadow-md transition-all duration-300 overflow-hidden relative"
                >
                  <div className="absolute top-0 left-0 h-full w-[3px] bg-gradient-to-b from-blue-500 to-cyan-400 scale-y-0 group-hover:scale-y-100 transition-transform duration-400 origin-top" />
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-blue-100 group-hover:border-blue-100 transition-all duration-300">
                    {s.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-black uppercase tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">{s.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5 truncate">{s.desc}</div>
                  </div>
                  <svg className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 -rotate-45 group-hover:rotate-0 transition-all duration-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section ref={processRef} className="relative bg-slate-950 px-6 sm:px-10 lg:px-20 py-32 overflow-hidden">
        {/* Grid texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        {/* Glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(37,99,235,0.12)_0%,transparent_60%)] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
            <div>
              <span className="inline-block py-1.5 px-4 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-[0.2em] uppercase mb-5">
                {L(lang, "Metodología", "Our Process")}
              </span>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-none text-white">
                {L(lang, "De la idea", "Idea to")}<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                  {L(lang, "al lanzamiento.", "launch.")}
                </span>
              </h2>
            </div>
            <p className="text-slate-400 text-lg max-w-xs lg:pb-2 leading-relaxed">
              {L(lang,
                "Un proceso probado en 40+ proyectos para llevarte de cero a producción.",
                "A battle-tested process across 40+ projects, taking you from zero to shipped."
              )}
            </p>
          </div>

          {/* Steps — horizontal connected timeline */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-3xl overflow-hidden border border-white/10">
            {steps.map((s, i) => (
              <div
                key={i}
                className="process-step group relative bg-slate-900/50 backdrop-blur-sm px-8 py-10 hover:bg-slate-800/60 transition-all duration-500 overflow-hidden opacity-0"
              >
                {/* Active indicator line left */}
                <div className="absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b from-blue-500 to-cyan-400 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />

                {/* Step number large watermark */}
                <div className="text-8xl font-black leading-none text-white/5 group-hover:text-blue-500/10 transition-colors duration-500 mb-6 select-none">
                  {s.num}
                </div>

                {/* Label */}
                <div className="inline-flex items-center gap-1.5 mb-4">
                  <div className="w-5 h-5 rounded-full border border-blue-500/30 bg-blue-500/10 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:animate-ping" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
                    {L(lang, "Fase", "Phase")} {s.num}
                  </span>
                </div>

                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-3">
                  {s.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed font-light">
                  {s.desc}
                </p>

                {/* Corner arrow */}
                {i < steps.length - 1 && (
                  <div className="absolute bottom-6 right-6 text-slate-700 group-hover:text-blue-500 transition-colors duration-300 text-lg font-black">
                    →
                  </div>
                )}
                {i === steps.length - 1 && (
                  <div className="absolute bottom-6 right-6 text-slate-700 group-hover:text-emerald-400 transition-colors duration-300">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom CTA strip */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 px-8 py-5 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-sm text-slate-400 font-medium">
              {L(lang, "¿Listo para empezar? La primera llamada es gratis.", "Ready to start? The first call is always free.")}
            </p>
            <Link href="/estimate" data-cursor
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 text-xs font-black uppercase tracking-widest text-white hover:bg-blue-500 hover:scale-105 transition-all shadow-lg shadow-blue-600/20 whitespace-nowrap">
              {L(lang, "Agenda tu llamada →", "Book your call →")}
            </Link>
          </div>
        </div>
      </section>

      {/* ── PLANNER ── */}
      <section ref={plannerRef} className="bg-slate-50 px-6 py-32 border-t border-slate-100">
        <div className="max-w-3xl mx-auto">
          <div className="planner-wrap opacity-0">
            <div className="text-center mb-16">
              <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-black tracking-[0.2em] uppercase mb-6 shadow-sm">
                {L(lang, "Calculadora", "Calculator")}
              </span>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tighter uppercase text-slate-900">
                {L(lang, "Proyecta tu inversión", "Project your investment")}
              </h2>
            </div>
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl">
              <ProjectPlanner />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section ref={ctaRef} className="bg-white px-6 sm:px-10 lg:px-20 py-32">
        <div className="max-w-5xl mx-auto">
          <div className="cta-inner relative rounded-[3rem] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-8 py-24 sm:px-20 text-center overflow-hidden shadow-2xl shadow-blue-900/5 opacity-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.06)_0%,transparent_70%)]" />
            <div className="relative z-10">
              <span className="inline-block py-1.5 px-4 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-[10px] font-black tracking-[0.2em] uppercase mb-8 shadow-sm">
                {L(lang, "Siguiente nivel", "Next level")}
              </span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-slate-900 mb-6 leading-none">
                {L(lang, "¿Preparado?", "Ready?")}
              </h2>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-12">
                {L(lang, "Inicia la transformación digital de tu empresa hoy mismo.", "Start your company's digital transformation today.")}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/estimate" data-cursor
                  className="rounded-full bg-blue-600 px-10 py-4 text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-blue-600/20 hover:bg-blue-700 hover:scale-105 transition-all">
                  {L(lang, "Solicitar cotización →", "Get estimate →")}
                </Link>
                <a href="https://wa.me/19292406734" target="_blank" rel="noopener" data-cursor
                  className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-10 py-4 text-sm font-black uppercase tracking-widest text-blue-700 shadow-sm hover:bg-blue-50 hover:scale-105 transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}