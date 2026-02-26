"use client";
import { useEffect, useState } from "react";

export default function PaymentsServicePage() {
  const [lang, setLang] = useState<"es" | "en">("en");
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setLang(navigator.language.startsWith("es") ? "es" : "en");
    }

    let frame: number;
    const target = 9847;
    const duration = 2000;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    const timeout = setTimeout(() => {
      frame = requestAnimationFrame(tick);
    }, 800);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, []);
  const texts = {
    es: {
      eyebrow: "Infraestructura de Pagos",
      title: "Cobra sin\nfricción.",
      subtitle:
        "Links de pago, checkout integrado, suscripciones y facturación automática — listo para tu negocio.",
      items: [
        { icon: "⟳", label: "Links & checkout", desc: "Comparte un enlace o embebe el pago en tu sitio" },
        { icon: "◐", label: "Suscripciones", desc: "Planes recurrentes con facturación automática" },
        { icon: "⬡", label: "Seguridad bancaria", desc: "Encriptación y protección de última generación" },
        { icon: "↗", label: "Confianza del cliente", desc: "Flujos de pago modernos que convierten mejor" },
      ],
      cta: "Solicita una consulta",
      stat: "transacciones procesadas",
      statPrefix: "+",
    },
    en: {
      eyebrow: "Payments Infrastructure",
      title: "Get paid\nseamlessly.",
      subtitle:
        "Payment links, embedded checkout, subscriptions, and automated invoicing — ready for your business.",
      items: [
        { icon: "⟳", label: "Links & checkout", desc: "Share a link or embed payments into your site" },
        { icon: "◐", label: "Subscriptions", desc: "Recurring plans with automated billing" },
        { icon: "⬡", label: "Bank-grade security", desc: "Latest encryption and fraud protection" },
        { icon: "↗", label: "Client trust", desc: "Modern payment flows that convert better" },
      ],
      cta: "Request a Consultation",
      stat: "transactions processed",
      statPrefix: "+",
    },
  };

  const t = texts[lang];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;1,300&display=swap');
        :root {
          --bg: #ffffff;
          --surface: #0e1318;
          --border: rgba(255,255,255,0.07);
          --accent: #00e5a0;
          --accent-dim: rgba(0,229,160,0.12);
          --text: #0080ff;
          --muted: #7a8a96;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .pay-root {
          font-family: 'DM Sans', sans-serif;
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
          overflow-x: hidden;
          position: relative;
        }

        /* ambient glow — yellow */
        .pay-root::before {
          content: '';
          position: fixed;
          top: -20%;
          left: 50%;
          transform: translateX(-50%);
          width: 900px;
          height: 500px;
          background: radial-gradient(ellipse, rgba(245,200,66,0.07) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .pay-root::after {
          content: '';
          position: fixed;
          bottom: -10%;
          right: -5%;
          width: 600px;
          height: 600px;
          background: radial-gradient(ellipse, rgba(255,140,0,0.05) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .grid-bg {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          z-index: 0;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent);
        }

        .container {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          padding: 80px 24px 100px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        @media (max-width: 768px) {
          .container { grid-template-columns: 1fr; gap: 56px; padding: 60px 20px 80px; }
          .viz-col { order: -1; }
        }

        /* ── TEXT COLUMN ── */
        .eyebrow {
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--accent);
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          opacity: 0;
          animation: fadeUp 0.6s ease 0.1s forwards;
        }

        .eyebrow::before {
          content: '';
          width: 28px;
          height: 1px;
          background: var(--accent);
        }

        .headline {
          font-family: 'Syne', sans-serif;
          font-size: clamp(40px, 5.5vw, 62px);
          font-weight: 800;
          line-height: 1.0;
          letter-spacing: -0.025em;
          white-space: pre-line;
          opacity: 0;
          animation: fadeUp 0.6s ease 0.2s forwards;
        }

        .headline em {
          font-style: normal;
          background: linear-gradient(120deg, var(--accent), #ffdc70, #f59f00);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subtitle {
          margin-top: 20px;
          font-size: 16px;
          line-height: 1.65;
          color: var(--muted);
          font-weight: 300;
          max-width: 380px;
          opacity: 0;
          animation: fadeUp 0.6s ease 0.3s forwards;
        }

        .items {
          margin-top: 36px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 15px 18px;
          border-radius: 14px;
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.02);
          cursor: default;
          transition: border-color 0.25s, background 0.25s, transform 0.2s;
          opacity: 0;
          animation: fadeUp 0.5s ease forwards;
        }

        .item:nth-child(1) { animation-delay: 0.4s; }
        .item:nth-child(2) { animation-delay: 0.5s; }
        .item:nth-child(3) { animation-delay: 0.6s; }
        .item:nth-child(4) { animation-delay: 0.7s; }

        .item:hover, .item.active {
          border-color: rgba(245,200,66,0.35);
          background: var(--accent-dim);
          transform: translateX(4px);
        }

        .item-icon {
          font-size: 16px;
          color: var(--accent);
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: var(--accent-dim);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .item-text { display: flex; flex-direction: column; gap: 2px; }
        .item-label { font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 600; }
        .item-desc { font-size: 12px; color: var(--muted); line-height: 1.4; }

        .cta-row {
          margin-top: 36px;
          display: flex;
          align-items: center;
          gap: 20px;
          opacity: 0;
          animation: fadeUp 0.6s ease 0.85s forwards;
        }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--accent);
          color: #1a0f00;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.03em;
          padding: 14px 28px;
          border-radius: 999px;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(245,200,66,0.4);
        }

        .cta-btn svg { width: 16px; height: 16px; }

        /* ── VIZ COLUMN ── */
        .viz-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
          opacity: 0;
          animation: fadeIn 0.8s ease 0.5s forwards;
        }

        /* Checkout card mockup */
        .checkout-card {
          background: linear-gradient(160deg, #111820 0%, #0d1520 100%);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.5);
          position: relative;
          overflow: hidden;
        }

        .checkout-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(245,200,66,0.3), transparent);
        }

        .checkout-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .checkout-merchant {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .merchant-logo {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: var(--accent-dim);
          border: 1px solid rgba(245,200,66,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: var(--accent);
          font-family: 'Syne', sans-serif;
          font-weight: 800;
        }

        .merchant-info { display: flex; flex-direction: column; }
        .merchant-name {
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: var(--text);
        }
        .merchant-sub { font-size: 11px; color: var(--muted); }

        .checkout-amount {
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: var(--accent);
        }

        /* fake input fields */
        .checkout-fields {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 16px;
        }

        .field-row { display: flex; gap: 10px; }

        .fake-input {
          flex: 1;
          height: 36px;
          border-radius: 9px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          display: flex;
          align-items: center;
          padding: 0 12px;
          gap: 8px;
        }

        .fake-input-label {
          font-size: 10px;
          color: var(--muted);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          font-family: 'Syne', sans-serif;
        }

        .fake-input-value {
          font-size: 12px;
          color: rgba(255,255,255,0.5);
          font-family: 'DM Sans', sans-serif;
        }

        .pay-btn-mock {
          width: 100%;
          height: 40px;
          border-radius: 10px;
          background: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #1a0f00;
          letter-spacing: 0.04em;
          position: relative;
          overflow: hidden;
        }

        .pay-btn-mock::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          animation: shimmer 2.5s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .lock-icon { font-size: 12px; }

        /* security badges */
        .security-row {
          display: flex;
          gap: 8px;
          margin-top: 14px;
          justify-content: center;
        }

        .sec-badge {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 10px;
          color: var(--muted);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-family: 'Syne', sans-serif;
          padding: 4px 10px;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.02);
        }

        .sec-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--accent);
          opacity: 0.7;
        }

        /* stats row */
        .stats-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .stat-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          transition: border-color 0.3s;
        }

        .stat-card:hover { border-color: rgba(245,200,66,0.3); }

        .stat-value {
          font-family: 'Syne', sans-serif;
          font-size: 26px;
          font-weight: 800;
          color: var(--accent);
          letter-spacing: -0.02em;
        }

        .stat-label {
          font-size: 11px;
          color: var(--muted);
          line-height: 1.4;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-family: 'Syne', sans-serif;
        }

        .stat-trend {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: #4ade80;
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          margin-top: 4px;
        }

        /* mini bar chart inside stat */
        .mini-bars {
          display: flex;
          align-items: flex-end;
          gap: 3px;
          height: 24px;
          margin-top: 6px;
        }

        .bar {
          flex: 1;
          border-radius: 3px 3px 0 0;
          background: var(--accent-dim);
          border: 1px solid rgba(245,200,66,0.2);
          transition: height 0.3s;
        }

        .bar.active-bar { background: var(--accent); border-color: var(--accent); }

        /* pulse ring for the live dot */
        .live-dot {
          position: relative;
          width: 8px; height: 8px;
        }

        .live-dot::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #4ade80;
          animation: livePulse 1.6s ease-in-out infinite;
        }

        .live-dot::after {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          border: 1.5px solid rgba(74,222,128,0.4);
          animation: liveRing 1.6s ease-in-out infinite;
        }

        @keyframes livePulse {
          0%, 100% { transform: scale(0.9); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }

        @keyframes liveRing {
          0% { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(1.8); opacity: 0; }
        }

        .live-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          color: #4ade80;
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      <div className="pay-root">
        <div className="grid-bg" />

        <div className="container">
          {/* ── LEFT: TEXT ── */}
          <div className="text-col">
            <p className="eyebrow">{t.eyebrow}</p>

            <h1 className="headline">
              {t.title.split("\n").map((line, i) =>
                i === 0 ? line : <><br key={i} /><em>{line}</em></>
              )}
            </h1>

            <p className="subtitle">{t.subtitle}</p>

            <ul className="items">
              {t.items.map((item, i) => (
                <li
                  key={i}
                  className={`item${activeItem === i ? " active" : ""}`}
                  onMouseEnter={() => setActiveItem(i)}
                  onMouseLeave={() => setActiveItem(null)}
                >
                  <span className="item-icon">{item.icon}</span>
                  <span className="item-text">
                    <span className="item-label">{item.label}</span>
                    <span className="item-desc">{item.desc}</span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="cta-row">
              <a href="/estimate" className="cta-btn">
                {t.cta}
                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          {/* ── RIGHT: VISUAL ── */}
          <div className="viz-col">

            {/* Checkout mockup */}
            <div className="checkout-card">
              <div className="checkout-header">
                <div className="checkout-merchant">
                  <div className="merchant-logo">S</div>
                  <div className="merchant-info">
                    <span className="merchant-name">Studio AX</span>
                    <span className="merchant-sub">secure.checkout</span>
                  </div>
                </div>
                <span className="checkout-amount">$149.00</span>
              </div>

              <div className="checkout-fields">
                <div className="fake-input">
                  <span className="fake-input-label">Card</span>
                  <span className="fake-input-value">•••• •••• •••• 4242</span>
                </div>
                <div className="field-row">
                  <div className="fake-input">
                    <span className="fake-input-label">Exp</span>
                    <span className="fake-input-value">12/27</span>
                  </div>
                  <div className="fake-input">
                    <span className="fake-input-label">CVC</span>
                    <span className="fake-input-value">•••</span>
                  </div>
                </div>
              </div>

              <div className="pay-btn-mock">
                <span className="lock-icon">🔒</span>
                {lang === "es" ? "Pagar ahora" : "Pay now"}
              </div>

              <div className="security-row">
                <span className="sec-badge"><span className="sec-dot" />SSL</span>
                <span className="sec-badge"><span className="sec-dot" />PCI DSS</span>
                <span className="sec-badge"><span className="sec-dot" />3D Secure</span>
              </div>
            </div>

            {/* Stats row */}
            <div className="stats-row">
              <div className="stat-card">
                <div className="live-label">
                  <div className="live-dot" />
                  {lang === "es" ? "En vivo" : "Live"}
                </div>
                <div className="stat-value">{t.statPrefix}{count.toLocaleString()}</div>
                <div className="stat-label">{t.stat}</div>
                <div className="mini-bars">
                  {[40, 60, 45, 75, 55, 90, 70, 100].map((h, i) => (
                    <div
                      key={i}
                      className={`bar${i === 7 ? " active-bar" : ""}`}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-value">99.9%</div>
                <div className="stat-label">{lang === "es" ? "Uptime garantizado" : "Guaranteed uptime"}</div>
                <div className="stat-trend">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 9L4.5 5.5L7 8L11 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {lang === "es" ? "+2.4% este mes" : "+2.4% this month"}
                </div>
                <div className="mini-bars">
                  {[80, 85, 82, 90, 88, 95, 92, 99].map((h, i) => (
                    <div
                      key={i}
                      className={`bar${i === 7 ? " active-bar" : ""}`}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}