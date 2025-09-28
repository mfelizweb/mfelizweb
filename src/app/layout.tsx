import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import AppShell from "@/components/AppShell";
import Script from "next/script";  
import { Analytics } from "@vercel/analytics/next";
import TawkWidget from "@/components/TawkWidget";
 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "mfelizweb — Websites & Mobile Apps + NFC",
  description: "Websites, Mobile Apps, NFC InfoContact, Payments & Maintenance.",
  metadataBase: new URL("https://mfelizweb.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
 
  return (
    <html lang="es">
      <head>
        {/* 🔹 Favicon */}
        <link rel="icon" href="/fav.ico" sizes="any" />
      </head>
      <body
        className={`${inter.className} bg-white text-slate-900 antialiased dark:bg-[#0b0f14] dark:text-slate-100`}
      >
        <AppShell>{children}</AppShell>

        {/* ✅ Google Ads Tag */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-11393015388"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-11393015388');
          `}
        </Script>

        
        {/* ✅ Vercel Analytics */}
        
        <Analytics />

         {/* ✅ Tawk.to chat widget */}
            <TawkWidget />
      </body>
    </html>
  );
}
