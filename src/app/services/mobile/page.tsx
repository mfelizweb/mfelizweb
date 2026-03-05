"use client";
import ServiceDetailLayout from "@/components/ServiceDetailLayout";

export default function MobilePage() {
  return (
    <ServiceDetailLayout
      serviceKey="mobile"
      accentColor="blue"
      emoji="📱"
      title={{ es: "Apps Móviles Nativas", en: "Native Mobile Apps" }}
      subtitle={{
        es: "Llevamos tu negocio al bolsillo de tus clientes con apps modernas, rápidas y fáciles de usar para iOS y Android.",
        en: "Put your business in your clients' pockets with modern, fast, and intuitive apps for iOS and Android.",
      }}
      extraBadges={["🍎 iOS", "🤖 Android", "React Native"]}
      features={{
        es: [
          { icon: "🎨", title: "Diseño UX Intuitivo", desc: "Interfaces que enamoran y convierten desde la primera pantalla." },
          { icon: "📲", title: "iOS & Android Nativos", desc: "Publicamos en App Store y Google Play." },
          { icon: "🔔", title: "Push Notifications", desc: "Mantén a tus usuarios enganchados y activos." },
          { icon: "🛡️", title: "Seguridad Empresarial", desc: "Auth, encriptación y protección de datos garantizados." },
          { icon: "⚡", title: "Rendimiento Extremo", desc: "Fluido incluso con conexión lenta o intermitente." },
          { icon: "🔄", title: "Soporte Post-Lanzamiento", desc: "Actualizaciones y mantenimiento incluidos." },
        ],
        en: [
          { icon: "🎨", title: "Intuitive UX Design", desc: "Interfaces that delight and convert from the first screen." },
          { icon: "📲", title: "Native iOS & Android", desc: "Published on App Store and Google Play." },
          { icon: "🔔", title: "Push Notifications", desc: "Keep your users engaged and active." },
          { icon: "🛡️", title: "Enterprise Security", desc: "Auth, encryption, and data protection built-in." },
          { icon: "⚡", title: "Extreme Performance", desc: "Smooth even on slow or intermittent connections." },
          { icon: "🔄", title: "Post-Launch Support", desc: "Updates and maintenance included." },
        ],
      }}
      included={{
        es: ["Publicación App Store & Google Play", "Autenticación de usuarios", "Analytics integrado", "Actualizaciones OTA"],
        en: ["App Store & Google Play publishing", "User authentication", "Integrated analytics", "Over-the-air updates"],
      }}
      cta={{ es: "Planear mi App →", en: "Plan my App →" }}
    />
  );
}