// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import AppShell from "@/components/AppShell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "mfelizweb — Websites & Mobile Apps + NFC",
  description: "Websites, Mobile Apps, NFC InfoContact, Payments & Maintenance.",
  metadataBase: new URL("https://mfelizweb.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-white text-slate-900 antialiased dark:bg-[#0b0f14] dark:text-slate-100`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

 