"use client";
import { useEffect, useMemo, useState } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";

type Lang = "es" | "en";
type Service = "web" | "mobile" | "nfc" | "payments" | "maintenance";
type Priority = "clients" | "brand" | "automate" | "optimize";
type Urgency = "now" | "soon" | "later";

type PlannerData = {
  services: Service[];
  priorities: Priority[];
  features: string[];      // features seleccionadas (según servicios)
  urgency: Urgency;
  notes: string;
  name: string;
  email: string;
  phone: string;
};

const FEATURE_LIBRARY: Record<Service, string[]> = {
  web: ["SEO", "Blog", "Portfolio", "Contact form", "Landing page", "Analytics", "CMS"],
  mobile: ["Push notifications", "Bookings", "Maps", "In-app payments", "Chat", "Offline mode"],
  nfc: ["Digital profile", "QR link", "Analytics", "One-tap WhatsApp", "Payments link"],
  payments: ["Payment links", "Subscriptions", "Invoices", "Checkout embed"],
  maintenance: ["Updates", "Backups", "Monitoring", "Security hardening", "Performance tune"],
};

export default function ProjectPlannerWizard() {
  const [lang, setLang] = useState<Lang>("en");
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setLang(navigator.language.startsWith("es") ? "es" : "en");
    }
  }, []);

  const t = useMemo(() => ({
    es: {
      title: "Planificador de Proyecto",
      subtitle: "Arma tu proyecto paso a paso y recibe un roadmap + cotización.",
      steps: ["Servicios", "Objetivos", "Características", "Tiempo", "Contacto", "Revisión"],
      servicesLabel: "¿Qué necesitas?",
      serviceList: {
        web: "Sitio Web",
        mobile: "App Móvil",
        nfc: "Tarjeta NFC Inteligente",
        payments: "Pagos en Línea",
        maintenance: "Mantenimiento & Soporte",
      },
      prioritiesLabel: "¿Qué te importa más?",
      priorities: {
        clients: "Más clientes",
        brand: "Mejorar imagen",
        automate: "Automatizar procesos",
        optimize: "Optimizar rendimiento",
      },
      featuresLabel: "Elige características (opcional)",
      urgencyLabel: "¿Para cuándo lo necesitas?",
      urgency: {
        now: "Lo antes posible",
        soon: "Próximas semanas",
        later: "Sin prisa",
      },
      notesLabel: "Notas adicionales (opcional)",
      contactTitle: "Datos de contacto",
      name: "Nombre",
      email: "Email",
      phone: "Teléfono",
      next: "Siguiente",
      back: "Atrás",
      review: "Revisar y enviar",
      send: "Enviar solicitud",
      success: "¡Recibido! Te contactaremos muy pronto.",
      required: "Este campo es obligatorio",
      roadmapTitle: "Roadmap propuesto",
      roadmapIntro: "Con base en tus elecciones, este es un primer borrador:",
    },
    en: {
      title: "Project Planner",
      subtitle: "Build your project step by step and get a roadmap + quote.",
      steps: ["Services", "Goals", "Features", "Timeline", "Contact", "Review"],
      servicesLabel: "What do you need?",
      serviceList: {
        web: "Website",
        mobile: "Mobile App",
        nfc: "NFC Smart Card",
        payments: "E-Payments",
        maintenance: "Maintenance & Support",
      },
      prioritiesLabel: "What matters most?",
      priorities: {
        clients: "More clients",
        brand: "Improve brand",
        automate: "Automate processes",
        optimize: "Optimize performance",
      },
      featuresLabel: "Pick features (optional)",
      urgencyLabel: "When do you need it?",
      urgency: {
        now: "As soon as possible",
        soon: "In the coming weeks",
        later: "No rush",
      },
      notesLabel: "Additional notes (optional)",
      contactTitle: "Contact details",
      name: "Name",
      email: "Email",
      phone: "Phone",
      next: "Next",
      back: "Back",
      review: "Review & send",
      send: "Send request",
      success: "Got it! We’ll get back to you shortly.",
      required: "This field is required",
      roadmapTitle: "Proposed roadmap",
      roadmapIntro: "Based on your choices, here’s a first draft:",
    },
  } as const)[lang], [lang]);

  const [data, setData] = useState<PlannerData>({
    services: [],
    priorities: [],
    features: [],
    urgency: "soon",
    notes: "",
    name: "",
    email: "",
    phone: "",
  });

  function toggle<T>(list: T[], value: T) {
    return list.includes(value) ? list.filter(v => v !== value) : [...list, value];
  }

  function toggleService(s: Service) {
    setData(d => {
      const updatedServices = toggle(d.services, s);
      // limpiar features de servicios desmarcados
      const allowed = new Set(updatedServices.flatMap(sv => FEATURE_LIBRARY[sv]));
      const filteredFeatures = d.features.filter(f => allowed.has(f));
      return { ...d, services: updatedServices, features: filteredFeatures };
    });
  }

  function togglePriority(p: Priority) {
    setData(d => ({ ...d, priorities: toggle(d.priorities, p) }));
  }

  function toggleFeature(f: string) {
    setData(d => ({ ...d, features: toggle(d.features, f) }));
  }

  // Genera roadmap corto y claro (bilingüe, persuasivo)
  const roadmap = useMemo(() => {
    if (data.services.length === 0) return "";
    const sNames = data.services.map(s => t.serviceList[s]).join(", ");
    const goals = data.priorities.map(p => t.priorities[p]).join(", ");
    const feats = data.features.join(", ") || (lang === "es" ? "Selección en definición" : "Selection in progress");

    if (lang === "es") {
      return [
        `• Alcance: ${sNames}`,
        goals && `• Objetivos: ${goals}`,
        `• Características clave: ${feats}`,
        `• Tiempo: ${t.urgency[data.urgency]}`,
        data.notes && `• Notas: ${data.notes}`,
        "• Siguiente paso: validamos requerimientos y te enviamos una propuesta formal.",
      ].filter(Boolean).join("\n");
    }
    return [
      `• Scope: ${sNames}`,
      goals && `• Goals: ${goals}`,
      `• Key features: ${feats}`,
      `• Timeline: ${t.urgency[data.urgency]}`,
      data.notes && `• Notes: ${data.notes}`,
      "• Next step: we’ll validate requirements and send a formal proposal.",
    ].filter(Boolean).join("\n");
  }, [data, lang, t]);

  async function onSubmit() {
  if (data.services.length === 0) return alert(lang === "es" ? "Selecciona al menos un servicio." : "Pick at least one service.");
  if (!data.name.trim() || !data.email.trim()) return alert(lang === "es" ? "Nombre y email son obligatorios." : "Name and email are required.");

  setSubmitting(true);
  try {
    const res = await fetch("/api/project-planner", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lang, data, roadmap }),
    });
    if (!res.ok) throw new Error("Failed");

    setSent(true);

    // ✅ Reiniciar planner después de enviar
    setData({
      services: [],
      priorities: [],
      features: [],
      urgency: "soon",
      notes: "",
      name: "",
      email: "",
      phone: "",
    });
    setStep(1);
  } catch {
    alert(lang === "es" ? "Error al enviar. Inténtalo de nuevo." : "Error sending. Please try again.");
  } finally {
    setSubmitting(false);
  }
}

  // UI helpers
  const Step = ({ n, children }: { n: number; children: React.ReactNode }) => (
    <div className={step === n ? "block" : "hidden"}>{children}</div>
  );

  return (
    <section className="w-full max-w-3xl mx-auto rounded-2xl border p-6 bg-white/50 dark:bg-white/5 shadow-lg" aria-label={t.title}>
      {/* Header */}
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center">{t.title}</h3>
      <p className="text-sm opacity-70 text-center mt-1">{t.subtitle}</p>

      {/* Steps indicator */}
      <div className="mt-4 grid grid-cols-6 gap-2">
        {t.steps.map((label, i) => (
          <div key={i} className={`h-1 rounded ${i + 1 <= step ? "bg-indigo-500" : "bg-gray-300 dark:bg-white/10"}`} />
        ))}
      </div>

      {/* STEP 1: Services */}
      <Step n={1}>
        <div className="mt-6">
          <div className="text-sm font-medium">{t.servicesLabel}</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {(Object.keys(t.serviceList) as Service[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => toggleService(s)}
                className={`px-3 py-1 rounded-full border text-sm transition ${
                  data.services.includes(s) ? "bg-indigo-600 text-white border-indigo-600" : "hover:border-indigo-400"
                }`}
              >
                {t.serviceList[s]}
              </button>
            ))}
          </div>
        </div>
      </Step>

      {/* STEP 2: Goals */}
      <Step n={2}>
        <div className="mt-6">
          <div className="text-sm font-medium">{t.prioritiesLabel}</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {(Object.keys(t.priorities) as Priority[]).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => togglePriority(p)}
                className={`px-3 py-1 rounded-full border text-sm transition ${
                  data.priorities.includes(p) ? "bg-emerald-600 text-white border-emerald-600" : "hover:border-emerald-400"
                }`}
              >
                {t.priorities[p]}
              </button>
            ))}
          </div>
        </div>
      </Step>

      {/* STEP 3: Features (contextual por servicios) */}
      <Step n={3}>
        <div className="mt-6">
          <div className="text-sm font-medium">{t.featuresLabel}</div>
          {data.services.length === 0 ? (
            <p className="mt-3 text-sm opacity-70">{lang === "es" ? "Selecciona un servicio primero." : "Select a service first."}</p>
          ) : (
            <div className="mt-3 space-y-4">
              {data.services.map((s) => (
                <div key={s}>
                  <div className="text-xs uppercase tracking-wide opacity-70">{t.serviceList[s]}</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {FEATURE_LIBRARY[s].map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => toggleFeature(f)}
                        className={`px-3 py-1 rounded-full border text-sm transition ${
                          data.features.includes(f) ? "bg-indigo-600 text-white border-indigo-600" : "hover:border-indigo-400"
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Step>

      {/* STEP 4: Timeline + Notes */}
      <Step n={4}>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium">{t.urgencyLabel}</label>
            <select
              value={data.urgency}
              onChange={e => setData(d => ({ ...d, urgency: e.target.value as Urgency }))}
              className="mt-1 w-full rounded-md border p-2 bg-transparent"
            >
              <option value="now">{t.urgency.now}</option>
              <option value="soon">{t.urgency.soon}</option>
              <option value="later">{t.urgency.later}</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">{t.notesLabel}</label>
            <textarea
              rows={3}
              value={data.notes}
              onChange={e => setData(d => ({ ...d, notes: e.target.value }))}
              className="mt-1 w-full rounded-md border p-2 bg-transparent"
              placeholder={lang === "es" ? "Ej: referencia de estilo, sector, tamaño del proyecto…" : "Ex: style reference, industry, project size…"}
            />
          </div>
        </div>
      </Step>

      {/* STEP 5: Contact */}
      <Step n={5}>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div>
            <label className="text-sm font-medium">{t.name}</label>
            <input
              value={data.name}
              onChange={e => setData(d => ({ ...d, name: e.target.value }))}
              className="mt-1 w-full rounded-md border p-2 bg-transparent"
              placeholder={lang === "es" ? "Tu nombre" : "Your name"}
            />
          </div>
          <div>
            <label className="text-sm font-medium">{t.email}</label>
            <input
              type="email"
              value={data.email}
              onChange={e => setData(d => ({ ...d, email: e.target.value }))}
              className="mt-1 w-full rounded-md border p-2 bg-transparent"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium">{t.phone}</label>
            <input
              value={data.phone}
              onChange={e => setData(d => ({ ...d, phone: e.target.value }))}
              className="mt-1 w-full rounded-md border p-2 bg-transparent"
              placeholder="+1 555-123-4567"
            />
          </div>
        </div>
      </Step>

      {/* STEP 6: Review */}
      <Step n={6}>
        <div className="mt-6 rounded-xl border p-4 bg-white/60 dark:bg-white/10">
          <div className="flex items-center gap-2 font-semibold">
            <CheckIcon className="h-5 w-5 text-emerald-500" />
            {t.roadmapTitle}
          </div>
          <p className="text-sm opacity-70 mt-1">{t.roadmapIntro}</p>
          <pre className="mt-3 whitespace-pre-wrap text-sm">{roadmap}</pre>
        </div>
      </Step>

      {/* Nav buttons */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => setStep(s => Math.max(1, s - 1))}
          className="rounded-full px-4 py-2 border text-sm"
          disabled={step === 1}
        >
          {t.back}
        </button>

        {step < 6 && (
          <button
            onClick={() => {
              // validación simple por paso
              if (step === 1 && data.services.length === 0) return alert(lang === "es" ? "Selecciona al menos un servicio." : "Pick at least one service.");
              if (step === 5 && (!data.name.trim() || !data.email.trim())) return alert(lang === "es" ? "Nombre y email son obligatorios." : "Name and email are required.");
              setStep(s => s + 1);
            }}
            className="rounded-full px-5 py-2 bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition"
          >
            {step === 5 ? t.review : t.next}
          </button>
        )}

        {step === 6 && (
          <button
            onClick={onSubmit}
            disabled={submitting || sent}
            className="rounded-full px-5 py-2 bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-500 transition"
          >
            {submitting ? "…" : t.send}
          </button>
        )}
      </div>

      {sent && (
        <div className="mt-4 text-center text-emerald-600 font-medium">
          {t.success}
        </div>
      )}
    </section>
  );
}
