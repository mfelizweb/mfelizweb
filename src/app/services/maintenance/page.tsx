"use client";
import { useEffect, useState } from "react";
import { ShieldCheckIcon, CheckCircleIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export default function MaintenanceServicePage() {
  const [lang, setLang] = useState<"es" | "en">("en");

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setLang(navigator.language.startsWith("es") ? "es" : "en");
    }
  }, []);

  const texts = {
    es: {
      tag: "Soporte Premium",
      title: "Mantenimiento & Soporte",
      subtitle: "Delegue la complejidad técnica. Nos aseguramos de que su infraestructura digital sea resiliente, rápida y esté siempre actualizada.",
      items: [
        { title: "Seguridad Proactiva", desc: "Monitoreo 24/7 y parches de seguridad inmediatos." },
        { title: "Soporte Prioritario", desc: "Resolución crítica de incidentes en tiempo récord." },
        { title: "Evolución Continua", desc: "Actualizaciones de dependencias y optimización de performance." },
        { title: "Respaldo Total", desc: "Backups automatizados y recuperación ante desastres." },
      ],
      cta: "Empezar ahora",
    },
    en: {
      tag: "Premium Support",
      title: "Maintenance & Support",
      subtitle: "Offload the technical complexity. We ensure your digital infrastructure is resilient, fast, and always up to date.",
      items: [
        { title: "Proactive Security", desc: "24/7 monitoring and immediate security patching." },
        { title: "Priority Support", desc: "Critical incident resolution in record time." },
        { title: "Continuous Evolution", desc: "Dependency updates and performance optimization." },
        { title: "Full Backup", desc: "Automated backups and disaster recovery." },
      ],
      cta: "Get Started",
    },
  };

  const t = texts[lang];

  return (
    <section className="relative mx-auto max-w-5xl px-6 py-24 sm:py-32" aria-label={t.title}>
      {/* Header con Badge Moderno */}
      <div className="flex flex-col items-center text-center mb-16">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold uppercase tracking-widest mb-6 border border-emerald-500/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          {t.tag}
        </span>

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-gray-900 dark:text-white mb-6">
          {t.title.split('&')[0]} <span className="text-emerald-500">&</span> {t.title.split('&')[1]}
        </h1>

        <p className="max-w-2xl text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Grid de Beneficios - Estilo Modern Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {t.items.map((item, i) => (
          <div
            key={i}
            className="group relative p-8 rounded-3xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/[0.02] backdrop-blur-sm hover:border-emerald-500/50 transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform">
                <CheckCircleIcon className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white leading-none">
                {item.title}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed ml-12">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* CTA Sección */}
      <div className="mt-16 text-center">
        <a
          href="/estimate"
          className="group inline-flex items-center gap-2 rounded-full bg-gray-900 dark:bg-white px-8 py-4 text-white dark:text-gray-900 font-bold shadow-xl hover:scale-105 transition-all active:scale-95"
        >
          {t.cta}
          <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </a>

        <p className="mt-6 text-sm text-gray-500 dark:text-gray-500 flex items-center justify-center gap-2">
          <ShieldCheckIcon className="h-4 w-4" />
          Infraestructura certificada y segura
        </p>
      </div>
    </section>
  );
}