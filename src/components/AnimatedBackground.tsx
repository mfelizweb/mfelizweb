"use client";

import { useEffect, useRef } from "react";

/**
 * AnimatedBackground — Aurora mesh gradient
 *
 * CSS-only + un canvas minimalista para las partículas.
 * Sin WebGL, sin Three.js — carga instantánea, 0 jank.
 * Inspirado en: Linear, Vercel, Resend.
 */
export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = 0, h = 0;

    /* ── Dots ── */
    const COUNT = 55;
    type Dot = { x: number; y: number; vx: number; vy: number; r: number };
    const dots: Dot[] = [];

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };

    const init = () => {
      dots.length = 0;
      for (let i = 0; i < COUNT; i++) {
        dots.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.5 + 0.8,
        });
      }
    };

    const LINK_DIST = 160;
    const DOT_COLOR = "rgba(99,102,241,";   // indigo
    const LINE_COLOR = "rgba(99,102,241,";

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      /* move */
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;
      }

      /* lines */
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.18;
            ctx.beginPath();
            ctx.strokeStyle = LINE_COLOR + alpha + ")";
            ctx.lineWidth = 0.8;
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }

      /* dots */
      for (const d of dots) {
        ctx.beginPath();
        ctx.fillStyle = DOT_COLOR + "0.35)";
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(() => { resize(); init(); });
    ro.observe(canvas);
    resize();
    init();
    draw();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <>
      {/* ── Aurora orbs (CSS-only) ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Orb 1 — indigo, top center */}
        <div
          className="absolute"
          style={{
            top: "-20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80vw",
            height: "80vw",
            maxWidth: 900,
            maxHeight: 900,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at center, rgba(99,102,241,0.13) 0%, transparent 65%)",
            animation: "orbFloat1 14s ease-in-out infinite",
          }}
        />

        {/* Orb 2 — violet, bottom right */}
        <div
          className="absolute"
          style={{
            bottom: "-10%",
            right: "-10%",
            width: "55vw",
            height: "55vw",
            maxWidth: 600,
            maxHeight: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at center, rgba(139,92,246,0.09) 0%, transparent 65%)",
            animation: "orbFloat2 18s ease-in-out infinite",
          }}
        />

        {/* Orb 3 — emerald accent, top left */}
        <div
          className="absolute"
          style={{
            top: "10%",
            left: "-8%",
            width: "35vw",
            height: "35vw",
            maxWidth: 400,
            maxHeight: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at center, rgba(16,185,129,0.07) 0%, transparent 65%)",
            animation: "orbFloat3 22s ease-in-out infinite",
          }}
        />

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ── Particle canvas ── */}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 w-full h-full"
        style={{ opacity: 0.7 }}
      />

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes orbFloat1 {
          0%,100% { transform: translateX(-50%) translateY(0px)   scale(1);    }
          33%      { transform: translateX(-50%) translateY(-30px) scale(1.04); }
          66%      { transform: translateX(-50%) translateY(15px)  scale(0.97); }
        }
        @keyframes orbFloat2 {
          0%,100% { transform: translate(0,    0)    scale(1);    }
          40%      { transform: translate(-40px,-30px) scale(1.06); }
          70%      { transform: translate(20px,  20px) scale(0.95); }
        }
        @keyframes orbFloat3 {
          0%,100% { transform: translate(0,  0)    scale(1);    }
          50%      { transform: translate(30px,40px) scale(1.08); }
        }
      `}</style>
    </>
  );
}