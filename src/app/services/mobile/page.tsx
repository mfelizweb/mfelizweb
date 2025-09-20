"use client";
import { useEffect, useState } from "react";
import { DevicePhoneMobileIcon } from "@heroicons/react/24/solid";

export default function MobileServicePage() {
  const [lang, setLang] = useState<"es" | "en">("en");

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setLang(navigator.language.startsWith("es") ? "es" : "en");
    }
  }, []);

  const texts = {
    es: {
      title: "Aplicaciones Móviles Profesionales",
      subtitle:
        "Lleva tu negocio al bolsillo de tus clientes con apps modernas, rápidas y fáciles de usar para iOS y Android.",
      items: [
        "Diseño atractivo y experiencia fácil de usar",
        "Disponible en iPhone y Android",
        "Notificaciones para mantener a tus clientes conectados",
        "Seguridad y velocidad garantizadas",
        "Soporte y actualizaciones después del lanzamiento",
      ],
      cta: "Solicita tu consulta",
    },
    en: {
      title: "Professional Mobile Apps",
      subtitle:
        "Put your business in your clients’ pockets with modern, fast, and easy-to-use apps for iOS and Android.",
      items: [
        "Attractive design and user-friendly experience",
        "Available on both iPhone and Android",
        "Push notifications to keep your clients engaged",
        "Guaranteed speed and security",
        "Support and updates after launch",
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
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500/10">
        <DevicePhoneMobileIcon className="h-8 w-8 text-indigo-500" />
      </div>

      {/* Título y subtítulo */}
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
            <span className="mt-1 h-3 w-3 rounded-full bg-indigo-400 shrink-0" />
            {item}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-12">
        <a
          href="/estimate"
          className="inline-block rounded-lg bg-indigo-500 px-6 py-3 text-white font-semibold shadow-md hover:bg-indigo-400 transition"
        >
          {t.cta}
        </a>
      </div>
    </section>
  );
}
