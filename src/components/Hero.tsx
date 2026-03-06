"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const words = [
  { text: "CONSTRUIMOS", color: "text-slate-900" },
  { text: "EL FUTURO", color: "text-blue-600" },
];
const wordsEn = [
  { text: "WE BUILD THE", color: "text-slate-900" },
  { text: "FUTURE", color: "text-blue-600" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // ── Staggered char reveal on load ──
      const chars = document.querySelectorAll(".hero-char");
      gsap.fromTo(
        chars,
        { y: 120, skewY: 8, opacity: 0 },
        {
          y: 0,
          skewY: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.04,
          ease: "power4.out",
          delay: 0.2,
        }
      );

      // Badge + sub + ctas fade up
      gsap.fromTo(
        [badgeRef.current, subRef.current, ctasRef.current],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.8,
        }
      );

      // ── Gravity parallax on scroll ──
      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
        y: 180,
        scale: 0.92,
        opacity: 0,
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const isEs =
    typeof navigator !== "undefined" &&
    navigator.language.toLowerCase().startsWith("es");

  const displayWords = isEs ? words : wordsEn;
  const subtitle = isEs
    ? "Plataformas web, apps móviles y automación con IA. Diseño premium, escalabilidad total."
    : "Web platforms, mobile apps and AI automation. Premium design, total scalability.";
  const badge = isEs ? "Disponible para nuevos proyectos" : "Available for new projects";
  const btnPrimary = isEs ? "Inicia tu proyecto" : "Start your project";
  const btnSec = isEs ? "Ver portfolio" : "See portfolio";
  const footerLeft = isEs ? "Estudio Digital ©2026" : "Digital Studio ©2026";
  const footerRight = isEs
    ? "Escalando proyectos al nivel exponencial."
    : "Scaling projects to the exponential level.";

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[110vh] flex flex-col items-center justify-center bg-white overflow-hidden px-6 pt-28 pb-20"
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none" />

      {/* Orb */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.07)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      <div ref={titleRef} className="relative z-10 w-full max-w-[1400px] mx-auto">

        {/* Badge */}
        <div ref={badgeRef} className="flex justify-center mb-10 opacity-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-5 py-2 text-xs font-semibold text-blue-700 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            {badge}
          </div>
        </div>

        {/* Oversized masked title */}
        <h1 className="text-center leading-none tracking-tighter text-[18vw] sm:text-[12vw] lg:text-[10vw] font-black uppercase select-none">
          {displayWords.map((line, li) => (
            <div key={li} className="overflow-hidden py-2">
              <span className={`inline-block ${line.color}`}>
                {line.text.split("").map((ch, ci) => (
                  <span
                    key={ci}
                    className="hero-char inline-block opacity-0"
                    style={{ display: ch === " " ? "inline" : "inline-block", whiteSpace: "pre" }}
                  >
                    {ch === " " ? "\u00A0" : ch}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </h1>

        {/* Sub + CTAs */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-8 max-w-5xl mx-auto opacity-0" ref={subRef}>
          <p className="text-slate-500 text-lg leading-relaxed max-w-sm">
            {subtitle}
          </p>
          <div ref={ctasRef} className="flex flex-wrap gap-4 shrink-0">
            <Link
              href="/estimate"
              data-cursor
              className="rounded-full bg-blue-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:scale-105 transition-all"
            >
              {btnPrimary} →
            </Link>
            <Link
              href="/portfolio"
              data-cursor
              className="rounded-full border border-slate-200 bg-white px-8 py-4 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 hover:scale-105 transition-all"
            >
              {btnSec}
            </Link>
          </div>
        </div>

        {/* Footer row */}
        <div className="mt-20 flex w-full justify-between items-end font-medium uppercase text-xs tracking-widest text-slate-400">
          <p>{footerLeft}</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg key={i} className="w-3.5 h-3.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-right max-w-[220px]">{footerRight}</p>
        </div>
      </div>
    </section>
  );
}