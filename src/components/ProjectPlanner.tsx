"use client";
import { useEffect, useMemo, useState } from "react";

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

const FEATURE_LIBRARY: Record<Service, string[]> = {
  web: ["SEO", "Blog", "Portfolio", "Contact form", "Landing page", "Analytics", "CMS"],
  mobile: ["Push notifications", "Bookings", "Maps", "In-app payments", "Chat", "Offline mode"],
  nfc: ["Digital profile", "QR link", "Analytics", "One-tap WhatsApp", "Payments link"],
  payments: ["Payment links", "Subscriptions", "Invoices", "Checkout embed"],
  maintenance: ["Updates", "Backups", "Monitoring", "Security hardening", "Performance tune"],
};

const SERVICE_ICONS: Record<Service, string> = {
  web: "◻",
  mobile: "▱",
  nfc: "⬡",
  payments: "◈",
  maintenance: "⟳",
};

const SERVICE_DESC_EN: Record<Service, string> = {
  web: "Modern, fast websites",
  mobile: "iOS & Android apps",
  nfc: "Tap-to-connect cards",
  payments: "Seamless checkout",
  maintenance: "Ongoing support",
};

const SERVICE_DESC_ES: Record<Service, string> = {
  web: "Sitios rápidos y modernos",
  mobile: "Apps iOS y Android",
  nfc: "Tarjetas conectadas",
  payments: "Cobros sin fricción",
  maintenance: "Soporte continuo",
};

export default function ProjectPlannerWizard() {
  const [lang, setLang] = useState<Lang>("en");
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [animDir, setAnimDir] = useState<"forward" | "back">("forward");

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setLang(navigator.language.startsWith("es") ? "es" : "en");
    }
  }, []);

  const t = useMemo(() => ({
    es: {
      title: "Planificador de Proyecto",
      subtitle: "Tu visión. Nuestro mapa.",
      steps: ["Servicios", "Objetivos", "Características", "Tiempo", "Contacto", "Resumen"],
      servicesLabel: "¿Qué quieres construir?",
      serviceList: { web: "Sitio Web", mobile: "App Móvil", nfc: "Tarjeta NFC", payments: "Pagos", maintenance: "Mantenimiento" },
      prioritiesLabel: "¿Cuál es tu prioridad?",
      priorities: { clients: "Más clientes", brand: "Imagen de marca", automate: "Automatizar", optimize: "Rendimiento" },
      featuresLabel: "Selecciona características",
      urgencyLabel: "¿Para cuándo?",
      urgency: { now: "Inmediatamente", soon: "Próximas semanas", later: "Sin prisa" },
      notesLabel: "¿Algo más que deba saber?",
      contactTitle: "Cuéntame de ti",
      name: "Nombre completo", email: "Correo electrónico", phone: "Teléfono (opcional)",
      next: "Continuar", back: "Atrás", review: "Ver resumen", send: "Enviar solicitud",
      success: "¡Listo! Te contactamos pronto.",
      roadmapTitle: "Tu proyecto en resumen",
      roadmapIntro: "Esto es lo que construiremos juntos:",
    },
    en: {
      title: "Project Planner",
      subtitle: "Your vision. Our roadmap.",
      steps: ["Services", "Goals", "Features", "Timeline", "Contact", "Review"],
      servicesLabel: "What are you building?",
      serviceList: { web: "Website", mobile: "Mobile App", nfc: "NFC Card", payments: "Payments", maintenance: "Maintenance" },
      prioritiesLabel: "What's your top priority?",
      priorities: { clients: "More clients", brand: "Brand identity", automate: "Automate", optimize: "Performance" },
      featuresLabel: "Pick your features",
      urgencyLabel: "What's your timeline?",
      urgency: { now: "Right away", soon: "In a few weeks", later: "No rush" },
      notesLabel: "Anything else I should know?",
      contactTitle: "Tell me about you",
      name: "Full name", email: "Email address", phone: "Phone (optional)",
      next: "Continue", back: "Back", review: "See summary", send: "Send request",
      success: "You're in! We'll be in touch shortly.",
      roadmapTitle: "Your project summary",
      roadmapIntro: "Here's what we'll build together:",
    },
  } as const)[lang], [lang]);

  const [data, setData] = useState<PlannerData>({
    services: [], priorities: [], features: [], urgency: "soon",
    notes: "", name: "", email: "", phone: "",
  });

  function toggle<T>(list: T[], value: T) {
    return list.includes(value) ? list.filter(v => v !== value) : [...list, value];
  }

  function toggleService(s: Service) {
    setData(d => {
      const updatedServices = toggle(d.services, s);
      const allowed = new Set(updatedServices.flatMap(sv => FEATURE_LIBRARY[sv]));
      return { ...d, services: updatedServices, features: d.features.filter(f => allowed.has(f)) };
    });
  }

  const roadmap = useMemo(() => {
    if (data.services.length === 0) return "";
    const sNames = data.services.map(s => t.serviceList[s]).join(", ");
    const goals = data.priorities.map(p => t.priorities[p]).join(", ");
    const feats = data.features.join(", ") || (lang === "es" ? "Por definir" : "TBD");
    if (lang === "es") return [`Alcance: ${sNames}`, goals && `Objetivos: ${goals}`, `Características: ${feats}`, `Tiempo: ${t.urgency[data.urgency]}`, data.notes && `Notas: ${data.notes}`, "Siguiente: validamos y enviamos propuesta formal."].filter(Boolean).join("\n");
    return [`Scope: ${sNames}`, goals && `Goals: ${goals}`, `Features: ${feats}`, `Timeline: ${t.urgency[data.urgency]}`, data.notes && `Notes: ${data.notes}`, "Next: we validate and send a formal proposal."].filter(Boolean).join("\n");
  }, [data, lang, t]);

  function goNext() {
    if (step === 1 && data.services.length === 0) return alert(lang === "es" ? "Selecciona al menos un servicio." : "Pick at least one service.");
    if (step === 5 && (!data.name.trim() || !data.email.trim())) return alert(lang === "es" ? "Nombre y email requeridos." : "Name and email are required.");
    setAnimDir("forward");
    setStep(s => Math.min(6, s + 1));
  }

  function goBack() {
    setAnimDir("back");
    setStep(s => Math.max(1, s - 1));
  }

  async function onSubmit() {
    if (!data.name.trim() || !data.email.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/project-planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lang, data, roadmap }),
      });
      if (!res.ok) throw new Error("Failed");
      setSent(true);
      setData({ services: [], priorities: [], features: [], urgency: "soon", notes: "", name: "", email: "", phone: "" });
      setStep(1);
    } catch {
      alert(lang === "es" ? "Error al enviar." : "Error sending. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const stepLabels = t.steps;
  const progress = ((step - 1) / (stepLabels.length - 1)) * 100;

  const inputClass = "w-full bg-transparent border-0 border-b-2 border-gray-200 focus:border-gray-900 outline-none py-2 text-sm text-gray-900 placeholder:text-gray-400 transition-all duration-300 mt-1";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        .planner-wrap * { box-sizing: border-box; }

        .planner-wrap {
          font-family: 'DM Sans', sans-serif;
          background: #ffffff;
          color: #111111;
        }

        .planner-title {
          font-family: 'DM Serif Display', serif;
          font-style: italic;
          letter-spacing: -0.03em;
        }

        .progress-bar-track {
          height: 2px;
          background: #f0f0f0;
          border-radius: 999px;
          overflow: hidden;
          position: relative;
        }

        .progress-bar-fill {
          height: 100%;
          background: #111111;
          border-radius: 999px;
          transition: width 0.5s cubic-bezier(0.65, 0, 0.35, 1);
        }

        .step-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #d0d0d0;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .step-dot.active { background: #111111; transform: scale(1.4); }
        .step-dot.done { background: #111111; }

        .chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 999px;
          border: 1.5px solid #e5e5e5;
          font-size: 13px;
          font-weight: 500;
          color: #555;
          cursor: pointer;
          transition: all 0.2s ease;
          background: white;
          white-space: nowrap;
          user-select: none;
          letter-spacing: -0.01em;
        }

        .chip:hover { border-color: #999; color: #111; transform: translateY(-1px); }

        .chip.selected {
          background: #111111;
          border-color: #111111;
          color: #ffffff;
          transform: translateY(-1px);
        }

        .chip-accent.selected {
          background: #ffffff;
          border-color: #111111;
          color: #111111;
          box-shadow: inset 0 0 0 1.5px #111111;
        }

        .service-card {
          border: 1.5px solid #f0f0f0;
          border-radius: 16px;
          padding: 20px;
          cursor: pointer;
          transition: all 0.25s ease;
          background: white;
          position: relative;
          overflow: hidden;
        }

        .service-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #f8f8f8;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .service-card:hover { border-color: #ccc; transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,0.06); }
        .service-card:hover::before { opacity: 1; }

        .service-card.selected {
          border-color: #111111;
          background: #111111;
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.15);
        }

        .service-card.selected::before { opacity: 0; }

        .service-icon {
          font-size: 22px;
          line-height: 1;
          color: #aaa;
          transition: color 0.2s;
          font-style: normal;
        }

        .service-card.selected .service-icon { color: rgba(255,255,255,0.5); }
        .service-card.selected .service-name { color: white; }
        .service-card.selected .service-desc { color: rgba(255,255,255,0.55); }

        .service-name {
          font-size: 14px;
          font-weight: 500;
          color: #111;
          margin-top: 12px;
          letter-spacing: -0.02em;
        }

        .service-desc {
          font-size: 11px;
          color: #aaa;
          margin-top: 2px;
          font-weight: 300;
        }

        .check-corner {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          opacity: 0;
          transform: scale(0);
          transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .service-card.selected .check-corner {
          opacity: 1;
          transform: scale(1);
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          border-radius: 999px;
          background: #111111;
          color: white;
          font-size: 13px;
          font-weight: 500;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          letter-spacing: -0.01em;
          font-family: 'DM Sans', sans-serif;
        }

        .btn-primary:hover { background: #333; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,0,0,0.15); }
        .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

        .btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 12px 20px;
          border-radius: 999px;
          background: transparent;
          color: #999;
          font-size: 13px;
          font-weight: 400;
          border: 1.5px solid #e5e5e5;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }

        .btn-ghost:hover { color: #111; border-color: #ccc; }
        .btn-ghost:disabled { opacity: 0.3; cursor: not-allowed; }

        .btn-success {
          background: linear-gradient(135deg, #111 0%, #444 100%);
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }

        .step-content {
          animation: fadeSlide 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }

        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .section-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #aaa;
          margin-bottom: 16px;
        }

        .big-question {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(22px, 4vw, 32px);
          font-style: italic;
          letter-spacing: -0.03em;
          color: #111;
          line-height: 1.15;
          margin-bottom: 28px;
        }

        .feature-group-label {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #bbb;
          margin-bottom: 10px;
          padding-bottom: 6px;
          border-bottom: 1px solid #f5f5f5;
        }

        .urgency-option {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border: 1.5px solid #f0f0f0;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 14px;
          font-weight: 400;
          color: #555;
        }

        .urgency-option:hover { border-color: #ccc; color: #111; }
        .urgency-option.selected { border-color: #111; background: #111; color: white; }

        .urgency-tag {
          font-size: 10px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          opacity: 0.5;
          font-weight: 500;
        }

        .roadmap-row {
          display: flex;
          gap: 16px;
          padding: 14px 0;
          border-bottom: 1px solid #f5f5f5;
          align-items: flex-start;
          font-size: 13px;
        }

        .roadmap-row:last-child { border-bottom: none; }

        .roadmap-key {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #bbb;
          min-width: 80px;
          padding-top: 1px;
        }

        .roadmap-val { color: #111; font-weight: 400; line-height: 1.5; }

        .success-wrap {
          text-align: center;
          padding: 40px 20px;
          animation: fadeSlide 0.4s ease both;
        }

        .success-icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #111;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          margin: 0 auto 20px;
        }

        .lang-toggle {
          position: absolute;
          top: 20px;
          right: 20px;
          display: flex;
          gap: 4px;
        }

        .lang-btn {
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border: 1.5px solid transparent;
          cursor: pointer;
          transition: all 0.2s;
          background: transparent;
          color: #bbb;
          font-family: 'DM Sans', sans-serif;
        }

        .lang-btn.active { border-color: #ddd; color: #111; }

        .step-number {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.06em;
          color: #bbb;
        }

        textarea.planner-textarea {
          width: 100%;
          background: transparent;
          border: 1.5px solid #f0f0f0;
          border-radius: 12px;
          padding: 14px 16px;
          font-size: 13px;
          font-family: 'DM Sans', sans-serif;
          color: #111;
          resize: none;
          outline: none;
          transition: border-color 0.2s;
          line-height: 1.6;
        }

        textarea.planner-textarea:focus { border-color: #999; }
        textarea.planner-textarea::placeholder { color: #ccc; }
      `}</style>

      <section className="planner-wrap" style={{ width: "100%", maxWidth: 640, margin: "0 auto", borderRadius: 24, border: "1.5px solid #f0f0f0", padding: "32px 32px 28px", position: "relative", boxShadow: "0 16px 64px rgba(0,0,0,0.06)" }}>

        {/* Lang toggle */}
        <div className="lang-toggle">
          {(["en", "es"] as Lang[]).map(l => (
            <button key={l} className={`lang-btn ${lang === l ? "active" : ""}`} onClick={() => setLang(l)}>{l}</button>
          ))}
        </div>

        {/* Header */}
        {!sent && (
          <div style={{ marginBottom: 28 }}>
            <div className="step-number">{lang === "es" ? "Paso" : "Step"} {step} / {stepLabels.length}</div>
            <h2 className="planner-title" style={{ fontSize: "clamp(26px, 5vw, 38px)", marginTop: 4 }}>{t.title}</h2>
            <p style={{ fontSize: 13, color: "#aaa", marginTop: 2 }}>{t.subtitle}</p>

            {/* Progress */}
            <div style={{ marginTop: 20 }}>
              <div className="progress-bar-track">
                <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
                {stepLabels.map((label, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div className={`step-dot ${i + 1 === step ? "active" : i + 1 < step ? "done" : ""}`} onClick={() => i + 1 < step && setStep(i + 1)} />
                    <span style={{ fontSize: 9, letterSpacing: "0.06em", textTransform: "uppercase", color: i + 1 <= step ? "#111" : "#ccc", fontWeight: 500, transition: "color 0.3s" }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 1: Services */}
        {step === 1 && (
          <div className="step-content">
            <div className="big-question">{t.servicesLabel}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: 10 }}>
              {(Object.keys(t.serviceList) as Service[]).map(s => (
                <div
                  key={s}
                  className={`service-card ${data.services.includes(s) ? "selected" : ""}`}
                  onClick={() => toggleService(s)}
                >
                  <div className="check-corner">✓</div>
                  <span className="service-icon">{SERVICE_ICONS[s]}</span>
                  <div className="service-name">{t.serviceList[s]}</div>
                  <div className="service-desc">{lang === "es" ? SERVICE_DESC_ES[s] : SERVICE_DESC_EN[s]}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Goals */}
        {step === 2 && (
          <div className="step-content">
            <div className="big-question">{t.prioritiesLabel}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {(Object.keys(t.priorities) as Priority[]).map(p => (
                <div
                  key={p}
                  className={`chip chip-accent ${data.priorities.includes(p) ? "selected" : ""}`}
                  onClick={() => setData(d => ({ ...d, priorities: toggle(d.priorities, p) }))}
                >
                  {data.priorities.includes(p) && <span style={{ fontSize: 10 }}>✓</span>}
                  {t.priorities[p]}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Features */}
        {step === 3 && (
          <div className="step-content">
            <div className="big-question">{t.featuresLabel}</div>
            {data.services.length === 0 ? (
              <p style={{ fontSize: 13, color: "#bbb" }}>{lang === "es" ? "Selecciona un servicio primero." : "Select a service first."}</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {data.services.map(s => (
                  <div key={s}>
                    <div className="feature-group-label">{t.serviceList[s]}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {FEATURE_LIBRARY[s].map(f => (
                        <div
                          key={f}
                          className={`chip ${data.features.includes(f) ? "selected" : ""}`}
                          onClick={() => setData(d => ({ ...d, features: toggle(d.features, f) }))}
                        >
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* STEP 4: Timeline + Notes */}
        {step === 4 && (
          <div className="step-content">
            <div className="big-question">{t.urgencyLabel}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
              {(["now", "soon", "later"] as Urgency[]).map(u => (
                <div
                  key={u}
                  className={`urgency-option ${data.urgency === u ? "selected" : ""}`}
                  onClick={() => setData(d => ({ ...d, urgency: u }))}
                >
                  <span>{t.urgency[u]}</span>
                  <span className="urgency-tag">{u === "now" ? "ASAP" : u === "soon" ? "1–4 wks" : "Flexible"}</span>
                </div>
              ))}
            </div>
            <div className="section-label">{t.notesLabel}</div>
            <textarea
              className="planner-textarea"
              rows={4}
              value={data.notes}
              onChange={e => setData(d => ({ ...d, notes: e.target.value }))}
              placeholder={lang === "es" ? "Sector, referencia de estilo, tamaño del equipo…" : "Industry, style reference, team size…"}
            />
          </div>
        )}

        {/* STEP 5: Contact */}
        {step === 5 && (
          <div className="step-content">
            <div className="big-question">{t.contactTitle}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div>
                <label style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#bbb" }}>{t.name}</label>
                <input
                  value={data.name}
                  onChange={e => setData(d => ({ ...d, name: e.target.value }))}
                  className={inputClass}
                  placeholder={lang === "es" ? "María García" : "Alex Johnson"}
                />
              </div>
              <div>
                <label style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#bbb" }}>{t.email}</label>
                <input
                  type="email"
                  value={data.email}
                  onChange={e => setData(d => ({ ...d, email: e.target.value }))}
                  className={inputClass}
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#bbb" }}>{t.phone}</label>
                <input
                  value={data.phone}
                  onChange={e => setData(d => ({ ...d, phone: e.target.value }))}
                  className={inputClass}
                  placeholder="+1 555 000 0000"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: Review */}
        {step === 6 && !sent && (
          <div className="step-content">
            <div className="big-question">{t.roadmapTitle}</div>
            <p style={{ fontSize: 12, color: "#bbb", marginTop: -16, marginBottom: 20, letterSpacing: "0.01em" }}>{t.roadmapIntro}</p>
            <div style={{ border: "1.5px solid #f0f0f0", borderRadius: 16, padding: "4px 20px" }}>
              {data.services.length > 0 && (
                <div className="roadmap-row">
                  <div className="roadmap-key">{lang === "es" ? "Alcance" : "Scope"}</div>
                  <div className="roadmap-val">{data.services.map(s => t.serviceList[s]).join(", ")}</div>
                </div>
              )}
              {data.priorities.length > 0 && (
                <div className="roadmap-row">
                  <div className="roadmap-key">{lang === "es" ? "Objetivos" : "Goals"}</div>
                  <div className="roadmap-val">{data.priorities.map(p => t.priorities[p]).join(", ")}</div>
                </div>
              )}
              {data.features.length > 0 && (
                <div className="roadmap-row">
                  <div className="roadmap-key">{lang === "es" ? "Features" : "Features"}</div>
                  <div className="roadmap-val">{data.features.join(", ")}</div>
                </div>
              )}
              <div className="roadmap-row">
                <div className="roadmap-key">{lang === "es" ? "Plazo" : "Timeline"}</div>
                <div className="roadmap-val">{t.urgency[data.urgency]}</div>
              </div>
              {data.notes && (
                <div className="roadmap-row">
                  <div className="roadmap-key">{lang === "es" ? "Notas" : "Notes"}</div>
                  <div className="roadmap-val" style={{ color: "#777" }}>{data.notes}</div>
                </div>
              )}
              <div className="roadmap-row">
                <div className="roadmap-key">{lang === "es" ? "Contacto" : "Contact"}</div>
                <div className="roadmap-val">{data.name} · {data.email}</div>
              </div>
            </div>
          </div>
        )}

        {/* Success */}
        {sent && (
          <div className="success-wrap">
            <div className="success-icon">✓</div>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic", fontSize: 28, letterSpacing: "-0.03em", marginBottom: 8 }}>{t.success}</h3>
            <p style={{ fontSize: 13, color: "#bbb" }}>{lang === "es" ? "Revisaremos tu proyecto y te enviaremos una propuesta." : "We'll review your project and send a formal proposal."}</p>
          </div>
        )}

        {/* Nav */}
        {!sent && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 32, paddingTop: 20, borderTop: "1px solid #f5f5f5" }}>
            <button className="btn-ghost" onClick={goBack} disabled={step === 1}>
              <span style={{ fontSize: 14 }}>←</span> {t.back}
            </button>

            {step < 6 && (
              <button className="btn-primary" onClick={goNext}>
                {step === 5 ? t.review : t.next} <span style={{ fontSize: 14 }}>→</span>
              </button>
            )}

            {step === 6 && (
              <button className={`btn-primary btn-success`} onClick={onSubmit} disabled={submitting || sent}>
                {submitting ? (
                  <span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>◌</span>
                ) : (
                  <>{t.send} <span style={{ fontSize: 14 }}>↗</span></>
                )}
              </button>
            )}
          </div>
        )}
      </section>
    </>
  );
}