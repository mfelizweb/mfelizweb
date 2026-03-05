"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Lang = "es" | "en";

interface Feature {
    icon: string;
    title: string;
    desc: string;
}

interface ServiceDetailLayoutProps {
    serviceKey: string;   // matches ?service= param
    accentColor: string;  // tailwind color like "blue" | "indigo" | "emerald" etc
    emoji: string;
    title: { es: string; en: string };
    subtitle: { es: string; en: string };
    features: { es: Feature[]; en: Feature[] };
    included: { es: string[]; en: string[] };
    cta?: { es: string; en: string };
    extraBadges?: string[];
}

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.55, ease: "easeOut" as const, delay: i * 0.07 },
    }),
};

export default function ServiceDetailLayout({
    serviceKey, accentColor, emoji,
    title, subtitle, features, included,
    cta, extraBadges,
}: ServiceDetailLayoutProps) {
    const [lang, setLang] = useState<Lang>("en");

    useEffect(() => {
        if (typeof navigator !== "undefined")
            setLang(navigator.language.toLowerCase().startsWith("es") ? "es" : "en");
    }, []);

    const L = (es: string, en: string) => lang === "es" ? es : en;
    const t = {
        features: features[lang],
        included: included[lang],
        cta: cta ? cta[lang] : L("Iniciar proyecto →", "Start project →"),
        ctaSub: L("Sin compromiso · Respuesta en 24 h", "No commitment · Reply within 24 h"),
    };

    const plannerUrl = `/estimate?service=${serviceKey}`;

    return (
        <main className="relative bg-white min-h-screen overflow-hidden">
            {/* Subtle grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none" />
            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.06)_0%,transparent_70%)] pointer-events-none" />

            <section className="relative max-w-5xl mx-auto px-6 py-28">

                {/* ── Breadcrumb ── */}
                <motion.div
                    variants={fadeUp} initial="hidden" animate="visible" custom={0}
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-slate-400 mb-10"
                >
                    <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/services" className="hover:text-blue-600 transition-colors">Services</Link>
                    <span>/</span>
                    <span className="text-slate-600">{title[lang]}</span>
                </motion.div>

                {/* ── Hero ── */}
                <motion.div
                    variants={fadeUp} initial="hidden" animate="visible" custom={1}
                    className="mb-20"
                >
                    <div className="inline-flex items-center gap-3 mb-6">
                        <span className="text-4xl">{emoji}</span>
                        <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-black tracking-[0.2em] uppercase shadow-sm">
                            {L("Servicio", "Service")}
                        </span>
                    </div>

                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-none text-slate-900 mb-6">
                        {title[lang].split(" ").slice(0, -1).join(" ")}{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
                            {title[lang].split(" ").at(-1)}
                        </span>
                    </h1>

                    <p className="text-xl text-slate-500 max-w-2xl leading-relaxed font-light">
                        {subtitle[lang]}
                    </p>

                    {/* Extra badges (iOS, Android, etc.) */}
                    {extraBadges && extraBadges.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-6">
                            {extraBadges.map((b, i) => (
                                <span key={i} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-bold text-slate-600 shadow-sm">
                                    {b}
                                </span>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* ── Features grid ── */}
                <div className="mb-12">
                    <motion.p
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
                        className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8"
                    >
                        {L("¿Qué incluye?", "What's included?")}
                    </motion.p>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {t.features.map((f, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp} initial="hidden" whileInView="visible"
                                viewport={{ once: true }} custom={i * 0.5}
                                className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-5
                           hover:border-blue-300 hover:bg-blue-50/30 hover:shadow-md hover:-translate-y-0.5
                           transition-all duration-300 overflow-hidden relative"
                            >
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
                                <div className="text-2xl shrink-0 mt-0.5">{f.icon}</div>
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-tight text-slate-900 mb-1">{f.title}</h3>
                                    <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* ── Also included strip ── */}
                <motion.div
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-cyan-50/40 px-8 py-6 mb-16"
                >
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-4">
                        {L("También incluye", "Also includes")}
                    </p>
                    <div className="flex flex-wrap gap-x-8 gap-y-3">
                        {t.included.map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                                <svg className="w-4 h-4 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                                {item}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* ── CTA ── */}
                <motion.div
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    className="relative rounded-[2.5rem] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-8 py-16 sm:px-16 text-center overflow-hidden shadow-xl shadow-blue-900/5"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05)_0%,transparent_70%)]" />
                    <div className="relative z-10">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-4">
                            {L("¿Listo?", "Ready?")}
                        </p>
                        <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-slate-900 mb-5">
                            {L("Hablemos de tu proyecto", "Let's talk about your project")}
                        </h2>
                        <p className="text-slate-500 mb-10 max-w-lg mx-auto">
                            {t.ctaSub}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href={plannerUrl}
                                className="rounded-full bg-blue-600 px-10 py-4 text-sm font-black uppercase tracking-widest text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:scale-105 transition-all"
                            >
                                {t.cta}
                            </Link>
                            <a
                                href="https://wa.me/19292406734"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-10 py-4 text-sm font-black uppercase tracking-widest text-blue-700 shadow-sm hover:bg-blue-50 hover:scale-105 transition-all"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                                </svg>
                                WhatsApp
                            </a>
                        </div>
                    </div>
                </motion.div>

            </section>
        </main>
    );
}
