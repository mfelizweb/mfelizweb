"use client";
import { span } from "framer-motion/client";
import { useEffect, useState, useRef } from "react";

export default function NFCServicePage() {
  const [lang, setLang] = useState<"es" | "en">("en");
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setLang(navigator.language.startsWith("es") ? "es" : "en");
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const texts = {
    es: {
      eyebrow: "Tecnología NFC",
      title: "Tu red profesional,\nen un toque.",
      subtitle:
        "Una tarjeta inteligente que reemplaza los papeles, impresiona en cualquier reunión y nunca caduca.",
      items: [
        { icon: "✦", label: "Perfil siempre actualizado", desc: "Edita tu info en tiempo real desde el panel" },
        { icon: "⚡", label: "Acciones al instante", desc: "WhatsApp, llamada, pago, redes — un toque" },
        { icon: "◈", label: "Analíticas de alcance", desc: "Rastrea quién escaneó tu tarjeta y cuándo" },
        { icon: "∞", label: "Para toda la vida", desc: "Una sola tarjeta, sin reimpresión jamás" },
      ],
      cta: "Solicita tu tarjeta",
      badge: "Sin papel · Sin límites",
    },
    en: {
      eyebrow: "NFC Technology",
      title: "Your network,\nat a tap.",
      subtitle:
        "One smart card that replaces paper, impresses in any room, and never expires.",
      items: [
        { icon: "✦", label: "Always current profile", desc: "Edit your info in real-time from the dashboard" },
        { icon: "⚡", label: "Instant actions", desc: "WhatsApp, call, payment, socials — one tap" },
        { icon: "◈", label: "Reach analytics", desc: "Track who scanned your card and when" },
        { icon: "∞", label: "Yours for life", desc: "One card, never reprint" },
      ],
      cta: "Get Your Smart Card",
      badge: "Paperless · Limitless",
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

        .nfc-root {
          font-family: 'DM Sans', sans-serif;
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
          overflow-x: hidden;
          position: relative;
        }

        /* ambient glow */
        .nfc-root::before {
          content: '';
          position: fixed;
          top: -20%;
          left: 50%;
          transform: translateX(-50%);
          width: 900px;
          height: 500px;
          background: radial-gradient(ellipse, rgba(0,229,160,0.08) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .nfc-root::after {
          content: '';
          position: fixed;
          bottom: -10%;
          right: -10%;
          width: 600px;
          height: 600px;
          background: radial-gradient(ellipse, rgba(100,80,255,0.06) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
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
          .card-col { order: -1; }
        }

        /* ── LEFT COLUMN ── */
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
          font-size: clamp(38px, 5vw, 58px);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.02em;
          white-space: pre-line;
          opacity: 0;
          animation: fadeUp 0.6s ease 0.2s forwards;
        }

        .headline em {
          font-style: normal;
          background: linear-gradient(135deg, var(--accent), #80ffcc);
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

        /* ── BENEFITS LIST ── */
        .items {
          margin-top: 40px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 18px;
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
          border-color: rgba(0,229,160,0.3);
          background: var(--accent-dim);
          transform: translateX(4px);
        }

        .item-icon {
          font-size: 18px;
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

        /* ── CTA ── */
        .cta-row {
          margin-top: 40px;
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
          color: #020a06;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.03em;
          padding: 14px 28px;
          border-radius: 999px;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 0 0 rgba(0,229,160,0);
        }

        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0,229,160,0.35);
        }

        .cta-btn svg { width: 16px; height: 16px; }

        .badge {
          font-size: 11px;
          color: var(--muted);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 300;
        }

        /* ── CARD COLUMN ── */
        .card-col {
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          animation: fadeIn 0.8s ease 0.5s forwards;
        }

        .card-scene {
          perspective: 900px;
          width: 340px;
          height: 220px;
        }

        .card-3d {
          width: 100%;
          height: 100%;
          border-radius: 20px;
          background: linear-gradient(135deg, #111820 0%, #182030 40%, #0d1a24 100%);
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow:
            0 0 0 1px rgba(0,229,160,0.15),
            0 40px 80px rgba(0,0,0,0.6),
            inset 0 1px 0 rgba(255,255,255,0.08);
          transition: transform 0.15s ease-out, box-shadow 0.15s;
          position: relative;
          overflow: hidden;
          padding: 28px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        /* shimmer overlay */
        .card-3d::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 30%,
            rgba(255,255,255,0.04) 50%,
            transparent 70%
          );
          pointer-events: none;
        }

        /* NFC wave decoration */
        .card-nfc-waves {
          position: absolute;
          right: 24px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          gap: 4px;
          align-items: center;
        }

        .wave {
          border: 1.5px solid rgba(0,229,160,0.35);
          border-radius: 50%;
          animation: pulse 2.4s ease-in-out infinite;
        }

        .wave:nth-child(1) { width: 12px; height: 12px; animation-delay: 0s; }
        .wave:nth-child(2) { width: 22px; height: 22px; animation-delay: 0.3s; }
        .wave:nth-child(3) { width: 34px; height: 34px; animation-delay: 0.6s; }

        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(0.95); }
          50% { opacity: 0.7; transform: scale(1); }
        }

        .card-top { display: flex; flex-direction: column; gap: 4px; }
        .card-chip {
          width: 38px;
          height: 28px;
          border-radius: 6px;
          background: linear-gradient(135deg, #c8a95a, #f0d080, #b89040);
          box-shadow: 0 2px 8px rgba(0,0,0,0.4);
          margin-bottom: 6px;
          position: relative;
          overflow: hidden;
        }

        .card-chip::after {
          content: '';
          position: absolute;
          inset: 4px;
          border: 1px solid rgba(0,0,0,0.2);
          border-radius: 3px;
        }

        .card-name {
          font-family: 'Syne', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.05em;
        }

        .card-title-text {
          font-size: 11px;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .card-bottom {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .card-links {
          display: flex;
          gap: 8px;
        }

        .card-link-pill {
          font-size: 10px;
          padding: 4px 10px;
          border-radius: 999px;
          border: 1px solid rgba(0,229,160,0.3);
          color: var(--accent);
          letter-spacing: 0.06em;
          font-family: 'Syne', sans-serif;
          font-weight: 600;
        }

        .card-tap-hint {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .tap-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          animation: blink 1.8s ease-in-out infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; box-shadow: 0 0 8px var(--accent); }
        }

        /* card glow on hover */
        .card-scene:hover .card-3d {
          box-shadow:
            0 0 0 1px rgba(0,229,160,0.4),
            0 50px 100px rgba(0,0,0,0.7),
            0 0 60px rgba(0,229,160,0.1),
            inset 0 1px 0 rgba(255,255,255,0.1);
        }

        /* ── DECORATIVE GRID ── */
        .grid-bg {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          z-index: 0;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent);
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

      <div className="nfc-root">
        <div className="grid-bg" />

        <div className="container">
          {/* ── LEFT COLUMN ── */}
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
              <span className="badge">{t.badge}</span>
            </div>
          </div>

          {/* ── CARD COLUMN ── */}
          <div className="card-col">
            <div
              className="card-scene"
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className="card-3d"
                style={{
                  transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                }}
              >
                {/* NFC waves */}
                <div className="card-nfc-waves">
                  <div className="wave" />
                  <div className="wave" />
                  <div className="wave" />
                </div>

                <div className="card-top">
                  <div className="card-chip" />
                  <p className="card-name">Alex Rivera</p>
                  <p className="card-title-text">Product Designer · Studio AX</p>
                </div>

                <div className="card-bottom">
                  <div className="card-links">
                    <span className="card-link-pill">WhatsApp</span>
                    <span className="card-link-pill">LinkedIn</span>
                    <span className="card-link-pill">Pay</span>
                  </div>
                  <div className="card-tap-hint">
                    <span className="tap-dot" />
                    Tap
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}