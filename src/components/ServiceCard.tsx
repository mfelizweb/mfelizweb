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
}: {
  title: LocalizedText;
  description: LocalizedText;
  href: string;
  badge?: ReactNode;
  icon?: ReactNode;
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
      className="group relative flex flex-col gap-4 rounded-2xl
                 border border-slate-100 bg-slate-50
                 p-7 overflow-hidden
                 transition duration-300
                 hover:border-indigo-200 hover:bg-white hover:shadow-xl hover:-translate-y-1"
    >
      {/* Accent line top */}
      <div
        className="absolute top-0 left-0 h-[2px] w-full
                   bg-gradient-to-r from-indigo-500 to-violet-500
                   scale-x-0 group-hover:scale-x-100
                   transition-transform duration-300 origin-left"
      />

      {/* Icon */}
      {icon && (
        <div className="w-11 h-11 rounded-xl bg-white border border-slate-100 shadow-sm
                        flex items-center justify-center
                        group-hover:border-indigo-100 transition">
          {icon}
        </div>
      )}

      {/* Text */}
      <div className="flex-1">
        <h3 className="text-base font-bold text-slate-900 leading-snug">
          {title[lang]}
        </h3>
        <p className="mt-2 text-sm text-slate-500 leading-relaxed">
          {description[lang]}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-100">
        <span className="text-xs font-semibold text-indigo-500 group-hover:text-indigo-600 transition">
          {lang === "es" ? "Ver más" : "Learn more"}
        </span>
        <span
          className="text-slate-300 text-sm group-hover:text-indigo-400
                     transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5 inline-block"
        >
          ↗
        </span>
      </div>

      {/* Badge (optional) */}
      {badge && (
        <div className="absolute top-4 right-4">
          {badge}
        </div>
      )}
    </Link>
  );
}