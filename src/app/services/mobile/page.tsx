"use client";
import { useEffect, useState } from "react";
import {
  Smartphone,
  Bell,
  ShieldCheck,
  Zap,
  Wrench,
  Palette,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Apple,
} from "lucide-react";

export default function MobileServicePage() {
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
      title: "Aplicaciones Móviles Profesionales",
      subtitle:
        "Lleva tu negocio al bolsillo de tus clientes con apps modernas, rápidas y fáciles de usar para iOS y Android.",
      featuresLabel: "¿Qué incluye?",
      features: [
        {
          icon: Palette,
          title: "Diseño atractivo y UX intuitiva",
          desc: "Interfaces que enamoran y convierten desde la primera pantalla.",
        },
        {
          icon: Smartphone,
          title: "iOS & Android nativos",
          desc: "Publicamos en App Store y Google Play.",
        },
        {
          icon: Bell,
          title: "Notificaciones push",
          desc: "Mantén a tus clientes conectados y enganchados.",
        },
        {
          icon: ShieldCheck,
          title: "Seguridad de nivel empresarial",
          desc: "Auth, encriptación y protección de datos garantizados.",
        },
        {
          icon: Zap,
          title: "Velocidad optimizada",
          desc: "Rendimiento fluido incluso con conexión lenta.",
        },
        {
          icon: Wrench,
          title: "Soporte post-lanzamiento",
          desc: "Actualizaciones y mantenimiento después del go-live.",
        },
      ],
      included: [
        "Publicación en App Store & Google Play",
        "Autenticación de usuarios",
        "Analytics integrado",
        "Actualizaciones OTA",
      ],
      cta: "Solicita tu consulta",
      ctaSub: "Sin compromiso · Respuesta en 24 h",
    },
    en: {
      eyebrow: "Service",
      title: "Professional Mobile Apps",
      subtitle:
        "Put your business in your clients' pockets with modern, fast, and easy-to-use apps for iOS and Android.",
      featuresLabel: "What's included?",
      features: [
        {
          icon: Palette,
          title: "Attractive design & intuitive UX",
          desc: "Interfaces that delight and convert from the first screen.",
        },
        {
          icon: Smartphone,
          title: "Native iOS & Android",
          desc: "Published on the App Store and Google Play.",
        },
        {
          icon: Bell,
          title: "Push notifications",
          desc: "Keep your clients engaged and coming back.",
        },
        {
          icon: ShieldCheck,
          title: "Enterprise-grade security",
          desc: "Auth, encryption, and data protection built-in.",
        },
        {
          icon: Zap,
          title: "Optimized performance",
          desc: "Smooth, responsive even on slow connections.",
        },
        {
          icon: Wrench,
          title: "Post-launch support",
          desc: "Updates and maintenance after go-live.",
        },
      ],
      included: [
        "App Store & Google Play publishing",
        "User authentication",
        "Integrated analytics",
        "Over-the-air updates",
      ],
      cta: "Request a Consultation",
      ctaSub: "No commitment · Response within 24 h",
    },
  };

  const t = texts[lang];

  return (
    <main className="relative min-h-screen bg-white dark:bg-[#0a0a0a] overflow-hidden">

      {/* ── Ambient blobs ── */}
      <div aria-hidden className="pointer-events-none fixed -top-52 -left-52 w-[650px] h-[650px] rounded-full bg-violet-200/25 dark:bg-violet-900/15 blur-[130px]" />
      <div aria-hidden className="pointer-events-none fixed -bottom-52 -right-52 w-[550px] h-[550px] rounded-full bg-indigo-200/20 dark:bg-indigo-900/15 blur-[130px]" />

      <section className="relative mx-auto max-w-4xl px-6 py-24">

        {/* ── Hero ── */}
        <div className={`text-center transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

          {/* Icon */}
          <div className="mx-auto mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-xl shadow-violet-500/25">
            <Smartphone className="w-8 h-8 text-white" />
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-950/50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-4">
            <Sparkles className="w-3 h-3" />
            {t.eyebrow}
          </span>

          <h1 className="mt-3 text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.05]">
            {t.title}
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>

          {/* Platform badges */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 px-4 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Apple className="w-4 h-4" />
              iOS
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 px-4 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
              {/* Android robot SVG inline */}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.523 15.341a.92.92 0 01-.92-.92V9.52a.92.92 0 011.84 0v4.9a.92.92 0 01-.92.921zM6.477 15.341a.92.92 0 01-.92-.92V9.52a.92.92 0 011.84 0v4.9a.92.92 0 01-.92.921zM8.5 17.5v2.58a.92.92 0 001.84 0V17.5h3.32v2.58a.92.92 0 001.84 0V17.5H16a1 1 0 001-1V8H7v8.5a1 1 0 001 1h.5zM14.76 3.67l1.06-1.06a.5.5 0 00-.7-.71l-1.18 1.18A5.9 5.9 0 0012 2.75a5.9 5.9 0 00-1.94.33L8.88 1.9a.5.5 0 00-.71.7l1.06 1.07A5.25 5.25 0 006.75 7.5h10.5a5.25 5.25 0 00-2.49-3.83zM10 5.5a.5.5 0 110-1 .5.5 0 010 1zm4 0a.5.5 0 110-1 .5.5 0 010 1z" />
              </svg>
              Android
            </div>
          </div>
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
                  className={`group flex gap-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 p-5 hover:border-violet-200 dark:hover:border-violet-800 hover:bg-violet-50/50 dark:hover:bg-violet-950/20 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center shadow-sm">
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
        <div className={`mt-8 rounded-2xl border border-violet-100 dark:border-violet-900/40 bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-950/30 dark:to-indigo-950/30 px-6 py-5 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center sm:justify-start">
            {t.included.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-violet-500 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className={`mt-14 flex flex-col items-center gap-3 transition-all duration-700 delay-400 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <a
            href="/estimate"
            className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-violet-500/25 hover:shadow-violet-500/35 hover:-translate-y-0.5 transition-all duration-200"
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