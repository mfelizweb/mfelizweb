"use client";
import { useEffect, useState } from "react";
import { ShieldCheckIcon } from "@heroicons/react/24/solid";

export default function MaintenanceServicePage() {
  const [lang, setLang] = useState<"es" | "en">("en");

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setLang(navigator.language.startsWith("es") ? "es" : "en");
    }
  }, []);

  const texts = {
    es: {
      title: "Mantenimiento & Soporte",
      subtitle:
        "Nos encargamos de que tu página o aplicación funcione siempre sin problemas, mientras tú te concentras en tu negocio.",
      items: [
        "Tu web siempre segura y funcionando sin interrupciones",
        "Atención rápida cuando algo no funciona",
        "Mejoras constantes para mantener todo actualizado",
        "Tranquilidad de saber que tu proyecto está en buenas manos",
      ],
      cta: "Solicita una consulta",
    },
    en: {
      title: "Maintenance & Support",
      subtitle:
        "We make sure your website or app always runs smoothly, so you can focus on growing your business.",
      items: [
        "Your site always secure and running without interruptions",
        "Quick response when something goes wrong",
        "Ongoing improvements to keep everything up to date",
        "Peace of mind knowing your project is in good hands",
      ],
      cta: "Request a Consultation",
    },
  };

  const t = texts[lang];

  return (
    <section
      className="mx-auto max-w-3xl px-6 py-20 text-center"
      aria-label={t.title}
    >
      {/* Icono */}
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
        <ShieldCheckIcon className="h-8 w-8 text-emerald-500" />
      </div>

      {/* Título + subtítulo */}
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
        {t.title}
      </h1>
      <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        {t.subtitle}
      </p>

      {/* Lista de beneficios */}
      <ul className="mt-10 space-y-4 text-base text-gray-700 dark:text-gray-200 text-left max-w-lg mx-auto">
        {t.items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 bg-white/40 dark:bg-white/5 p-4 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <span className="mt-1 h-3 w-3 rounded-full bg-emerald-400 shrink-0" />
            {item}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-12">
        <a
          href="/estimate"
          className="inline-block rounded-lg bg-emerald-500 px-6 py-3 text-white font-semibold shadow-md hover:bg-emerald-400 transition"
        >
          {t.cta}
        </a>
      </div>
    </section>
  );
}
