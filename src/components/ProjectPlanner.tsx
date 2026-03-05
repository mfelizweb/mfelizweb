"use client";
import { Suspense } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type Lang = "es" | "en";
type Service = "web" | "mobile" | "nfc" | "payments" | "maintenance";
type Priority = "clients" | "brand" | "automate" | "optimize";
type Urgency = "now" | "soon" | "later";

type PlannerData = {
  services: Service[];
  priorities: Priority[];
  features: string[];
  urgency: Urgency;
  notes: string;
  name: string;
  email: string;
  phone: string;
};

const FEATURE_LIBRARY: Record<Service, { label: string; icon: string }[]> = {
  web: [
    { label: "SEO Optimization", icon: "🔍" },
    { label: "Blog / CMS", icon: "✍️" },
    { label: "Portfolio", icon: "🖼️" },
    { label: "Contact Form", icon: "📬" },
    { label: "Landing Page", icon: "🚀" },
    { label: "Analytics", icon: "📊" },
  ],
  mobile: [
    { label: "Push Notifications", icon: "🔔" },
    { label: "Bookings", icon: "📅" },
    { label: "Maps", icon: "🗺️" },
    { label: "In-App Payments", icon: "💳" },
    { label: "Chat", icon: "💬" },
    { label: "Offline Mode", icon: "📵" },
  ],
  nfc: [
    { label: "Digital Profile", icon: "👤" },
    { label: "QR Link", icon: "⬛" },
    { label: "Analytics", icon: "📊" },
    { label: "One-tap WhatsApp", icon: "💬" },
    { label: "Payments Link", icon: "💳" },
  ],
  payments: [
    { label: "Payment Links", icon: "🔗" },
    { label: "Subscriptions", icon: "🔄" },
    { label: "Invoices", icon: "🧾" },
    { label: "Checkout Embed", icon: "🛒" },
  ],
  maintenance: [
    { label: "Monthly Updates", icon: "🔄" },
    { label: "Backups", icon: "💾" },
    { label: "Monitoring", icon: "📡" },
    { label: "Security", icon: "🛡️" },
    { label: "Performance", icon: "⚡" },
  ],
};

const SERVICES: { key: Service; icon: string; label_en: string; label_es: string; desc_en: string; desc_es: string }[] = [
  { key: "web", icon: "🌐", label_en: "Website", label_es: "Sitio Web", desc_en: "Modern, fast sites", desc_es: "Sitios rápidos y modernos" },
  { key: "mobile", icon: "📱", label_en: "Mobile App", label_es: "App Móvil", desc_en: "iOS & Android apps", desc_es: "Apps nativas iOS y Android" },
  { key: "nfc", icon: "📶", label_en: "NFC Card", label_es: "Tarjeta NFC", desc_en: "Tap-to-connect", desc_es: "Conexión con un tap" },
  { key: "payments", icon: "💳", label_en: "Payments", label_es: "Pagos", desc_en: "Stripe & Square", desc_es: "Stripe y Square" },
  { key: "maintenance", icon: "🛠️", label_en: "Maintenance", label_es: "Mantenimiento", desc_en: "Ongoing support", desc_es: "Soporte continuo" },
];

const PRIORITIES: { key: Priority; icon: string; label_en: string; label_es: string }[] = [
  { key: "clients", icon: "🎯", label_en: "More clients", label_es: "Más clientes" },
  { key: "brand", icon: "✨", label_en: "Brand identity", label_es: "Imagen de marca" },
  { key: "automate", icon: "⚡", label_en: "Automation", label_es: "Automatizar" },
  { key: "optimize", icon: "🚀", label_en: "Performance", label_es: "Rendimiento" },
];

const URGENCY: { key: Urgency; label_en: string; label_es: string; tag: string }[] = [
  { key: "now", label_en: "Right away", label_es: "Lo antes posible", tag: "ASAP" },
  { key: "soon", label_en: "In a few weeks", label_es: "Próximas semanas", tag: "1–4 wks" },
  { key: "later", label_en: "No rush", label_es: "Sin prisa", tag: "Flexible" },
];

const STEP_NAMES_EN = ["Service", "Goals", "Features", "Timeline", "Contact", "Review"];
const STEP_NAMES_ES = ["Servicio", "Objetivos", "Features", "Plazo", "Contacto", "Resumen"];

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? 40 : -40, opacity: 0 }),
};

// Map URL param values → Service keys
const SERVICE_PARAM_MAP: Record<string, Service> = {
  web: "web", website: "web", site: "web",
  mobile: "mobile", app: "mobile",
  nfc: "nfc",
  payments: "payments", payment: "payments",
  maintenance: "maintenance", support: "maintenance",
};

function ProjectPlannerInner() {
  const searchParams = useSearchParams();
  const [lang, setLang] = useState<Lang>("en");
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const [data, setData] = useState<PlannerData>({
    services: [], priorities: [], features: [],
    urgency: "soon", notes: "", name: "", email: "", phone: "",
  });

  // ── Detect lang
  useEffect(() => {
    if (typeof navigator !== "undefined")
      setLang(navigator.language.toLowerCase().startsWith("es") ? "es" : "en");
  }, []);

  // ── Pre-select service from URL ?service=web
  useEffect(() => {
    const param = searchParams?.get("service")?.toLowerCase();
    if (!param) return;
    const mapped = SERVICE_PARAM_MAP[param];
    if (mapped) {
      setData(d => ({ ...d, services: [mapped] }));
    }
  }, [searchParams]);

  function toggleService(s: Service) {
    setData(d => {
      const updated = d.services.includes(s)
        ? d.services.filter(v => v !== s)
        : [...d.services, s];
      const allowed = new Set(updated.flatMap(sv => FEATURE_LIBRARY[sv].map(f => f.label)));
      return { ...d, services: updated, features: d.features.filter(f => allowed.has(f)) };
    });
  }

  function toggle<T>(list: T[], val: T) {
    return list.includes(val) ? list.filter(v => v !== val) : [...list, val];
  }

  const L = (es: string, en: string) => (lang === "es" ? es : en);

  function goNext() {
    if (step === 1 && data.services.length === 0)
      return alert(L("Selecciona al menos un servicio.", "Pick at least one service."));
    if (step === 5 && (!data.name.trim() || !data.email.trim()))
      return alert(L("Nombre y email son requeridos.", "Name and email are required."));
    setDir(1); setStep(s => Math.min(6, s + 1));
  }

  function goBack() { setDir(-1); setStep(s => Math.max(1, s - 1)); }

  async function onSubmit() {
    setSubmitting(true);
    try {
      const res = await fetch("/api/project-planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lang, data }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
      setData({ services: [], priorities: [], features: [], urgency: "soon", notes: "", name: "", email: "", phone: "" });
      setStep(1);
    } catch {
      alert(L("Error al enviar. Intenta de nuevo.", "Error sending. Please try again."));
    } finally {
      setSubmitting(false);
    }
  }

  const progress = ((step - 1) / 5) * 100;
  const stepNames = lang === "es" ? STEP_NAMES_ES : STEP_NAMES_EN;

  return (
    <div className="w-full font-sans">

      {/* ── Header ── */}
      {!sent && (
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">
                {L("Paso", "Step")} {step} / 6
              </p>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tighter text-slate-900 uppercase">
                {step === 1 && L("¿Qué construimos?", "What are we building?")}
                {step === 2 && L("¿Cuál es tu objetivo?", "What's your goal?")}
                {step === 3 && L("Selecciona features", "Pick your features")}
                {step === 4 && L("¿Para cuándo?", "What's your timeline?")}
                {step === 5 && L("Cuéntame de ti", "Tell me about you")}
                {step === 6 && L("Resumen de tu proyecto", "Your project summary")}
              </h2>
            </div>
            {/* Lang toggle */}
            <div className="flex rounded-full border border-slate-200 overflow-hidden">
              {(["en", "es"] as Lang[]).map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${lang === l ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-700"}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Progress */}
          <div className="relative h-1 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between mt-3">
            {stepNames.map((name, i) => (
              <button
                key={i}
                onClick={() => i + 1 < step && (setDir(-1), setStep(i + 1))}
                className={`text-[9px] font-black uppercase tracking-widest transition-colors ${i + 1 <= step ? "text-blue-600" : "text-slate-300"} ${i + 1 < step ? "cursor-pointer" : "cursor-default"}`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Steps ── */}
      <div className="overflow-hidden min-h-[280px]">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeOut" }}
          >

            {/* STEP 1: Services */}
            {step === 1 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SERVICES.map(s => {
                  const active = data.services.includes(s.key);
                  return (
                    <button
                      key={s.key}
                      onClick={() => toggleService(s.key)}
                      className={`group relative flex flex-col items-start gap-2 rounded-2xl border p-5 text-left transition-all duration-200
                        ${active
                          ? "border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                          : "border-slate-200 bg-white hover:border-blue-300 hover:shadow-md text-slate-700"}`}
                    >
                      {active && (
                        <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-black text-white">✓</span>
                      )}
                      <span className="text-2xl">{s.icon}</span>
                      <div>
                        <div className={`text-sm font-black uppercase tracking-tight ${active ? "text-white" : "text-slate-900"}`}>
                          {L(s.label_es, s.label_en)}
                        </div>
                        <div className={`text-xs mt-0.5 ${active ? "text-white/60" : "text-slate-400"}`}>
                          {L(s.desc_es, s.desc_en)}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* STEP 2: Goals */}
            {step === 2 && (
              <div className="grid grid-cols-2 gap-3">
                {PRIORITIES.map(p => {
                  const active = data.priorities.includes(p.key);
                  return (
                    <button
                      key={p.key}
                      onClick={() => setData(d => ({ ...d, priorities: toggle(d.priorities, p.key) }))}
                      className={`flex items-center gap-3 rounded-2xl border p-5 text-left transition-all duration-200
                        ${active
                          ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                          : "border-slate-200 bg-white hover:border-blue-200 text-slate-600"}`}
                    >
                      <span className="text-2xl">{p.icon}</span>
                      <div>
                        <div className={`text-sm font-black uppercase tracking-tight ${active ? "text-blue-700" : "text-slate-900"}`}>
                          {L(p.label_es, p.label_en)}
                        </div>
                        {active && <div className="text-[10px] text-blue-500 font-bold mt-0.5">✓ Selected</div>}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* STEP 3: Features */}
            {step === 3 && (
              <div className="space-y-6">
                {data.services.length === 0 ? (
                  <p className="text-slate-400 text-sm">{L("Selecciona un servicio en el paso 1.", "Go back and select a service first.")}</p>
                ) : (
                  data.services.map(s => {
                    const svc = SERVICES.find(sv => sv.key === s)!;
                    return (
                      <div key={s}>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-base">{svc.icon}</span>
                          <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
                            {L(svc.label_es, svc.label_en)}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {FEATURE_LIBRARY[s].map(f => {
                            const active = data.features.includes(f.label);
                            return (
                              <button
                                key={f.label}
                                onClick={() => setData(d => ({ ...d, features: toggle(d.features, f.label) }))}
                                className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-bold transition-all duration-200
                                  ${active
                                    ? "border-blue-500 bg-blue-600 text-white shadow-sm"
                                    : "border-slate-200 bg-white text-slate-600 hover:border-blue-300"}`}
                              >
                                <span>{f.icon}</span>
                                {f.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* STEP 4: Timeline */}
            {step === 4 && (
              <div className="space-y-3">
                {URGENCY.map(u => {
                  const active = data.urgency === u.key;
                  return (
                    <button
                      key={u.key}
                      onClick={() => setData(d => ({ ...d, urgency: u.key }))}
                      className={`w-full flex items-center justify-between rounded-2xl border p-5 text-left transition-all duration-200
                        ${active
                          ? "border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                          : "border-slate-200 bg-white hover:border-blue-200 text-slate-700"}`}
                    >
                      <span className={`text-sm font-black uppercase tracking-tight ${active ? "text-white" : "text-slate-900"}`}>
                        {L(u.label_es, u.label_en)}
                      </span>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${active ? "text-white/60" : "text-slate-400"}`}>
                        {u.tag}
                      </span>
                    </button>
                  );
                })}
                <div className="mt-6">
                  <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 block mb-2">
                    {L("¿Algo más que deba saber?", "Anything else I should know?")}
                  </label>
                  <textarea
                    rows={3}
                    value={data.notes}
                    onChange={e => setData(d => ({ ...d, notes: e.target.value }))}
                    placeholder={L("Sector, referencia visual, tamaño del equipo…", "Industry, style reference, team size…")}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-300 outline-none focus:border-blue-400 resize-none transition-colors"
                  />
                </div>
              </div>
            )}

            {/* STEP 5: Contact */}
            {step === 5 && (
              <div className="space-y-6">
                {[
                  { key: "name" as const, label_en: "Full Name", label_es: "Nombre completo", ph_en: "Alex Johnson", ph_es: "María García", type: "text" },
                  { key: "email" as const, label_en: "Email Address", label_es: "Correo electrónico", ph_en: "you@company.com", ph_es: "tu@empresa.com", type: "email" },
                  { key: "phone" as const, label_en: "Phone (optional)", label_es: "Teléfono (opcional)", ph_en: "+1 555 000 0000", ph_es: "+1 555 000 0000", type: "tel" },
                ].map(field => (
                  <div key={field.key} className="group">
                    <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 block mb-2">
                      {L(field.label_es, field.label_en)}
                    </label>
                    <input
                      type={field.type}
                      value={data[field.key]}
                      onChange={e => setData(d => ({ ...d, [field.key]: e.target.value }))}
                      placeholder={L(field.ph_es, field.ph_en)}
                      className="w-full border-0 border-b-2 border-slate-200 bg-transparent py-2 text-base text-slate-900 placeholder:text-slate-300 outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* STEP 6: Review */}
            {step === 6 && !sent && (
              <div className="space-y-0 rounded-2xl border border-slate-200 overflow-hidden">
                {[
                  { label_en: "Services", label_es: "Servicios", value: data.services.map(s => SERVICES.find(sv => sv.key === s)?.icon + " " + L(SERVICES.find(sv => sv.key === s)!.label_es, SERVICES.find(sv => sv.key === s)!.label_en)).join(", ") || "—" },
                  { label_en: "Goals", label_es: "Objetivos", value: data.priorities.map(p => PRIORITIES.find(pr => pr.key === p)?.[lang === "es" ? "label_es" : "label_en"]).join(", ") || L("Sin seleccionar", "None selected") },
                  { label_en: "Features", label_es: "Features", value: data.features.join(", ") || "TBD" },
                  { label_en: "Timeline", label_es: "Plazo", value: L(URGENCY.find(u => u.key === data.urgency)!.label_es, URGENCY.find(u => u.key === data.urgency)!.label_en) },
                  { label_en: "Contact", label_es: "Contacto", value: `${data.name} · ${data.email}` },
                  ...(data.notes ? [{ label_en: "Notes", label_es: "Notas", value: data.notes }] : []),
                ].map((row, i, arr) => (
                  <div key={i} className={`flex gap-4 px-5 py-4 ${i < arr.length - 1 ? "border-b border-slate-100" : ""}`}>
                    <div className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 min-w-[80px] pt-0.5">
                      {L(row.label_es, row.label_en)}
                    </div>
                    <div className="text-sm text-slate-700 leading-relaxed">{row.value}</div>
                  </div>
                ))}
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Success ── */}
      {sent && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl mx-auto mb-6 shadow-lg shadow-blue-600/20">✓</div>
          <h3 className="text-3xl font-black tracking-tighter uppercase text-slate-900 mb-3">
            {L("¡Enviado!", "Sent!")}
          </h3>
          <p className="text-slate-500 text-sm max-w-xs mx-auto">
            {L("Revisaremos tu proyecto y te enviamos una propuesta formal pronto.", "We'll review your project and send a formal proposal shortly.")}
          </p>
        </motion.div>
      )}

      {/* ── Nav ── */}
      {!sent && (
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-100">
          <button
            onClick={goBack}
            disabled={step === 1}
            className="flex items-center gap-2 rounded-full border border-slate-200 px-6 py-3 text-sm font-bold text-slate-500 hover:border-slate-300 hover:text-slate-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← {L("Atrás", "Back")}
          </button>

          {step < 6 && (
            <button
              onClick={goNext}
              className="flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3 text-sm font-black uppercase tracking-wider text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:scale-105 transition-all"
            >
              {step === 5 ? L("Ver resumen", "Review") : L("Continuar", "Continue")} →
            </button>
          )}

          {step === 6 && (
            <button
              onClick={onSubmit}
              disabled={submitting}
              className="flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3 text-sm font-black uppercase tracking-wider text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <span className="inline-block animate-spin">◌</span>
              ) : (
                <>{L("Enviar solicitud", "Send Request")} ↗</>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// Wrap in Suspense so pages using this component can be statically pre-rendered.
// useSearchParams() requires a Suspense boundary when used in SSR/SSG context.
export default function ProjectPlanner() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-blue-200 border-t-blue-600 animate-spin" />
          <p className="text-sm text-slate-400 font-medium">Loading planner…</p>
        </div>
      </div>
    }>
      <ProjectPlannerInner />
    </Suspense>
  );
}