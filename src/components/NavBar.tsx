"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const labels = {
  en: {
    home: "Home",
    services: "Services",
    portfolio: "Portfolio",
    contact: "Contact",
    estimate: "Get Estimate",
  },
  es: {
    home: "Inicio",
    services: "Servicios",
    portfolio: "Portafolio",
    contact: "Contacto",
    estimate: "Solicitar Estimado",
  },
};

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"en" | "es">("en");

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setLang(navigator.language.startsWith("es") ? "es" : "en");
    }
  }, []);

  const t = labels[lang];

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md dark:bg-[#0b0f14]/70 border-b border-slate-200/50 dark:border-slate-700/50">
      <div className="mx-auto max-w-7xl h-16 flex items-center justify-between">
        <div className="pl-2">
          <Link href="/" className="flex items-center font-semibold text-xl tracking-tight">
            <Image
              src="/mfelizweb.png"
              alt="mfelizweb"
              width={120}
              height={32}
              priority
              className="h-8 w-auto"
            />
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="hover:opacity-80">{t.home}</Link>
          <Link href="/services" className="hover:opacity-80">{t.services}</Link>
          <Link href="/portfolio" className="hover:opacity-80">{t.portfolio}</Link>
          <Link href="/contact" className="hover:opacity-80">{t.contact}</Link>
          <Link
            href="/estimate"
            className="rounded-full px-4 py-2 bg-slate-900 text-white dark:bg-white dark:text-black hover:opacity-90"
          >
            {t.estimate}
          </Link>
        </nav>

        <button
          className="md:hidden p-2 rounded-md border"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          ☰
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="md:hidden border-t"
        >
          <div className="mx-auto max-w-7xl px-4 py-4 flex flex-col gap-3">
            <Link href="/" onClick={() => setOpen(false)}>{t.home}</Link>
            <Link href="/services" onClick={() => setOpen(false)}>{t.services}</Link>
            <Link href="/portfolio" onClick={() => setOpen(false)}>{t.portfolio}</Link>
            <Link href="/contact" onClick={() => setOpen(false)}>{t.contact}</Link>
            <Link
              href="/estimate"
              onClick={() => setOpen(false)}
              className="rounded-md px-4 py-2 bg-slate-900 text-white dark:bg-white dark:text-black"
            >
              {t.estimate}
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}
