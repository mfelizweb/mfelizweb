"use client";
import ServiceDetailLayout from "@/components/ServiceDetailLayout";

export default function PaymentsPage() {
  return (
    <ServiceDetailLayout
      serviceKey="payments"
      accentColor="blue"
      emoji="💳"
      title={{ es: "Pagos Online", en: "Online Payments" }}
      subtitle={{
        es: "Links de pago, checkout embebido, suscripciones y facturación automática — todo listo para tu negocio.",
        en: "Payment links, embedded checkout, subscriptions, and automated invoicing — everything your business needs.",
      }}
      extraBadges={["Stripe", "Square", "PCI DSS", "SSL"]}
      features={{
        es: [
          { icon: "🔗", title: "Links de Pago", desc: "Comparte un enlace y cobra desde cualquier lugar." },
          { icon: "🛒", title: "Checkout Embebido", desc: "Integra el pago directamente en tu web o app." },
          { icon: "🔄", title: "Suscripciones", desc: "Planes recurrentes con facturación automática mensual o anual." },
          { icon: "🧾", title: "Facturación Automática", desc: "Facturas generadas y enviadas sin intervención manual." },
          { icon: "🛡️", title: "Seguridad Bancaria", desc: "Encriptación PCI DSS y protección anti-fraude avanzada." },
          { icon: "📊", title: "Dashboard de Cobros", desc: "Visualiza ingresos, clientes y tendencias en tiempo real." },
        ],
        en: [
          { icon: "🔗", title: "Payment Links", desc: "Share a link and get paid from anywhere." },
          { icon: "🛒", title: "Embedded Checkout", desc: "Integrate payments directly into your site or app." },
          { icon: "🔄", title: "Subscriptions", desc: "Recurring plans with automatic monthly or annual billing." },
          { icon: "🧾", title: "Automated Invoicing", desc: "Invoices generated and sent without manual work." },
          { icon: "🛡️", title: "Bank-grade Security", desc: "PCI DSS encryption and advanced fraud protection." },
          { icon: "📊", title: "Revenue Dashboard", desc: "Visualize income, customers, and trends in real-time." },
        ],
      }}
      included={{
        es: ["Integración Stripe / Square", "Checkout responsive mobile-first", "Webhooks y notificaciones", "Panel de analíticas de cobros"],
        en: ["Stripe / Square integration", "Mobile-first responsive checkout", "Webhooks & notifications", "Payments analytics panel"],
      }}
      cta={{ es: "Activar mis pagos →", en: "Activate my payments →" }}
    />
  );
}