"use client";
import ServiceDetailLayout from "@/components/ServiceDetailLayout";

export default function RedesignPage() {
    return (
        <ServiceDetailLayout
            serviceKey="redesign"
            accentColor="violet"
            emoji="🎨"
            title={{ es: "Rediseño de Sitio Web", en: "Website Redesign" }}
            subtitle={{
                es: "Tu sitio actual no está convirtiendo. Lo transformamos en una máquina de ventas: diseño moderno, experiencia impecable y velocidad que impresiona.",
                en: "Your current site isn't converting. We turn it into a sales machine: modern design, flawless experience, and speed that impresses.",
            }}
            features={{
                es: [
                    { icon: "🎨", title: "Nuevo Diseño UI/UX", desc: "Diseño moderno, limpio y orientado a conversiones — primera impresión que vende." },
                    { icon: "📱", title: "Mobile-First", desc: "Optimizado para el 80%+ de usuarios que visitan desde su teléfono." },
                    { icon: "🚀", title: "Velocidad de Carga", desc: "Sitios que cargan en bajo 2 segundos — menos rebote, más conversiones." },
                    { icon: "🗂️", title: "Arquitectura de Información", desc: "Reorganizamos tu contenido para que los usuarios encuentren lo que buscan de inmediato." },
                    { icon: "♿", title: "Accesibilidad & WCAG", desc: "Sitios inclusivos que cumplen estándares de accesibilidad web." },
                    { icon: "🔍", title: "SEO Preservado", desc: "Mantenemos y mejoramos tu posicionamiento durante la migración sin perder tráfico." },
                ],
                en: [
                    { icon: "🎨", title: "New UI/UX Design", desc: "Modern, clean design focused on conversions — a first impression that sells." },
                    { icon: "📱", title: "Mobile-First", desc: "Optimized for the 80%+ of users who visit from their phone." },
                    { icon: "🚀", title: "Load Speed", desc: "Sites loading in under 2 seconds — less bounce, more conversions." },
                    { icon: "🗂️", title: "Information Architecture", desc: "We reorganize your content so users find what they need instantly." },
                    { icon: "♿", title: "Accessibility & WCAG", desc: "Inclusive sites that meet web accessibility standards." },
                    { icon: "🔍", title: "SEO Preserved", desc: "We maintain and improve your rankings during migration without losing traffic." },
                ],
            }}
            included={{
                es: [
                    "Análisis de sitio actual",
                    "Wireframes & prototipo interactivo",
                    "Migración de contenido existente",
                    "Pruebas cross-browser & cross-device",
                    "Training para gestionar tu nuevo sitio",
                ],
                en: [
                    "Current site analysis",
                    "Wireframes & interactive prototype",
                    "Existing content migration",
                    "Cross-browser & cross-device testing",
                    "Training to manage your new site",
                ],
            }}
            cta={{ es: "Renovar mi Sitio →", en: "Redesign My Site →" }}
            extraBadges={["Next.js", "React", "Figma", "Responsive Design"]}
        />
    );
}
