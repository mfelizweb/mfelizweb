"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type Lang = "es" | "en";

const services = [
  {
    key: "mobile", emoji: "📱",
    title: { es: "Apps Móviles", en: "Mobile Apps" },
    desc: { es: "iOS & Android nativas con React Native.", en: "Native iOS & Android with React Native." },
    badge: { es: "Más popular", en: "Most popular" },
    href: "/services/mobile",
    estHref: "/estimate?service=mobile",
    color: "from-blue-500 to-cyan-400",
  },
  {
    key: "web", emoji: "🌐",
    title: { es: "Diseño Web", en: "Web Design" },
    desc: { es: "Plataformas Next.js ultrarrápidas y SEO.", en: "Blazing fast Next.js platforms & SEO." },
    href: "/services/web",
    estHref: "/estimate?service=web",
    color: "from-indigo-500 to-blue-400",
  },
  {
    key: "ai", emoji: "🤖",
    title: { es: "IA & Automatización", en: "AI & Automation" },
    desc: { es: "Agentes autónomos, chatbots y flujos inteligentes.", en: "Autonomous agents, chatbots & intelligent flows." },
    badge: { es: "Nuevo · 2026", en: "New · 2026" },
    href: "/services/ai",
    estHref: "/estimate",
    color: "from-violet-500 to-indigo-400",
  },
  {
    key: "nfc", emoji: "📶",
    title: { es: "Tarjetas NFC", en: "NFC Smart Cards" },
    desc: { es: "Networking inteligente con analíticas.", en: "Smart networking & real-time analytics." },
    href: "/services/nfc",
    estHref: "/estimate?service=nfc",
    color: "from-cyan-500 to-teal-400",
  },
  {
    key: "payments", emoji: "💳",
    title: { es: "Pagos Online", en: "Payments" },
    desc: { es: "Stripe/Square: checkout & suscripciones.", en: "Stripe/Square: checkout & subscriptions." },
    href: "/services/payments",
    estHref: "/estimate?service=payments",
    color: "from-amber-500 to-orange-400",
  },
  {
    key: "maintenance", emoji: "🛠️",
    title: { es: "Mantenimiento", en: "Maintenance" },
    desc: { es: "Monitoreo 24/7, seguridad y soporte mensual.", en: "24/7 monitoring, security & monthly support." },
    href: "/services/maintenance",
    estHref: "/estimate?service=maintenance",
    color: "from-emerald-500 to-teal-400",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const, delay: i * 0.07 },
  }),
};

export default function ServicesPage() {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    if (typeof navigator !== "undefined")
      setLang(navigator.language.toLowerCase().startsWith("es") ? "es" : "en");
  }, []);

  const L = (es: string, en: string) => lang === "es" ? es : en;

  return (
    <main className="relative bg-white min-h-screen overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse,rgba(37,99,235,0.06)_0%,transparent_70%)] pointer-events-none" />

      <section className="relative max-w-7xl mx-auto px-6 py-28">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl mb-20"
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-black tracking-[0.2em] uppercase mb-6 shadow-sm">
            {L("Lo que construimos", "What we build")}
          </span>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-none text-slate-900 mb-6">
            {L("Servicios", "Services")}<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
              {L("& Soluciones.", "& Solutions.")}
            </span>
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed font-light max-w-xl">
            {L(
              "Soluciones modulares — elige exactamente lo que tu negocio necesita.",
              "Modular solutions — pick exactly what your business needs."
            )}
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {services.map((s, i) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
            >
              <Link
                href={s.href}
                className="group relative flex flex-col rounded-3xl border border-slate-200 bg-white p-8 overflow-hidden
                           hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full"
              >
                {/* Top gradient line */}
                <div className={`absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r ${s.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />

                <div className="flex items-start justify-between mb-6">
                  <div className="text-3xl">{s.emoji}</div>
                  {s.badge && (
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[9px] font-black tracking-widest uppercase">
                      {s.badge[lang]}
                    </span>
                  )}
                </div>

                <h2 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                  {s.title[lang]}
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed flex-1">{s.desc[lang]}</p>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    {L("Ver servicio", "See service")}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-colors">
                    <svg className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="relative rounded-[2.5rem] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-8 py-20 sm:px-20 text-center overflow-hidden shadow-xl shadow-blue-900/5"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05)_0%,transparent_70%)]" />
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-slate-900 mb-5">
              {L("¿No sabes por dónde empezar?", "Not sure where to start?")}
            </h2>
            <p className="text-slate-500 mb-10 max-w-lg mx-auto text-lg">
              {L(
                "Usa nuestro planificador de proyectos y te ayudamos a definir el scope ideal.",
                "Use our project planner and we'll help you define the perfect scope."
              )}
            </p>
            <Link
              href="/estimate"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-10 py-4 text-sm font-black uppercase tracking-widest text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:scale-105 transition-all"
            >
              {L("Planificar mi proyecto →", "Plan my project →")}
            </Link>
          </div>
        </motion.div>

      </section>
    </main>
  );
}