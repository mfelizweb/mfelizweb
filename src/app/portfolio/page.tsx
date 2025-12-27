"use client";

import ProjectFlipCards from "@/components/ProjectFlipCards";
import { useEffect, useState } from "react";


type Lang = "es" | "en";

type Project = {
  title: string;
  tags: string[];
  images: string[];
  description: Record<Lang, string>;
};

export default function PortfolioPage() {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setLang(navigator.language.startsWith("es") ? "es" : "en");
    }
  }, []);
  const projects: Project[] = [
    {
      title: "HVAC / EPA 608 Coach",
      tags: ["react-native", "supabase", "exam-engine", "revenuecat", "admob"],
      images: ["/hvca.png"],
      description: {
        en: "EPA 608 HVAC exam preparation app with structured questions, timed tests, and professional exam flow.",
        es: "App de preparación para el examen HVAC EPA 608 con preguntas estructuradas, pruebas cronometradas y flujo profesional.",
      },
    },
    {
      title: "TSA CBT Test Coach",
      tags: ["react-native", "supabase", "ai", "revenuecat"],
      images: ["/tsa.png"],
      description: {
        en: "Professional exam prep app for the TSA CBT test, including AI explanations, practice exams, and compliance-focused design.",
        es: "App profesional de preparación para el examen TSA CBT, con explicaciones por IA, prácticas y diseño alineado a políticas.",
      },
    },
    {
      title: "CDL Coach",
      tags: ["react-native", "supabase", "ai", "revenuecat", "admob"],
      images: ["/cdl.png"],
      description: {
        en: "Production-grade mobile app to prepare for the U.S. CDL exam, featuring AI-powered explanations, exam simulations, voice mode, and monetization.",
        es: "Aplicación móvil en producción para preparar el examen CDL en EE.UU., con explicaciones por IA, simulador de examen, modo voz y monetización.",
      },
    },
    {
      title: "Adondeir (ADI)",
      tags: ["react-native", "supabase", "maps"],
      images: ["/adi.png"],
      description: {
        en: "Tourism discovery app to explore places, rivers, and itineraries with maps, filters, and community content. No ads or subscriptions.",
        es: "App de turismo para descubrir lugares, ríos e itinerarios con mapas, filtros y contenido comunitario. Sin anuncios ni suscripciones.",
      },
    },

    {
      title: "OSHA Coach",
      tags: ["react-native", "supabase", "ai", "revenuecat", "admob"],
      images: ["/osha.png"],
      description: {
        en: "Certification prep app for OSHA exams with AI tutor, practice tests, progress tracking, and subscription access.",
        es: "App de preparación para certificaciones OSHA con tutor IA, prácticas, seguimiento de progreso y acceso por suscripción.",
      },
    },
    {
      title: "Academia Chonji",
      tags: ["wordpress", "education", "membership"],
      images: ["/chonji.jpg"],
      description: {
        en: "Educational website for an academy, featuring course content, institutional information, and a professional presentation for students and parents.",
        es: "Sitio web educativo para una academia, con contenido formativo, información institucional y una presentación profesional para estudiantes y padres.",
      },
    },
    {
      title: "Mi Cheque",
      tags: ["react-native", "finance", "revenuecat"],
      images: ["/micheque.png"],
      description: {
        en: "Simple payroll calculator app to estimate net income after taxes and deductions for U.S. workers.",
        es: "Calculadora de nómina para estimar ingresos netos después de impuestos y deducciones en EE.UU.",
      },


    },

    {
      title: "Firebase Rule Builder",
      tags: ["nextjs", "firebase", "openai", "stripe"],
      images: ["/RuleBuilder.png"],
      description: {
        en: "Web-based tool to generate secure Firebase Firestore rules using AI, with user authentication and Stripe-powered payments.",
        es: "Herramienta web para generar reglas seguras de Firestore usando IA, con autenticación de usuarios y pagos vía Stripe.",
      },
    },
    {
      title: "J832 Crypto Contract",
      tags: ["web3", "crypto", "smart-contract", "landing"],
      images: ["/j832.png"],
      description: {
        en: "Landing page for a crypto project explaining the J832 smart contract, token utility, and roadmap.",
        es: "Landing page para un proyecto cripto que presenta el contrato inteligente J832, utilidad del token y roadmap.",
      },
    },
    {
      title: "Lacu App",
      tags: ["woocommerce", "wordpress", "ecommerce"],
      images: ["/lacu.png"],
      description: {
        en: "E-commerce platform built with WooCommerce, including product management, payments, and responsive design.",
        es: "Plataforma e-commerce desarrollada con WooCommerce, con gestión de productos, pagos y diseño responsivo.",
      },
    },
    {
      title: "Divina Home Care",
      tags: ["wordpress", "business-website"],
      images: ["/divina.png"],
      description: {
        en: "Corporate website for a home care company, focused on services, trust, and lead generation.",
        es: "Sitio web corporativo para una empresa de home care, enfocado en servicios, confianza y generación de clientes.",
      },
    },


  ];


  return (
    <main className="relative min-h-screen bg-white dark:bg-black overflow-hidden">
      {/* Header */}
      <section className="max-w-5xl mx-auto px-6 pt-24 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
          {lang === "es" ? "Portafolio" : "Portfolio"}
        </h1>

        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {lang === "es"
            ? "Proyectos tecnológicos construidos con enfoque en producto, escalabilidad y experiencia de usuario."
            : "Technology projects built with strong focus on product, scalability, and user experience."}
        </p>
      </section>

      {/* Rotating 3D Portfolio */}
      <ProjectFlipCards
        projects={projects.map((p) => ({
          title: p.title,
          tags: p.tags,
          image: p.images[0], // 👈 aquí está la clave
          description: p.description,
        }))}
      />




      {/* Footer note */}
      <section className="text-center pb-24 px-6">
        <p className="text-sm text-gray-500 dark:text-gray-500">
          {lang === "es"
            ? "Cada proyecto representa una solución real construida para escalar."
            : "Each project represents a real-world solution built to scale."}
        </p>
      </section>
    </main>
  );
}
