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
      className="group flex flex-col items-start gap-3 rounded-2xl border border-white/10 bg-white/50 dark:bg-white/5 p-6 transition hover:shadow-xl hover:border-emerald-400/30"
    >
      {icon && <div className="">{icon}</div>}

      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        {title[lang]}
      </h3>

      <p className="text-gray-700 dark:text-gray-300 text-sm">
        {description[lang]}
      </p>

      <div className="mt-auto text-sm text-gray-500 dark:text-gray-400 opacity-80 group-hover:opacity-100 transition">
        {lang === "es" ? "Más info →" : "Learn more →"}
      </div>
    </Link>
  );
}
