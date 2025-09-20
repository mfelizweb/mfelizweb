// FILE: app/landing/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

// —— Adjustable constants ——
const WHATSAPP_PHONE = "19292406734";
const WHATSAPP_PRETEXT_ES =
  "Hola, vi su landing. Quiero mejorar mi negocio en Yonkers (web/SEO/anuncios).";
const WHATSAPP_PRETEXT_EN =
  "Hi! I saw your landing. I want to grow my business in Yonkers (web/SEO/ads).";

// —— Translations ——
const dict = {
  es: {
    heroH1: "Más clientes para tu negocio en Yonkers",
    heroSub:
      "Sitio web profesional, SEO local y anuncios digitales — todo optimizado para celulares.",
    ctaWhatsApp: "Hablar por WhatsApp",
    ctaPlan: "Recibe un estimado gratis",
    badgeLocal: "Rápido",
    badgeBilingual: "Profesional",
    badgeNoContracts: "Sin contratos largos",
    benefitsTitle: "Lo que hacemos por ti",
    benefits: [
      "Aparece en Google y en Google Maps",
      "Web rápida y optimizada para móvil",
      "Anuncios simples que traen clientes",
      "Mantenimiento y soporte local",
      "Precios claros y accesibles",
    ],
    problemsTitle: "¿Te pasa esto con tu negocio?",
    problems: [
      "Tu web es lenta y pierdes clientes",
      "Problemas integrando pagos online",
      "No apareces en Google Maps",
      "Tus redes sociales no convierten",
    ],
    pricingTitle: "Paquetes simples",
    pricingNote: "Ejemplos — ajustamos a tu negocio",
    plans: [
      {
        name: "Básico Local",
        price: "$400 pago único",
        bullets: ["Sitio web sencillo", "Perfil en Google Maps", "Formulario o WhatsApp"],
      },
      {
        name: "SEO Pro",
        price: "$600 pago único",
        bullets: ["Web completa (hasta 6 secciones)", "Optimización SEO local", "Analítica básica"],
        popular: true,
      },
      {
        name: "Impulso Ads",
        price: "$800 pago único",
        bullets: [
          "Web + SEO local",
          "Analítica avanzada",
          "Campaña inicial de anuncios (el presupuesto lo paga el cliente)",
        ],
      },
    ],
  },
  en: {
    heroH1: "Get more customers in Yonkers",
    heroSub:
      "Professional website, local SEO, and digital ads — all optimized for mobile.",
    ctaWhatsApp: "Chat on WhatsApp",
    ctaPlan: "Get a free estimate",
    badgeLocal: "Fast",
    badgeBilingual: "Professional",
    badgeNoContracts: "No long contracts",
    benefitsTitle: "What we do for you",
    benefits: [
      "Show up on Google & Maps",
      "Fast, mobile-optimized website",
      "Simple ads that bring customers",
      "Local maintenance & support",
      "Clear, affordable pricing",
    ],
    problemsTitle: "Do you face these issues?",
    problems: [
      "Your website is slow and losing customers",
      "Issues integrating online payments",
      "You don’t show up on Google Maps",
      "Your social media isn’t bringing customers",
    ],
    pricingTitle: "Simple packages",
    pricingNote: "Examples — we tailor to your needs",
    plans: [
      {
        name: "Local Basic",
        price: "$400 one-time",
        bullets: ["Simple website", "Google Maps profile", "Form or WhatsApp"],
      },
      {
        name: "SEO Pro",
        price: "$600 one-time",
        bullets: ["Full website (up to 6 sections)", "Local SEO optimization", "Basic analytics"],
        popular: true,
      },
      {
        name: "Boost Ads",
        price: "$800 one-time",
        bullets: [
          "Website + Local SEO",
          "Advanced analytics",
          "Initial ads campaign (ad spend paid by client)",
        ],
      },
    ],
  },
};

 
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-300/70 bg-white/70 px-3 py-1 text-sm text-slate-700 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200">
      {children}
    </span>
  );
}

export default function LandingPage() {
  const [lang, setLang] = useState<"es" | "en">("es");
  const t = useMemo(() => dict[lang], [lang]);
const [showForm, setShowForm] = useState(false);
const [form, setForm] = useState({ name: "", email: "", phone: "", service: "" });
 
 


  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  const res = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...form,
      lang,
      services: [form.service],
    }),
  });
  const json = await res.json();
  if (json.ok) {
    alert(lang === "es" ? "¡Gracias! Te contactaremos pronto." : "Thanks! We'll contact you soon.");
    setShowForm(false);
    setForm({ name: "", email: "", phone: "", service: "" });
  } else {
    alert("Error: " + json.error);
  }
}

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const isEs = navigator.language.toLowerCase().startsWith("es");
      setLang(isEs ? "es" : "en");
    }
  }, []);

  const waHref = useMemo(() => {
    const msg = encodeURIComponent(lang === "es" ? WHATSAPP_PRETEXT_ES : WHATSAPP_PRETEXT_EN);
    return `https://wa.me/${WHATSAPP_PHONE}?text=${msg}`;
  }, [lang]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-[#0b0f14] dark:to-[#0b0f14] text-slate-900 dark:text-slate-100">
      {/* Language toggle */}
      <header className="flex justify-end px-4 py-3">
        <div className="inline-flex overflow-hidden rounded-lg border border-slate-300 dark:border-slate-700">
          <button
            onClick={() => setLang("es")}
            className={`px-3 py-1 text-sm ${
              lang === "es"
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-100"
            }`}
          >
            ES
          </button>
          <button
            onClick={() => setLang("en")}
            className={`px-3 py-1 text-sm ${
              lang === "en"
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-100"
            }`}
          >
            EN
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative text-center px-4 py-20">
        <motion.h1
          className="text-4xl font-bold md:text-6xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {t.heroH1}
        </motion.h1>
        <motion.p
          className="mt-4 text-lg md:text-xl text-slate-600 dark:text-slate-300"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {t.heroSub}
        </motion.p>
        <div className="mt-6 flex justify-center gap-3">
          <Badge>{t.badgeLocal}</Badge>
          <Badge>{t.badgeBilingual}</Badge>
          <Badge>{t.badgeNoContracts}</Badge>
        </div>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a href={waHref} target="_blank" className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700">
            {t.ctaWhatsApp}
          </a>
     <button
  onClick={() => setShowForm(true)}
  className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
>
  {t.ctaPlan}
</button>

        </div>
      </section>

      {/* Problemas comunes */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-2xl font-bold md:text-3xl mb-8">{t.problemsTitle}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {t.problems.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"
            >
              <p className="text-lg font-medium text-slate-700 dark:text-slate-200">{p}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Beneficios */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-2xl font-bold md:text-3xl">{t.benefitsTitle}</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {t.benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"
            >
              <p className="text-slate-700 dark:text-slate-300">{b}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold md:text-3xl">{t.pricingTitle}</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">{t.pricingNote}</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {t.plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl border p-6 shadow hover:shadow-xl transition dark:border-slate-700 dark:bg-slate-900 bg-white ${plan.popular ? "border-blue-600 ring-2 ring-blue-600" : ""}`}
            >
              {plan.popular && (
                <span className="absolute -top-3 right-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                  {lang === "es" ? "Popular" : "Popular"}
                </span>
              )}
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <span className="text-sm text-slate-600 dark:text-slate-300">{plan.price}</span>
              </div>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700 dark:text-slate-300">
                {plan.bullets.map((x, j) => (
                  <li key={j}>{x}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>
      {showForm && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-md shadow-xl relative">
      <button
        onClick={() => setShowForm(false)}
        className="absolute top-2 right-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
      >
        ✕
      </button>
      <h2 className="text-xl font-bold mb-4">
        {lang === "es" ? "Recibe un estimado gratis" : "Get a free estimate"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder={lang === "es" ? "Tu nombre" : "Your name"}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border rounded-lg px-3 py-2"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border rounded-lg px-3 py-2"
          required
        />
        <input
          type="tel"
          placeholder={lang === "es" ? "Teléfono" : "Phone"}
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full border rounded-lg px-3 py-2"
        />

        <select
          value={form.service}
          onChange={(e) => setForm({ ...form, service: e.target.value })}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">{lang === "es" ? "Selecciona un servicio" : "Select a service"}</option>
          <option value="slow-website">{lang === "es" ? "Mi web es lenta" : "My website is slow"}</option>
          <option value="payment">{lang === "es" ? "Problemas con pagos" : "Payment integration issues"}</option>
          <option value="maps">{lang === "es" ? "No aparezco en Google Maps" : "Not showing on Google Maps"}</option>
          <option value="redesign">{lang === "es" ? "Rediseñar mi web" : "Redesign my site"}</option>
          <option value="plan-basic">{lang === "es" ? "Plan Básico Local" : "Local Basic Plan"}</option>
          <option value="plan-seo">{lang === "es" ? "Plan SEO Pro" : "SEO Pro Plan"}</option>
          <option value="plan-ads">{lang === "es" ? "Plan Impulso Ads" : "Boost Ads Plan"}</option>
        </select>

        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          {lang === "es" ? "Enviar" : "Send"}
        </button>
      </form>
    </div>
  </div>
)}

    </main>
    
  );
}
