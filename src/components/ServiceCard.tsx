import Link from "next/link";
import { ReactNode } from "react";

export default function ServiceCard({
  title,
  description,
  href,
  badge,
}: {
  title: string;
  description: string;
  href: string;
  badge?: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-white/10 bg-white/50 dark:bg-white/5 p-5 transition hover:shadow-lg hover:border-emerald-400/30"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
        {badge}
      </div>
      <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm">{description}</p>
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 opacity-80 group-hover:opacity-100 transition">
        Learn more →
      </div>
    </Link>
  );
}
