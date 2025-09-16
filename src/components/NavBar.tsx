"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const links = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Porfolio" },
  { href: "/contact", label: "Contact" }
];

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
<header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md dark:bg-[#0b0f14]/70 border-b border-slate-200/50 dark:border-slate-700/50">
  <div className="mx-auto max-w-7xl h-16 flex items-center justify-between"> <div className="pl-2">
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
          {links.map(l => (
            <Link key={l.href} href={l.href} className="hover:opacity-80">{l.label}</Link>
          ))}
          <Link href="/estimate" className="rounded-full px-4 py-2 bg-slate-900 text-white dark:bg-white dark:text-black hover:opacity-90">
           Get Estimate
          </Link>
        </nav>

        <button
          className="md:hidden p-2 rounded-md border"
          onClick={() => setOpen(v => !v)}
          aria-label="Abrir menú"
        >
          ☰
        </button>
      </div>

      {open && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="md:hidden border-t">
          <div className="mx-auto max-w-7xl px-4 py-4 flex flex-col gap-3">
            {links.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>
            ))}
            <Link href="/estimate" onClick={() => setOpen(false)} className="rounded-md px-4 py-2 bg-slate-900 text-white dark:bg-white dark:text-black">
              Estimador
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}
