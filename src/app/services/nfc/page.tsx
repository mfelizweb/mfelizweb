"use client";
import { useEffect, useState } from "react";
import { CreditCardIcon } from "@heroicons/react/24/solid";

export default function NFCServicePage() {
  const [lang, setLang] = useState<"es" | "en">("en");

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setLang(navigator.language.startsWith("es") ? "es" : "en");
    }
  }, []);

  const texts = {
    es: {
      title: "Tarjetas de Contacto Inteligentes NFC",
      subtitle:
        "Impresiona y conecta al instante: una sola tarjeta NFC que comparte toda tu información de manera moderna y profesional.",
      items: [
        "Perfil digital editable con tu marca y datos actualizados",
        "Botones directos: WhatsApp, llamada, agregar a contactos, pagos y más",
        "Estadísticas de uso: quién escaneó y cuántas veces",
        "Una sola tarjeta para siempre — sin necesidad de reimprimir",
      ],
      cta: "Solicita tu tarjeta inteligente",
    },
    en: {
      title: "NFC Smart Contact Cards",
      subtitle:
        "Impress and connect instantly: one NFC card that shares all your information in a modern, professional way.",
      items: [
        "Editable digital profile with your brand and updated info",
        "One-click actions: WhatsApp, call, add to contacts, payments and more",
        "Usage analytics: who scanned and how many times",
        "One card for life — no need to reprint",
      ],
      cta: "Request Your Smart Card",
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
        <CreditCardIcon className="h-8 w-8 text-emerald-500" />
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
