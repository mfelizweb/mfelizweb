"use client";

import { useEffect, useState, useRef } from "react";

/* ─── App data ────────────────────────────────────────────────── */
const apps = [
    {
        name: "OSHA Coach Exam Prep",
        emoji: "🦺",
        tag: "Safety Certification",
        gradient: "from-orange-500 to-red-600",
        shadow: "shadow-orange-500/25",
        hook: "Aprueba tu examen OSHA 10 o 30.",
        hookBold: "Preguntas reales, sin relleno",
        ios: "https://apps.apple.com/us/app/osha-coach-exam-prep/id6754949726",
        android: "https://play.google.com/store/apps/details?id=com.mfelizweb.osha",
    },
    {
        name: "EPA 608 HVAC Coach",
        emoji: "❄️",
        tag: "HVAC Certification",
        gradient: "from-cyan-400 to-blue-600",
        shadow: "shadow-cyan-500/25",
        hook: "Certifícate EPA en HVAC.",
        hookBold: "Estudia más inteligente",
        ios: "https://apps.apple.com/us/app/epa-608-hvac-coach/id6756268970",
        android: "https://play.google.com/store/apps/details?id=com.mfelizweb.hvacepa",
    },
    {
        name: "CDL Coach 2026: Exam Prep",
        emoji: "🚛",
        tag: "Driver's License",
        gradient: "from-amber-400 to-orange-600",
        shadow: "shadow-amber-500/25",
        hook: "Obtén tu Licencia Comercial de Conducir.",
        hookBold: "Domina el examen CDL",
        ios: "https://apps.apple.com/us/app/cdl-coach-dmv-cdl-exam/id6751507700",
        android: "https://play.google.com/store/apps/details?id=com.mfelizweb.cdl",
    },
    {
        name: "TSA CBT Test Coach",
        emoji: "✈️",
        tag: "Airport Security",
        gradient: "from-indigo-500 to-violet-700",
        shadow: "shadow-indigo-500/25",
        hook: "El trabajo en TSA está a tu alcance.",
        hookBold: "Prepárate para el CBT",
        ios: "https://apps.apple.com/us/app/tsa-cbt-test-coach/id6756675433",
        android: "https://play.google.com/store/apps/details?id=com.mfelizweb.tsa",
    },
    {
        name: "ASVAB Military Coach",
        emoji: "🎖️",
        tag: "Military Enlistment",
        gradient: "from-emerald-600 to-teal-800",
        shadow: "shadow-emerald-600/25",
        hook: "Sirve a tu país.",
        hookBold: "Maximiza tu puntaje ASVAB",
        ios: "https://apps.apple.com/us/app/asvab-military-coach/id6758910946",
        android: "https://play.google.com/store/apps/details?id=com.mfelizweb.asvab",
    },
    {
        name: "Citizenship Test Coach",
        emoji: "🗽",
        tag: "US Citizenship",
        gradient: "from-violet-500 to-purple-700",
        shadow: "shadow-violet-500/25",
        hook: "Tu sueño americano empieza aquí.",
        hookBold: "Estudia las 100 preguntas cívicas",
        ios: "https://apps.apple.com/us/app/citizenship-test-coach/id6758256024",
        android: "https://play.google.com/store/apps/details?id=com.mfelizweb.Citizenship",
    },
    {
        name: "USPS 474 Exam Prep",
        emoji: "📦",
        tag: "Postal Service",
        gradient: "from-blue-700 to-red-600",
        shadow: "shadow-blue-500/25",
        hook: "Trabaja en el servicio postal.",
        hookBold: "Domina el Virtual Entry Assessment",
        ios: "https://apps.apple.com/us/app/usps-474-exam-prep/id6759227077",
        android: "https://play.google.com/store/apps/details?id=com.mfelizweb.usps474",
    },
    {
        name: "Elite 1099",
        emoji: "📊",
        tag: "Tax & Finance",
        gradient: "from-slate-700 to-slate-900",
        shadow: "shadow-slate-500/25",
        hook: "Control total para freelancers.",
        hookBold: "Optimiza tus impuestos",
        ios: "https://apps.apple.com/us/app/elite-1099/id6755654155",
        android: "https://play.google.com/store/apps/details?id=com.mfelizweb.michequeusa",
    },
    {
        name: "Electrician Journeyman Prep",
        emoji: "⚡",
        tag: "Electrical Trade",
        gradient: "from-yellow-400 to-yellow-600",
        shadow: "shadow-yellow-500/25",
        hook: "Conviértete en Journeyman Electrician.",
        hookBold: "Basado en el NEC 2024",
        ios: "https://apps.apple.com/us/app/electrician-journeyman-prep/id6759814515",
        android: "https://play.google.com/store/apps/details?id=com.mfelizweb.electric",
    },
    {
        name: "NY Real Estate Exam Coach",
        emoji: "🏠",
        tag: "Real Estate License",
        gradient: "from-rose-500 to-pink-600",
        shadow: "shadow-rose-500/25",
        hook: "Tu licencia de Real Estate en NY.",
        hookBold: "Pasa el examen a la primera",
        ios: "https://apps.apple.com/us/app/ny-real-estate-exam-coach-2026/id6761790218",
        android: "https://play.google.com/store/apps/details?id=com.mfelizweb.realstate",
    },
    {
        name: "Pesticide Applicator Coach",
        emoji: "🌿",
        tag: "Pesticide License",
        gradient: "from-lime-500 to-green-600",
        shadow: "shadow-lime-500/25",
        hook: "Certifícate como Aplicador de Pesticidas.",
        hookBold: "Estudio enfocado y efectivo",
        ios: "https://apps.apple.com/us/app/pesticide-applicator-coach/id6760911378",
        android: "https://play.google.com/store/apps/details?id=com.mfelizweb.pesticide",
    },
];

/* ─── Icons ───────────────────────────────────────────────────── */
function AppleIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px]">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
    );
}

function AndroidIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px]">
            <path d="M6.18 15.64a2.18 2.18 0 0 1-2.18-2.18V9.76a2.18 2.18 0 1 1 4.36 0v3.7a2.18 2.18 0 0 1-2.18 2.18zm11.64 0a2.18 2.18 0 0 1-2.18-2.18V9.76a2.18 2.18 0 1 1 4.36 0v3.7a2.18 2.18 0 0 1-2.18 2.18zM6.73 6.46l.96-1.73A.35.35 0 0 0 7.08 4a.35.35 0 0 0-.47.13L5.6 5.88a6.06 6.06 0 0 0-1.94 1.74h12.68a6.06 6.06 0 0 0-1.94-1.74L13.4 4.13A.35.35 0 0 0 12.92 4a.35.35 0 0 0-.13.47l.96 1.73H6.73zM9.5 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm6 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 9.5v4a1 1 0 0 0 1 1v3.18a1.32 1.32 0 0 0 2.64 0V14.5h4.72v3.18a1.32 1.32 0 0 0 2.64 0V14.5a1 1 0 0 0 1-1v-4H4z" />
        </svg>
    );
}

/* ─── App Card ────────────────────────────────────────────────── */
function AppCard({ app, index }: { app: (typeof apps)[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const [pressed, setPressed] = useState<null | "ios" | "android">(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
            { threshold: 0.08 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${index * 55}ms` }}
            className={`relative rounded-2xl overflow-hidden transition-all duration-500
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
            {/* Card glassmorphism bg */}
            <div className="absolute inset-0 bg-white/[0.045] backdrop-blur-sm border border-white/[0.09] rounded-2xl" />

            {/* Gradient top bar */}
            <div className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r ${app.gradient}`} />

            <div className="relative p-4 flex gap-3.5">
                {/* Emoji icon */}
                <div className={`w-11 h-11 rounded-[13px] bg-gradient-to-br ${app.gradient} ${app.shadow} shadow-lg
          flex items-center justify-center text-[22px] flex-shrink-0 select-none`}>
                    {app.emoji}
                </div>

                {/* Text + CTA */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-0.5">
                        <h2 className="text-white font-bold text-[13.5px] leading-tight">{app.name}</h2>
                        <span className="text-[9px] font-black uppercase tracking-widest text-white/30 whitespace-nowrap pt-0.5">{app.tag}</span>
                    </div>
                    <p className="text-white/45 text-[11.5px] leading-snug mb-3">
                        {app.hook}{" "}
                        <span className="text-white/70 font-semibold">{app.hookBold}</span>
                    </p>

                    {/* Store buttons */}
                    <div className="flex gap-2">
                        <a
                            href={app.ios}
                            target="_blank"
                            rel="noopener noreferrer"
                            onPointerDown={() => setPressed("ios")}
                            onPointerUp={() => setPressed(null)}
                            onPointerLeave={() => setPressed(null)}
                            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl
                bg-white/[0.07] border border-white/[0.12] text-white text-[11.5px] font-bold
                transition-all duration-150
                ${pressed === "ios" ? "scale-95 bg-white/[0.12]" : "hover:bg-white/[0.11] active:scale-95"}`}
                        >
                            <AppleIcon />
                            App Store
                        </a>
                        <a
                            href={app.android}
                            target="_blank"
                            rel="noopener noreferrer"
                            onPointerDown={() => setPressed("android")}
                            onPointerUp={() => setPressed(null)}
                            onPointerLeave={() => setPressed(null)}
                            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl
                border text-[11.5px] font-bold transition-all duration-150
                bg-gradient-to-br ${app.gradient} bg-opacity-20 border-white/[0.1] text-white
                ${pressed === "android" ? "scale-95 opacity-80" : "hover:border-white/20 active:scale-95"}`}
                        >
                            <AndroidIcon />
                            Play Store
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─── Main Page ───────────────────────────────────────────────── */
/* ─── Main Page ───────────────────────────────────────────────── */
export default function LinksDeAppsPage() {
    const [mounted, setMounted] = useState(false);
    // 1. Añadimos un nuevo estado para guardar las apps desordenadas
    const [shuffledApps, setShuffledApps] = useState(apps);

    useEffect(() => {
        setMounted(true);

        // 2. Función para desordenar el array (Fisher-Yates)
        const shuffleArray = (array: typeof apps) => {
            const newArray = [...array];
            for (let i = newArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
            }
            return newArray;
        };

        // 3. Aplicamos el orden aleatorio al montar la página
        setShuffledApps(shuffleArray(apps));
    }, []);

    return (
        <>
            {/* Global font */}
            {/* ... TODO TU CSS SE QUEDA EXACTAMENTE IGUAL AQUÍ ... */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
        * { -webkit-tap-highlight-color: transparent; }

        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -30px) scale(1.05); }
          66% { transform: translate(-15px, 15px) scale(0.96); }
        }
        .blob { animation: blob 8s ease-in-out infinite; }
        .blob-2 { animation: blob 10s ease-in-out infinite; animation-delay: -2.5s; }
        .blob-3 { animation: blob 12s ease-in-out infinite; animation-delay: -5s; }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #34d399 0%, #67e8f9 25%, #a78bfa 50%, #67e8f9 75%, #34d399 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .float { animation: float 3s ease-in-out infinite; }
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.6; }
          70%, 100% { transform: scale(2.2); opacity: 0; }
        }
        .ping-slow { animation: ping-slow 2s cubic-bezier(0,0,0.2,1) infinite; }
      `}</style>

            <div className="min-h-screen bg-[#06080f] text-white overflow-x-hidden">

                {/* ── Animated background ── */}
                <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.015]"
                        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "150px" }} />
                    <div className="blob absolute top-[-80px] left-[-40px] w-80 h-80 rounded-full bg-emerald-500/[0.12] blur-3xl" />
                    <div className="blob-2 absolute top-1/3 right-[-60px] w-72 h-72 rounded-full bg-violet-500/[0.1] blur-3xl" />
                    <div className="blob-3 absolute bottom-0 left-1/3 w-96 h-64 rounded-full bg-cyan-500/[0.07] blur-3xl" />
                </div>

                {/* ── Content ── */}
                <div className="relative z-10 max-w-[420px] mx-auto px-4 pt-10 pb-16">

                    {/* Header */}
                    <div className={`text-center mb-8 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
                        <div className="relative inline-block mb-5 float">
                            <div className="w-[72px] h-[72px] rounded-[22px] bg-gradient-to-br from-emerald-400 to-cyan-500
                flex items-center justify-center text-3xl shadow-2xl shadow-emerald-500/30 mx-auto">
                                📱
                            </div>
                            <span className="absolute -top-1 -right-1 flex h-4 w-4">
                                <span className="ping-slow absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                                <span className="relative inline-flex h-4 w-4 rounded-full bg-emerald-400 border-2 border-[#06080f]" />
                            </span>
                        </div>

                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
              border border-white/[0.1] bg-white/[0.04] mb-4">
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/50">MFelizWeb</span>
                            <span className="w-px h-3 bg-white/20" />
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400">Apps</span>
                        </div>

                        <h1 className="text-[28px] sm:text-[32px] font-black leading-tight tracking-tight mb-3">
                            <span className="text-white">Certifícate.</span>{" "}
                            <br />
                            <span className="shimmer-text">Avanza. Conquista.</span>
                        </h1>

                        <p className="text-white/40 text-[13px] leading-relaxed max-w-[280px] mx-auto">
                            Apps de estudio para exámenes reales.{" "}
                            <span className="text-emerald-400 font-semibold">Miles ya aprobaron</span> — ahora es tu turno.
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex-1 h-px bg-white/[0.07]" />
                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/25 font-bold">Mis Apps</span>
                        <div className="flex-1 h-px bg-white/[0.07]" />
                    </div>

                    {/* 4. AQUI ESTÁ EL CAMBIO CLAVE: Cambiamos 'apps' por 'shuffledApps' en el map */}
                    <div className="flex flex-col gap-3">
                        {shuffledApps.map((app, i) => (
                            <AppCard key={app.name} app={app} index={i} />
                        ))}
                    </div>

                    {/* Website CTA */}
                    <div className={`mt-8 transition-all duration-700 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                        <a
                            href="https://mfelizweb.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between w-full rounded-2xl border border-white/[0.09]
                bg-white/[0.04] px-4 py-3.5 group hover:border-emerald-400/30 hover:bg-white/[0.07]
                transition-all duration-200 active:scale-[0.98]"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-lg">🌐</span>
                                <div>
                                    <div className="text-white text-[12.5px] font-bold leading-tight">MFelizWeb.com</div>
                                    <div className="text-white/35 text-[10.5px]">Desarrollo de Apps & Webs</div>
                                </div>
                            </div>
                            <svg className="w-4 h-4 text-white/30 group-hover:text-emerald-400 transition-colors -rotate-45 group-hover:rotate-0 transition-transform duration-300"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                    </div>

                    {/* Footer */}
                    <p className="text-center text-white/[0.18] text-[10px] mt-8 tracking-widest uppercase">
                        MFelizWeb © 2026 · Creado con 🚀
                    </p>
                </div>
            </div>
        </>
    );
}