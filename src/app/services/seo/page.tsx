"use client";
import ServiceDetailLayout from "@/components/ServiceDetailLayout";

export default function SeoPage() {
    return (
        <ServiceDetailLayout
            serviceKey="seo"
            accentColor="green"
            emoji="🔍"
            title={{ es: "SEO & Posicionamiento Web", en: "SEO & Search Rankings" }}
            subtitle={{
                es: "Aparecer en Google no es suerte — es estrategia. Llevamos tu negocio al tope de los resultados con SEO técnico, contenido y enlaces de calidad.",
                en: "Ranking on Google isn't luck — it's strategy. We push your business to the top of search results with technical SEO, content, and quality backlinks.",
            }}
            features={{
                es: [
                    { icon: "🔍", title: "Auditoría SEO Completa", desc: "Análisis profundo de tu sitio: errores técnicos, velocidad, links rotos y oportunidades de mejora." },
                    { icon: "🗝️", title: "Investigación de Palabras Clave", desc: "Identificamos los términos exactos que usa tu cliente potencial para encontrarte." },
                    { icon: "📝", title: "Contenido Optimizado", desc: "Páginas, blogs y meta tags escritos para posicionar y convertir visitantes en clientes." },
                    { icon: "⚡", title: "SEO Técnico", desc: "Optimización de Core Web Vitals, schema markup, sitemap y robots.txt." },
                    { icon: "🔗", title: "Link Building", desc: "Construcción de autoridad con backlinks de calidad en directorios y sitios relevantes." },
                    { icon: "📊", title: "Reportes Mensuales", desc: "Dashboard transparente con rankings, tráfico orgánico y conversiones." },
                ],
                en: [
                    { icon: "🔍", title: "Full SEO Audit", desc: "Deep analysis of your site: technical errors, speed issues, broken links, and growth opportunities." },
                    { icon: "🗝️", title: "Keyword Research", desc: "We identify the exact terms your potential customers use to find you." },
                    { icon: "📝", title: "Optimized Content", desc: "Pages, blogs, and meta tags written to rank and convert visitors into clients." },
                    { icon: "⚡", title: "Technical SEO", desc: "Core Web Vitals, schema markup, sitemap, and robots.txt optimization." },
                    { icon: "🔗", title: "Link Building", desc: "Build authority with quality backlinks from relevant directories and sites." },
                    { icon: "📊", title: "Monthly Reports", desc: "Transparent dashboard with rankings, organic traffic, and conversion data." },
                ],
            }}
            included={{
                es: [
                    "Auditoría SEO inicial gratuita",
                    "Optimización on-page & off-page",
                    "Google Search Console & Analytics integrado",
                    "Revisión mensual de estrategia",
                    "Soporte técnico continuo",
                ],
                en: [
                    "Free initial SEO audit",
                    "On-page & off-page optimization",
                    "Google Search Console & Analytics integration",
                    "Monthly strategy review",
                    "Ongoing technical support",
                ],
            }}
            cta={{ es: "Quiero Aparecer en Google →", en: "Get Me on Google →" }}
            extraBadges={["Google Search Console", "Google Analytics", "Core Web Vitals"]}
        />
    );
}
