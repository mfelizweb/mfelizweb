import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import AppShell from "@/components/AppShell";
import Script from "next/script";  
import { Analytics } from "@vercel/analytics/next";

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

        {/* ✅ Tawk.to chat widget */}
        <Script
          id="tawk-to"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),
                    s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/651b36c410c0b2572487de3f/1hbp7u6tb';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />

        {/* ✅ Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
