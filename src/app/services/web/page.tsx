"use client";
import { useEffect, useState } from "react";
import { GlobeAltIcon } from "@heroicons/react/24/solid";

export default function WebServicePage() {
  const [lang, setLang] = useState<"es" | "en">("en");

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setLang(navigator.language.startsWith("es") ? "es" : "en");
    }
  }, []);

  const texts = {
    es: {
      title: "Diseño y Desarrollo Web",
      subtitle:
        "Creamos sitios modernos, rápidos y optimizados para atraer más clientes y dar confianza a tu negocio.",
      items: [
        "Diseño responsivo: perfecto en móviles, tablets y computadoras",
        "Optimización SEO para aparecer en Google",
        "Blogs, páginas de servicios, paneles de administración y más",
        "Formularios de contacto, pagos en línea y estadísticas de visitas",
        "Sitios fáciles de actualizar y listos para crecer contigo",
      ],
      cta: "Solicita tu sitio web",
    },
    en: {
      title: "Web Design & Development",
      subtitle:
        "We build modern, fast, and optimized websites to attract more clients and build trust in your business.",
      items: [
        "Responsive design: perfect on mobile, tablet, and desktop",
        "SEO optimization to appear on Google",
        "Blogs, service pages, dashboards, admin panels, and more",
        "Contact forms, online payments, and analytics",
        "Easy-to-update websites built to grow with you",
      ],
      cta: "Request Your Website",
    },
  };

  const t = texts[lang];

  return (
    <section
      className="mx-auto max-w-3xl px-6 py-20 text-center"
      aria-label={t.title}
    >
      {/* Icono */}
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10">
        <GlobeAltIcon className="h-8 w-8 text-blue-500" />
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
            <span className="mt-1 h-3 w-3 rounded-full bg-blue-400 shrink-0" />
            {item}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-12">
        <a
          href="/estimate"
          className="inline-block rounded-lg bg-blue-500 px-6 py-3 text-white font-semibold shadow-md hover:bg-blue-400 transition"
        >
          {t.cta}
        </a>
      </div>
    </section>
  );
}
