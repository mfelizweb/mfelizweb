"use client";

import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";

type LocalizedText = {
  es: string;
  en: string;
};

export default function ServiceCard({
  title,
  description,
  href,
  badge,
  icon,
  className = "",
  featured = false,
}: {
  title: LocalizedText;
  description: LocalizedText;
  href: string;
  badge?: ReactNode;
  icon?: ReactNode;
  className?: string;
  featured?: boolean;
}) {
  const [lang, setLang] = useState<"es" | "en">("en");

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setLang(navigator.language.startsWith("es") ? "es" : "en");
    }
  }, []);

  return (
    <Link
      href={href}
      aria-label={title[lang]}
      className={`group relative flex flex-col gap-4 rounded-3xl
                 border border-slate-200 bg-white shadow-sm
                 p-8 overflow-hidden
                 transition-all tracking-tight duration-300
                 hover:bg-slate-50 hover:border-blue-300 hover:shadow-xl
                 hover:-translate-y-1 ${className}`}
    >
      {/* Background glow on hover for light theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-transparent to-blue-50/0 group-hover:from-blue-100/30 group-hover:to-cyan-100/30 transition-colors duration-500" />

      {/* Dynamic top gradient line */}
      <div
        className="absolute top-0 left-0 h-[3px] w-full
                   bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500
                   scale-x-0 group-hover:scale-x-100
                   transition-transform duration-500 origin-left"
      />

      {/* Icon Area */}
      {icon && (
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center 
                        border border-slate-100 shadow-sm relative z-10
                        group-hover:scale-110 group-hover:rotate-3 transition duration-300
                        ${featured ? 'bg-blue-50 border-blue-100 text-blue-600' : 'bg-slate-50'}`}>
          {icon}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 relative z-10 mt-auto">
        <h3 className={`font-bold text-slate-900 leading-snug tracking-tight mb-2 ${featured ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
          {title[lang]}
        </h3>
        <p className={`text-slate-500 font-normal leading-relaxed ${featured ? 'text-base sm:text-lg' : 'text-sm'}`}>
          {description[lang]}
        </p>
      </div>

      {/* Footer / Arrow */}
      <div className="flex items-center justify-between mt-auto pt-4 relative z-10">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-2 group-hover:translate-x-0">
          {lang === "es" ? "Explorar" : "Explore"}
        </span>
        <div className="w-8 h-8 rounded-full border border-slate-200 bg-white flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white text-slate-400 transition-colors shadow-sm">
          <svg className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>

      {/* Badge (optional) */}
      {badge && (
        <div className="absolute top-6 right-6 z-10">
          {badge}
        </div>
      )}
    </Link>
  );
}