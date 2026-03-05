"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type LocalizedText = { es: string; en: string };

const stat_data = [
  { raw: 40, suffix: "+", label_es: "Proyectos", label_en: "Projects" },
  { raw: 99, suffix: "%", label_es: "Eficiencia", label_en: "Efficiency" },
  { raw: null, display: "24/7", label_es: "Disponibilidad", label_en: "Availability" },
  { raw: null, display: "∞", label_es: "Soporte sin límite", label_en: "Unlimited Support" },
];

function AnimatedStat({ stat, lang }: { stat: typeof stat_data[0]; lang: "en" | "es" }) {
  const ref = useRef<HTMLDivElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!ref.current || stat.raw === null) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: stat.raw!,
            duration: 2,
            ease: "power2.out",
            onUpdate() {
              if (ref.current) {
                ref.current.textContent = Math.round(obj.val) + (stat.suffix ?? "");
              }
            },
          });
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [stat]);

  return (
    <div className="bg-white px-8 py-10 text-center group hover:bg-slate-50 transition-colors">
      <div
        ref={ref}
        className="text-5xl font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors duration-300"
      >
        {stat.raw !== null ? "0" + (stat.suffix ?? "") : stat.display}
      </div>
      <div className="text-[10px] text-slate-400 mt-3 font-black uppercase tracking-[0.2em]">
        {lang === "es" ? stat.label_es : stat.label_en}
      </div>
    </div>
  );
}

const blocks_data = [
  { icon: "⚡", title_es: "Ingeniería Extrema", title_en: "Extreme Engineering", desc_es: "Transformamos ideas en soluciones ultrarrápidas con React Native, Next.js e IA.", desc_en: "We transform ideas into blazing-fast solutions using React Native, Next.js & AI." },
  { icon: "🤝", title_es: "Aliados Estratégicos", title_en: "Strategic Alliance", desc_es: "Nos convertimos en una extensión de tu equipo, desde el día uno.", desc_en: "We become an extension of your team from day one." },
  { icon: "📈", title_es: "Crecimiento Exponencial", title_en: "Exponential Growth", desc_es: "Sistemas modulares sin fricción, diseñados para escalar desde zero.", desc_en: "Friction-free modular systems, built to scale from zero." },
];

function MagneticCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useSpring(useMotionValue(0), { stiffness: 80, damping: 15 });
  const rotY = useSpring(useMotionValue(0), { stiffness: 80, damping: 15 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    rotX.set(-dy * 8);
    rotY.set(dx * 8);
  };

  const resetMouse = () => {
    rotX.set(0);
    rotY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.03 }}
      className={`perspective-[1200px] ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function AboutUs() {
  const [lang, setLang] = useState<"en" | "es">("en");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setLang(navigator.language.toLowerCase().startsWith("es") ? "es" : "en");
    }
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".about-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0, rotateX: -8 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const L = (es: string, en: string) => (lang === "es" ? es : en);

  return (
    <section ref={sectionRef} id="about" className="bg-white px-6 sm:px-10 lg:px-20 py-32 overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="about-reveal grid lg:grid-cols-2 gap-16 items-end mb-24 opacity-0">
          <div>
            <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-black tracking-[0.2em] uppercase mb-8 shadow-sm">
              {L("Sobre nosotros", "About us")}
            </span>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-slate-900 uppercase leading-none">
              {L("Equipo", "Small")}<br />
              {L("élite.", "team.")}<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
                {L("Output ∞", "Infinite output.")}
              </span>
            </h2>
          </div>
          <p className="text-slate-500 text-xl leading-relaxed lg:border-l border-slate-200 lg:pl-12">
            {L(
              "Estudio de ingeniería especializada en Nueva York. Fusionamos arquitectura limpia con diseño de élite para startups que exigen lo mejor.",
              "Specialized engineering studio based in New York. We fuse clean architecture with elite design for startups that demand the best."
            )}
          </p>
        </div>

        {/* Stats */}
        <div className="about-reveal grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-100 rounded-3xl overflow-hidden mb-24 border border-slate-100 opacity-0">
          {stat_data.map((s, i) => (
            <AnimatedStat key={i} stat={s} lang={lang} />
          ))}
        </div>

        {/* Magnetic 3D Blocks */}
        <div className="grid sm:grid-cols-3 gap-6">
          {blocks_data.map((block, i) => (
            <MagneticCard key={i} className="about-reveal opacity-0">
              <div className="group relative rounded-3xl border border-slate-200 bg-white p-10 shadow-sm cursor-none overflow-hidden h-full">
                <div className="absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r from-blue-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-2xl mb-8 group-hover:scale-110 transition-transform duration-300">
                  {block.icon}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight uppercase">
                  {lang === "es" ? block.title_es : block.title_en}
                </h3>
                <p className="text-slate-500 font-normal leading-relaxed text-base">
                  {lang === "es" ? block.desc_es : block.desc_en}
                </p>
              </div>
            </MagneticCard>
          ))}
        </div>

      </div>
    </section>
  );
}