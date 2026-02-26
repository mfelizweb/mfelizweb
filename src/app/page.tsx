"use client";

import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import ServiceCard from "@/components/ServiceCard";
import ProjectPlanner from "@/components/ProjectPlanner";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

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

const services = {
  es: {
    label: "Qué hacemos",
    title: "Todo lo que necesitas",
    titleAccent: "para crecer.",
    sub: "Web, Móvil, NFC, Pagos, IA, SEO, Rediseño y soporte continuo.",
    cta: "Ver todos los servicios",
  },
  en: {
    label: "What we do",
    title: "Everything you need",
    titleAccent: "to grow.",
    sub: "Web, Mobile, NFC, Payments, AI, SEO, Redesign & ongoing support.",
    cta: "View all services",
  },
};

const process = {
  es: {
    label: "Cómo trabajamos",
    title: "De la idea al lanzamiento",
    titleAccent: "en 4 pasos.",
    steps: [
      { num: "01", title: "Llamada inicial", desc: "30 minutos gratis para entender tu proyecto, audiencia y presupuesto." },
      { num: "02", title: "Propuesta y diseño", desc: "Te enviamos una propuesta clara con wireframes. Sin sorpresas." },
      { num: "03", title: "Build y revisiones", desc: "Sprints ágiles con actualizaciones semanales. Tú siempre en el loop." },
      { num: "04", title: "Lanzamiento y soporte", desc: "Deploy, capacitación y soporte continuo incluido." },
    ],
  },
  en: {
    label: "How we work",
    title: "From idea to launch",
    titleAccent: "in 4 steps.",
    steps: [
      { num: "01", title: "Discovery call", desc: "Free 30-min call to understand your goals, audience, and budget." },
      { num: "02", title: "Proposal & design", desc: "We send a clear proposal with wireframes. No surprises." },
      { num: "03", title: "Build & review", desc: "Agile sprints with weekly updates. You stay in the loop." },
      { num: "04", title: "Launch & support", desc: "We deploy, train your team, and stay on for ongoing support." },
    ],
  },
};

const cta = {
  es: {
    title: "¿Listo para atraer más clientes?",
    sub: "Hablemos hoy. Cotización gratis y sin compromiso.",
    btn1: "Pide tu cotización gratis",
    btn2: "Escríbenos en WhatsApp",
  },
  en: {
    title: "Ready to attract more customers?",
    sub: "Let's talk today. Free estimate, no commitment.",
    btn1: "Get your free estimate",
    btn2: "Message us on WhatsApp",
  },
};

export default function HomePage() {
  const [lang, setLang] = useState<"es" | "en">("en");

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setLang(navigator.language.startsWith("es") ? "es" : "en");
    }
  }, []);

  const aboutReveal = useScrollReveal();
  const marqueeReveal = useScrollReveal();
  const servicesReveal = useScrollReveal();
  const processReveal = useScrollReveal();
  const plannerReveal = useScrollReveal();
  const ctaReveal = useScrollReveal();

  const s = services[lang];
  const p = process[lang];
  const c = cta[lang];

  return (
    <>
      {/* ── HERO ── */}
      <Hero />

      {/* ── MARQUEE ── */}
      <div
        ref={marqueeReveal.ref}
        className={`border-y border-slate-100 bg-slate-50 py-4 overflow-hidden
                    ${marqueeReveal.visible ? "reveal-visible" : "reveal"}`}
      >
        <div className="marquee-track gap-10">
          {[
            "React Native", "Next.js", "Stripe Payments", "NFC Technology",
            "AI Integration", "Local SEO", "iOS & Android", "TypeScript",
            "React Native", "Next.js", "Stripe Payments", "NFC Technology",
            "AI Integration", "Local SEO", "iOS & Android", "TypeScript",
          ].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-2.5 text-xs font-semibold tracking-widest uppercase text-slate-400 flex-shrink-0 px-5"
            >
              <span className="h-1 w-1 rounded-full bg-indigo-400" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <div
        ref={aboutReveal.ref}
        className={aboutReveal.visible ? "reveal-visible" : "reveal"}
      >
        <AboutUs />
      </div>

      {/* ── SERVICES ── */}
      <section
        ref={servicesReveal.ref}
        className={`bg-slate-50 border-y border-slate-100 px-6 sm:px-10 lg:px-20 py-28
                    ${servicesReveal.visible ? "reveal-visible" : "reveal"}`}
      >
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
            <div>
              <span className="section-label">{s.label}</span>
              <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
                {s.title}{" "}
                <span className="gradient-text">{s.titleAccent}</span>
              </h2>
              <p className="mt-3 text-slate-500 text-base max-w-lg">{s.sub}</p>
            </div>
            <Link
              href="/services"
              className="btn-outline self-start sm:self-auto whitespace-nowrap text-sm"
            >
              {s.cta} →
            </Link>
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 reveal-stagger">
            <ServiceCard
              title={{ es: "Diseño y Desarrollo Web", en: "Web Design & Dev" }}
              description={{ es: "Páginas modernas, rápidas y optimizadas para Google.", en: "Fast, SEO-optimized sites built with Next.js." }}
              href="/services/web"
              icon={<CodeBracketIcon className="w-5 h-5 text-indigo-500" />}
            />
            <ServiceCard
              title={{ es: "Aplicaciones Móviles", en: "Mobile Apps" }}
              description={{ es: "Apps para iOS y Android con React Native y Expo.", en: "iOS & Android apps using React Native & Expo." }}
              href="/services/mobile"
              icon={<DevicePhoneMobileIcon className="w-5 h-5 text-emerald-500" />}
            />
            <ServiceCard
              title={{ es: "Tarjetas NFC", en: "NFC Smart Cards" }}
              description={{ es: "Tarjetas NFC + micrositio con QR y analíticas.", en: "NFC cards + microsite with QR & real-time analytics." }}
              href="/services/nfc"
              icon={<SignalIcon className="w-5 h-5 text-cyan-500" />}
            />
            <ServiceCard
              title={{ es: "Integración de Pagos", en: "E-Payments" }}
              description={{ es: "Stripe / Square: checkout, suscripciones y más.", en: "Stripe / Square: checkout, subscriptions & links." }}
              href="/services/payments"
              icon={<CreditCardIcon className="w-5 h-5 text-pink-500" />}
            />
            <ServiceCard
              title={{ es: "SEO y Google Maps", en: "SEO & Google Maps" }}
              description={{ es: "Haz que te encuentren fácil en tu zona.", en: "Get found in your area with local SEO." }}
              href="/services/seo"
              icon={<MapPinIcon className="w-5 h-5 text-green-500" />}
            />
            <ServiceCard
              title={{ es: "Rediseño y Modernización", en: "Redesign & Modernization" }}
              description={{ es: "Convierte tu web antigua en una experiencia moderna.", en: "Turn outdated sites into modern experiences." }}
              href="/services/redesign"
              icon={<ArrowPathIcon className="w-5 h-5 text-blue-500" />}
            />
            <ServiceCard
              title={{ es: "Mantenimiento & Soporte", en: "Maintenance & Support" }}
              description={{ es: "Planes mensuales con actualizaciones y seguridad.", en: "Monthly plans with updates and security." }}
              href="/services/maintenance"
              icon={<LifebuoyIcon className="w-5 h-5 text-yellow-500" />}
            />
            <ServiceCard
              title={{ es: "Asistentes de IA & Chatbots", en: "AI Assistants & Chatbots" }}
              description={{ es: "Chatbots para ventas y soporte 24/7.", en: "Custom chatbots for sales and support 24/7." }}
              href="/services/ai"
              icon={<CpuChipIcon className="w-5 h-5 text-purple-500" />}
            />
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section
        ref={processReveal.ref}
        className={`bg-white px-6 sm:px-10 lg:px-20 py-28
                    ${processReveal.visible ? "reveal-visible" : "reveal"}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="section-label">{p.label}</span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
              {p.title}{" "}
              <span className="gradient-text">{p.titleAccent}</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-100 rounded-2xl overflow-hidden border border-slate-100">
            {p.steps.map((step, i) => (
              <div key={i} className="bg-white px-8 py-10 group hover:bg-slate-50 transition">
                <div className="text-3xl font-extrabold text-indigo-100 group-hover:text-indigo-200 transition mb-5 font-[Syne]">
                  {step.num}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECT PLANNER ── */}
      <div
        ref={plannerReveal.ref}
        className={`bg-slate-50 border-y border-slate-100 px-6 py-20
                    ${plannerReveal.visible ? "reveal-visible" : "reveal"}`}
      >
        <div className="max-w-3xl mx-auto">
          <ProjectPlanner />
        </div>
      </div>

      {/* ── FINAL CTA ── */}
      <section
        ref={ctaReveal.ref}
        className={`bg-white px-6 sm:px-10 lg:px-20 py-28
                    ${ctaReveal.visible ? "reveal-visible" : "reveal"}`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-violet-50 px-10 py-20 text-center overflow-hidden">

            {/* Orb */}
            <div
              aria-hidden
              className="pointer-events-none absolute top-[-80px] left-1/2 -translate-x-1/2
                         w-[400px] h-[400px] rounded-full
                         bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.10)_0%,transparent_70%)]"
            />

            <h2 className="relative text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
              {c.title}
            </h2>

            <p className="relative mt-4 text-lg text-slate-500 max-w-md mx-auto">
              {c.sub}
            </p>

            <div className="relative mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/estimate"
                className="btn-primary"
              >
                {c.btn1}
              </Link>

              <a
                href="https://wa.me/19292406734"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50
                           px-7 py-3 text-sm font-semibold text-emerald-700
                           hover:bg-emerald-100 transition-colors duration-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {c.btn2}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}