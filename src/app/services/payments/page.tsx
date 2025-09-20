"use client";
import { useEffect, useState } from "react";
import { CreditCardIcon } from "@heroicons/react/24/solid";

export default function PaymentsServicePage() {
  const [lang, setLang] = useState<"es" | "en">("en");

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setLang(navigator.language.startsWith("es") ? "es" : "en");
    }
  }, []);

  const texts = {
    es: {
      title: "Integración de Pagos en Línea",
      subtitle:
        "Recibe pagos de tus clientes de manera rápida, segura y profesional, con opciones de cobro únicas o suscripciones.",
      items: [
        "Enlaces de pago fáciles de compartir y checkout integrado",
        "Planes de suscripción y facturación automática",
        "Protección y seguridad de última generación para tu negocio",
        "Confianza para tus clientes con procesos de pago modernos",
      ],
      cta: "Solicita una consulta",
    },
    en: {
      title: "E-Payments Integration",
      subtitle:
        "Get paid quickly, securely, and professionally with one-time or recurring payments tailored to your business.",
      items: [
        "Easy payment links and embedded checkout",
        "Subscription plans and automated invoicing",
        "Latest security protections for your business",
        "Build client trust with modern payment flows",
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
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500/10">
        <CreditCardIcon className="h-8 w-8 text-yellow-500" />
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
            <span className="mt-1 h-3 w-3 rounded-full bg-yellow-400 shrink-0" />
            {item}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-12">
        <a
          href="/estimate"
          className="inline-block rounded-lg bg-yellow-500 px-6 py-3 text-white font-semibold shadow-md hover:bg-yellow-400 transition"
        >
          {t.cta}
        </a>
      </div>
    </section>
  );
}
