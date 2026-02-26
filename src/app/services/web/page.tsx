"use client";
import { useEffect, useState } from "react";
import {
  Globe,
  Smartphone,
  SearchCheck,
  LayoutDashboard,
  CreditCard,
  TrendingUp,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function WebServicePage() {
  const [lang, setLang] = useState<"es" | "en">("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setLang(navigator.language.startsWith("es") ? "es" : "en");
    }
    setMounted(true);
  }, []);

  const texts = {
    es: {
      eyebrow: "Servicio",
      title: "Diseño y Desarrollo Web",
      subtitle:
        "Creamos sitios modernos, rápidos y optimizados para atraer más clientes y dar confianza a tu negocio.",
      featuresLabel: "¿Qué incluye?",
      features: [
        {
          icon: Smartphone,
          title: "Responsivo en todo dispositivo",
          desc: "Perfecto en móviles, tablets y computadoras.",
        },
        {
          icon: SearchCheck,
          title: "SEO optimizado",
          desc: "Posicionamiento en Google desde el día uno.",
        },
        {
          icon: LayoutDashboard,
          title: "Blogs, servicios y paneles admin",
          desc: "Todo lo que necesitas para gestionar tu contenido.",
        },
        {
          icon: CreditCard,
          title: "Pagos en línea y formularios",
          desc: "Cobra y comunícate desde tu propio sitio.",
        },
        {
          icon: TrendingUp,
          title: "Listo para crecer contigo",
          desc: "Fácil de actualizar y escalar a largo plazo.",
        },
      ],
      included: [
        "Dominio y hosting configurados",
        "SSL / HTTPS incluido",
        "Optimización de velocidad",
        "Soporte técnico post-lanzamiento",
      ],
      cta: "Solicita tu sitio web",
      ctaSub: "Sin compromiso · Respuesta en 24 h",
    },
    en: {
      eyebrow: "Service",
      title: "Web Design & Development",
      subtitle:
        "We build modern, fast, and optimized websites to attract more clients and build trust in your business.",
      featuresLabel: "What's included?",
      features: [
        {
          icon: Smartphone,
          title: "Responsive on every device",
          desc: "Perfect on mobile, tablet, and desktop.",
        },
        {
          icon: SearchCheck,
          title: "SEO optimization",
          desc: "Rank on Google from day one.",
        },
        {
          icon: LayoutDashboard,
          title: "Blogs, service pages & dashboards",
          desc: "Everything you need to manage your content.",
        },
        {
          icon: CreditCard,
          title: "Payments & contact forms",
          desc: "Accept payments and inquiries directly from your site.",
        },
        {
          icon: TrendingUp,
          title: "Built to grow with you",
          desc: "Easy to update and scale long-term.",
        },
      ],
      included: [
        "Domain & hosting setup",
        "SSL / HTTPS included",
        "Performance optimization",
        "Post-launch technical support",
      ],
      cta: "Request Your Website",
      ctaSub: "No commitment · Response within 24 h",
    },
  };

  const t = texts[lang];

  return (
    <main className="relative min-h-screen bg-white dark:bg-[#0a0a0a] overflow-hidden">

      {/* ── Ambient blobs ── */}
      <div aria-hidden className="pointer-events-none fixed -top-52 -left-52 w-[650px] h-[650px] rounded-full bg-blue-200/25 dark:bg-blue-900/15 blur-[130px]" />
      <div aria-hidden className="pointer-events-none fixed -bottom-52 -right-52 w-[550px] h-[550px] rounded-full bg-indigo-200/20 dark:bg-indigo-900/15 blur-[130px]" />

      <section className="relative mx-auto max-w-4xl px-6 py-24">

        {/* ── Hero ── */}
        <div className={`text-center transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

          {/* Icon pill */}
          <div className="mx-auto mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-xl shadow-blue-500/25">
            <Globe className="w-8 h-8 text-white" />
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-4">
            <Sparkles className="w-3 h-3" />
            {t.eyebrow}
          </span>

          <h1 className="mt-3 text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.05]">
            {t.title}
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* ── Features grid ── */}
        <div className={`mt-16 transition-all duration-700 delay-150 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-600 mb-6 text-center">
            {t.featuresLabel}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  style={{ transitionDelay: `${150 + i * 60}ms` }}
                  className={`group flex gap-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-5 hover:border-blue-200 dark:hover:border-blue-800 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-sm">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{f.title}</h3>
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── "Also included" strip ── */}
        <div className={`mt-8 rounded-2xl border border-blue-100 dark:border-blue-900/40 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 px-6 py-5 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center sm:justify-start">
            {t.included.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className={`mt-14 flex flex-col items-center gap-3 transition-all duration-700 delay-400 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <a
            href="/estimate"
            className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-blue-500/25 hover:shadow-blue-500/35 hover:-translate-y-0.5 transition-all duration-200"
          >
            {t.cta}
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
          <p className="text-xs text-gray-400 dark:text-gray-600">{t.ctaSub}</p>
        </div>

      </section>
    </main>
  );
}