"use client";
import ServiceDetailLayout from "@/components/ServiceDetailLayout";

export default function AIPage() {
    return (
        <ServiceDetailLayout
            serviceKey="web"
            accentColor="blue"
            emoji="🤖"
            title={{ es: "IA & Automatización", en: "AI & Automation" }}
            subtitle={{
                es: "Agentes autónomos, chatbots inteligentes y flujos automatizados que atienden clientes 24/7, capturan leads y escalan tu negocio sin contratar más personal.",
                en: "Autonomous agents, smart chatbots, and automated flows that serve customers 24/7, capture leads, and scale your business without hiring more staff.",
            }}
            extraBadges={["OpenAI GPT-4o", "Anthropic Claude", "n8n / Zapier", "WhatsApp API"]}
            features={{
                es: [
                    { icon: "💬", title: "Chatbots con IA", desc: "Asistentes inteligentes entrenados en tu negocio que responden preguntas, reservas y soporte al instante." },
                    { icon: "🎯", title: "Captura de Leads 24/7", desc: "El bot califica prospectos automáticamente y los pasa a tu CRM mientras duermes." },
                    { icon: "⚡", title: "Automatización de Flujos", desc: "Conecta apps, envía emails, actualiza hojas de cálculo — todo automático sin código." },
                    { icon: "📞", title: "Integración Omnicanal", desc: "WhatsApp, Instagram DMs, web chat y email — un solo agente maneja todo." },
                    { icon: "🧠", title: "Modelos Avanzados", desc: "GPT-4o, Claude 3.5 y Gemini Pro para respuestas precisas y contextuales." },
                    { icon: "📊", title: "Analytics de Conversaciones", desc: "Dashboard con métricas de satisfacción, temas frecuentes y conversiones del bot." },
                ],
                en: [
                    { icon: "💬", title: "AI-Powered Chatbots", desc: "Smart assistants trained on your business that answer questions, handle bookings, and provide instant support." },
                    { icon: "🎯", title: "24/7 Lead Capture", desc: "The bot automatically qualifies prospects and pushes them to your CRM while you sleep." },
                    { icon: "⚡", title: "Flow Automation", desc: "Connect apps, send emails, update spreadsheets — all automatic without code." },
                    { icon: "📞", title: "Omnichannel Integration", desc: "WhatsApp, Instagram DMs, web chat, and email — one agent handles everything." },
                    { icon: "🧠", title: "Advanced AI Models", desc: "GPT-4o, Claude 3.5, and Gemini Pro for accurate and contextual responses." },
                    { icon: "📊", title: "Conversation Analytics", desc: "Dashboard with satisfaction metrics, frequent topics, and bot conversion rates." },
                ],
            }}
            included={{
                es: [
                    "Setup e integración del chatbot",
                    "Entrenamiento con tu base de conocimiento",
                    "Integración WhatsApp Business API",
                    "Conexión a CRM (HubSpot, Notion, Airtable)",
                    "Soporte y reentrenamiento mensual",
                ],
                en: [
                    "Chatbot setup & integration",
                    "Training on your knowledge base",
                    "WhatsApp Business API integration",
                    "CRM connection (HubSpot, Notion, Airtable)",
                    "Monthly support & retraining",
                ],
            }}
            cta={{ es: "Automatizar mi negocio →", en: "Automate my business →" }}
        />
    );
}
