"use client";
import ServiceDetailLayout from "@/components/ServiceDetailLayout";

export default function MaintenancePage() {
  return (
    <ServiceDetailLayout
      serviceKey="maintenance"
      accentColor="blue"
      emoji="🛠️"
      title={{ es: "Mantenimiento & Soporte", en: "Maintenance & Support" }}
      subtitle={{
        es: "Delegas la complejidad técnica. Nosotros garantizamos que tu infraestructura digital sea resiliente, rápida y siempre actualizada.",
        en: "Offload the technical complexity. We ensure your digital infrastructure is resilient, fast, and always up to date.",
      }}
      extraBadges={["24/7 Monitoring", "SLA Guarantee", "Security Patches"]}
      features={{
        es: [
          { icon: "🛡️", title: "Seguridad Proactiva", desc: "Monitoreo 24/7 y parches de seguridad aplicados inmediatamente." },
          { icon: "⚡", title: "Soporte Prioritario", desc: "Respuesta crítica y resolución de incidentes en tiempo récord." },
          { icon: "🔄", title: "Actualizaciones Continuas", desc: "Dependencias, plugins y frameworks siempre al día." },
          { icon: "💾", title: "Backups Automáticos", desc: "Respaldos diarios y recuperación ante desastres garantizada." },
          { icon: "📈", title: "Optimización de Performance", desc: "Velocidad de carga, Core Web Vitals y uptime monitoreados." },
          { icon: "📊", title: "Reportes Mensuales", desc: "Reporte detallado de cada acción realizada y métricas clave." },
        ],
        en: [
          { icon: "🛡️", title: "Proactive Security", desc: "24/7 monitoring and security patches applied immediately." },
          { icon: "⚡", title: "Priority Support", desc: "Critical response and incident resolution in record time." },
          { icon: "🔄", title: "Continuous Updates", desc: "Dependencies, plugins, and frameworks always up to date." },
          { icon: "💾", title: "Automated Backups", desc: "Daily backups and guaranteed disaster recovery." },
          { icon: "📈", title: "Performance Optimization", desc: "Load speed, Core Web Vitals, and uptime monitored." },
          { icon: "📊", title: "Monthly Reports", desc: "Detailed report of every action taken and key metrics." },
        ],
      }}
      included={{
        es: ["Monitoreo 24/7", "Backups diarios automatizados", "Parches de seguridad inmediatos", "Reporte mensual detallado"],
        en: ["24/7 monitoring", "Automated daily backups", "Immediate security patches", "Detailed monthly report"],
      }}
      cta={{ es: "Activar soporte →", en: "Activate support →" }}
    />
  );
}