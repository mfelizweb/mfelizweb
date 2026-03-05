"use client";
import ServiceDetailLayout from "@/components/ServiceDetailLayout";

export default function NFCPage() {
  return (
    <ServiceDetailLayout
      serviceKey="nfc"
      accentColor="blue"
      emoji="📶"
      title={{ es: "Tarjetas NFC Inteligentes", en: "NFC Smart Cards" }}
      subtitle={{
        es: "Una tarjeta que reemplaza el papel, impresiona en cualquier reunión y nunca caduca. Un tap — toda tu info.",
        en: "One smart card that replaces paper, impresses in any room, and never expires. One tap — all your info.",
      }}
      extraBadges={["📱 iOS & Android", "🔗 URL personalizada", "📊 Analytics"]}
      features={{
        es: [
          { icon: "✏️", title: "Perfil Siempre Actualizado", desc: "Edita tu info en tiempo real desde el panel sin reimprimir nada." },
          { icon: "⚡", title: "Acciones al Instante", desc: "WhatsApp, llamada, pago, redes sociales — todo con un toque." },
          { icon: "📊", title: "Analíticas de Alcance", desc: "Rastrea quién escaneó tu tarjeta, cuándo y desde dónde." },
          { icon: "♾️", title: "Para Toda la Vida", desc: "Una sola tarjeta, sin reimpresión jamás. Actualiza digitalmente." },
          { icon: "💳", title: "Link de Pago Integrado", desc: "Acepta pagos directamente desde tu tarjeta NFC." },
          { icon: "🎨", title: "Diseño Personalizado", desc: "Logo, colores y estilo de marca totalmente a tu medida." },
        ],
        en: [
          { icon: "✏️", title: "Always Current Profile", desc: "Edit your info in real-time from the dashboard — no reprinting." },
          { icon: "⚡", title: "Instant Actions", desc: "WhatsApp, call, payment, social media — all in one tap." },
          { icon: "📊", title: "Reach Analytics", desc: "Track who scanned your card, when, and from where." },
          { icon: "♾️", title: "Yours for Life", desc: "One card, never reprint. Update everything digitally." },
          { icon: "💳", title: "Integrated Payment Link", desc: "Accept payments directly from your NFC card." },
          { icon: "🎨", title: "Custom Design", desc: "Logo, colors, and brand style entirely to your spec." },
        ],
      }}
      included={{
        es: ["Tarjeta física NFC + funda premium", "Panel de edición online", "QR code incluido", "Analytics en tiempo real", "Soporte técnico"],
        en: ["Physical NFC card + premium cover", "Online editing panel", "QR code included", "Real-time analytics", "Technical support"],
      }}
      cta={{ es: "Pedir mi tarjeta NFC →", en: "Get my NFC Card →" }}
    />
  );
}