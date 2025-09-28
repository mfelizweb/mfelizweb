// src/components/TawkWidget.tsx
"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

export default function TawkWidget() {
  const pathname = usePathname();
  const hideChat = pathname?.startsWith("/NFC/Drivers");

  if (hideChat) return null;

  return (
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
  );
}
