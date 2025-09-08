"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
 
const features = [
  {
    title: "Universal Design",
    desc: "Optimized for mobile, desktop and everything in between.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8" />
      </svg>
    ),
  },
  {
    title: "Built for Scale",
    desc: "From MVPs to full production platforms.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 12h3l3 8 4-16 3 8h4" />
      </svg>
    ),
  },
  {
    title: "Realtime Experience",
    desc: "Lightning-fast UI and reactive architecture.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M11 2L1 21h22L13 2z" />
      </svg>
    ),
  },
  {
    title: "Full Stack Ready",
    desc: "Frontend meets backend with seamless data flow.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
];

const carouselImages = ["/1.png", "/2.jpg", "/3.jpg",  ];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % carouselImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 py-32 text-white">
      <div className="absolute inset-0 -z-10 bg-dot-white/[0.03] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid grid-cols-1 items-center gap-16 md:grid-cols-2">
          {/* TEXT SECTION */}
          <div className="text-start">
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl transition-all">
              Build modern apps for{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                web & mobile
              </span>
            </h1>
            <p className="mt-5 text-lg text-white/70 max-w-lg">
              From responsive UI to scalable APIs — everything you need to ship polished, powerful applications.
            </p>

            <ul className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {features.map((f) => (
                <li
                  key={f.title}
                  className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm backdrop-blur transition-all hover:scale-[1.02] hover:border-indigo-400/30 hover:shadow-lg"
                >
                  <div className="shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white/10 text-white ring-1 ring-inset ring-white/10 group-hover:ring-indigo-500 transition-all">
                      {f.icon}
                    </div>
                  </div>
                  <div>
                    <p className="text-base font-semibold text-white group-hover:text-indigo-300 transition">
                      {f.title}
                    </p>
                    <p className="mt-1 text-sm text-white/60">{f.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* CAROUSEL SECTION */}
          <div className="relative w-full max-w-xs mx-auto">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-xl shadow-emerald-400/5">
              <AnimatePresence mode="wait">
                <motion.img
                  key={carouselImages[index]}
                  src={carouselImages[index]}
                  alt={`Preview ${index + 1}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover rounded-[2rem]"
                />
              </AnimatePresence>
            </div>
            <div className="absolute top-2 left-2 flex gap-1">
              {carouselImages.map((_, i) => (
                <span
                  key={i}
                  className={`h-2 w-2 rounded-full transition-all ${
                    i === index ? "bg-white" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
            <p className="mt-4 text-center text-sm text-white/60">
              Smart preview — web & mobile experience
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
