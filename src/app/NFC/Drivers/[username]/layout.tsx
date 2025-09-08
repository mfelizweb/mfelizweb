// src/app/NFC/Drivers/[username]/layout.tsx
import type { ReactNode } from "react";

export default function DriverLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="min-h-screen bg-black text-white">
        {children}
      </main>

 
    </>
  );
}
