"use client";
import ServiceDetailLayout from "@/components/ServiceDetailLayout";

export default function WebPage() {
  return (
    <ServiceDetailLayout
      serviceKey="web"
      accentColor="blue"
      emoji="🌐"
      title={{ es: "Diseño & Desarrollo Web", en: "Web Design & Development" }}
      subtitle={{
        es: "Sitios modernos, ultrarrápidos y optimizados para atraer más clientes y construir confianza en tu negocio.",
        en: "Modern, blazing-fast websites optimized to attract more clients and build trust in your business.",
      }}
      features={{
        es: [
          { icon: "📱", title: "100% Responsivo", desc: "Perfecto en móviles, tablets y escritorio." },
          { icon: "🔍", title: "SEO Optimizado", desc: "Posicionado en Google desde el día uno." },
          { icon: "✍️", title: "CMS & Blog", desc: "Gestiona tu contenido fácilmente sin código." },
          { icon: "💳", title: "Pagos & Formularios", desc: "Cobra y comunícate desde tu propio sitio." },
          { icon: "🚀", title: "Velocidad Extrema", desc: "Core Web Vitals óptimos, carga en milisegundos." },
          { icon: "📈", title: "Escalable a Largo Plazo", desc: "Arquitectura lista para crecer contigo." },
        ],
        en: [
          { icon: "📱", title: "Fully Responsive", desc: "Perfect on mobile, tablet, and desktop." },
          { icon: "🔍", title: "SEO Optimized", desc: "Ranking on Google from day one." },
          { icon: "✍️", title: "CMS & Blog", desc: "Manage content easily without code." },
          { icon: "💳", title: "Payments & Forms", desc: "Accept payments and inquiries directly on your site." },
          { icon: "🚀", title: "Extreme Speed", desc: "Optimal Core Web Vitals, loads in milliseconds." },
          { icon: "📈", title: "Built to Scale", desc: "Architecture ready to grow with you." },
        ],
      }}
      included={{
        es: ["Dominio & hosting configurados", "SSL / HTTPS incluido", "Optimización de velocidad", "Soporte técnico post-lanzamiento"],
        en: ["Domain & hosting setup", "SSL / HTTPS included", "Performance optimization", "Post-launch technical support"],
      }}
      cta={{ es: "Planear mi Sitio →", en: "Plan my Website →" }}
    />
  );
}