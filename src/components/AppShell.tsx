"use client";

import { usePathname } from "next/navigation";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideUI = pathname?.startsWith("/NFC/Drivers/");

  return (
    <>
      {!hideUI && <NavBar />}
      <main className={hideUI ? "min-h-screen" : "min-h-[calc(100vh-160px)]"}>
        {children}
      </main>
       <Footer /> 
    </>
  );
}
