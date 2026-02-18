"use client";

import { useEffect, useState, useRef } from "react";

const apps = [
    {
        name: "OSHA Coach Exam Prep",
        emoji: "🦺",
        gradient: "from-orange-600 to-red-700",
        hook: "Aprueba tu examen OSHA 10 o 30.",
        hookBold: "Preguntas reales, sin relleno",
        hookEnd: "— estudia en tu hora de almuerzo.",
        ios: "https://apps.apple.com/us/app/osha-coach-exam-prep/id6754949726",
        android: "https://play.google.com/store/apps/details?id=com.mfelizweb.osha",
    },
    {
        name: "EPA 608 HVAC Coach",
        emoji: "❄️",
        gradient: "from-cyan-500 to-blue-700",
        hook: "Certifícate EPA en HVAC.",
        hookBold: "Estudia más inteligente",
        hookEnd: " con exámenes completos y explicaciones al instante.",
        ios: "https://apps.apple.com/us/app/epa-608-hvac-coach/id6756268970",
        android: "https://play.google.com/store/apps/details?id=com.mfelizweb.hvacepa",
    },
    {
        name: "CDL Coach DMV",
        emoji: "🚛",
        gradient: "from-amber-500 to-orange-600",
        hook: "Obtén tu Licencia Comercial de Conducir.",
        hookBold: "Domina el examen CDL",
        hookEnd: " con preguntas reales y escenarios de manejo.",
        ios: "https://apps.apple.com/us/app/cdl-coach-dmv-cdl-exam/id6751507700",
        android: "https://play.google.com/store/apps/details?id=com.mfelizweb.cdl",
    },
    {
        name: "TSA CBT Test Coach",
        emoji: "✈️",
        gradient: "from-indigo-500 to-violet-800",
        hook: "El trabajo en TSA está a tu alcance.",
        hookBold: "Prepárate para el CBT",
        hookEnd: " con práctica de rayos X y simulaciones reales.",
        ios: "https://apps.apple.com/us/app/tsa-cbt-test-coach/id6756675433",
        android: "https://play.google.com/store/apps/details?id=com.mfelizweb.tsa",
    },
    {
        name: "ASVAB Military Coach",
        emoji: "🎖️",
        gradient: "from-emerald-700 to-green-900",
        hook: "Sirve a tu país.",
        hookBold: "Maximiza tu puntaje ASVAB",
        hookEnd: " y califica para la rama y el rol que quieres.",
        ios: "https://apps.apple.com/us/app/asvab-military-coach/id6758910946",
        android: "https://play.google.com/store/apps/details?id=com.mfelizweb.asvab",
    },
    {
        name: "Citizenship Test Coach",
        emoji: "🗽",
        gradient: "from-purple-500 to-violet-700",
        hook: "Tu sueño americano empieza aquí.",
        hookBold: "Estudia las 100 preguntas cívicas",
        hookEnd: " y aprueba con confianza.",
        ios: "https://apps.apple.com/us/app/citizenship-test-coach/id6758256024",
        android: "https://play.google.com/store/apps/details?id=com.mfelizweb.Citizenship",
    },
];

function AppleIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
    );
}

function AndroidIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M17.523 15.341l.002.002L20 13.585l-2.477-1.757-.002.002A6.98 6.98 0 0117 14c0 .478-.052.944-.477 1.341zM3.067 7.5A2 2 0 002 9.25v5.5A2 2 0 003.067 16.5L10 12.5 3.067 7.5zM14.455 11.07l2.146-1.521L12.545 7H12v10h.545l4.056-2.549-2.146-1.52V11.07zM10 7.5H6l4 2.833V7.5z" />
        </svg>
    );
}

function AppCard({ app, index }: { app: (typeof apps)[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${index * 60}ms` }}
            className={`group relative bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 
        transition-all duration-500 hover:-translate-y-1 hover:border-emerald-400/30 
        hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
            {/* top accent line on hover */}
            <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="flex items-center gap-4 mb-4">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-[14px] bg-gradient-to-br ${app.gradient} flex items-center justify-center text-2xl flex-shrink-0 shadow-lg`}>
                    {app.emoji}
                </div>
                <div>
                    <h2 className="font-bold text-white text-[15px] leading-tight mb-1">{app.name}</h2>
                    <p className="text-white/50 text-[12.5px] leading-snug">
                        {app.hook} <strong className="text-emerald-400 font-semibold">{app.hookBold}</strong>{app.hookEnd}
                    </p>
                </div>
            </div>

            <div className="flex gap-2.5">
                <a
                    href={app.ios}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
            bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-semibold
            hover:bg-white/[0.12] transition-all duration-200 active:scale-95"
                >
                    <AppleIcon />
                    iPhone / iPad
                </a>
                <a
                    href={app.android}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
            bg-emerald-400/10 border border-emerald-400/25 text-emerald-400 text-[13px] font-semibold
            hover:bg-emerald-400/20 transition-all duration-200 active:scale-95"
                >
                    <AndroidIcon />
                    Android
                </a>
            </div>
        </div>
    );
}

export default function LinksDeAppaPage() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    return (
        <div className="min-h-screen bg-[#080b14] text-white overflow-x-hidden">
            {/* Ambient background blobs */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-violet-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-[480px] mx-auto px-5 pt-12 pb-16">
                {/* Header */}
                <div
                    className={`text-center mb-10 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/8 mb-5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase">MFelizWeb Apps</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-[32px] sm:text-4xl font-black leading-[1.1] mb-3 tracking-tight">
                        <span className="text-white">Una app.</span>
                        <br />
                        <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                            Tu examen. Conquistado.
                        </span>
                    </h1>

                    <p className="text-white/50 text-[15px] leading-relaxed max-w-xs mx-auto">
                        Preguntas reales, resultados comprobados.{" "}
                        <span className="text-emerald-400 font-semibold">Miles ya aprobaron</span> — tú eres el próximo.
                    </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

                {/* App cards */}
                <div className="flex flex-col gap-3.5">
                    {apps.map((app, i) => (
                        <AppCard key={app.name} app={app} index={i} />
                    ))}
                </div>

                {/* Footer */}
                <p className="text-center text-white/25 text-xs mt-12">
                    MFelizWeb © 2026 · Creado para ayudarte a subir de nivel 🚀
                </p>
            </div>
        </div>
    );
}