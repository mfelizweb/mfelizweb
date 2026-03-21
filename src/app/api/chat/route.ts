import { google } from "@ai-sdk/google";
import { streamText, tool, convertToModelMessages } from "ai";
import { z } from "zod";
import { Resend } from "resend";

export const maxDuration = 30;

const resend = new Resend(process.env.RESEND_API_KEY || "missing-key");

const contactSchema = z.object({
  userName: z.string().describe("El nombre del usuario."),
  contactInfo: z.string().describe("El teléfono de WhatsApp o el correo electrónico."),
  reason: z.string().describe("El motivo por el cual el usuario quiere ser contactado."),
});

type ContactArgs = z.infer<typeof contactSchema>;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // convertToModelMessages es asíncrona en la v4+ del SDK
    const modelMessages = await convertToModelMessages(messages);

    const result = streamText({
      model: google("gemini-2.5-flash"),
      messages: modelMessages,
      system: `Eres Maddi, parte del equipo de mfelizweb.com. Tu trabajo es calificar leads de forma natural, como si chatearas por WhatsApp.

NUESTRO ADN (mfelizweb.com):

No hacemos "solo páginas". Creamos herramientas de venta.

Servicios clave: Diseño Web Estratégico (UX/UI), SEO (posicionamiento), E-commerce y Optimización de Conversión.

Nuestra diferencia: El enfoque en que el cliente recupere su inversión (ROI).

FILOSOFÍA DE RESPUESTA:

Economía de palabras: Máximo 2 líneas. Si usas 3, que sea porque una es muy corta.

Cero entusiasmo corporativo: Prohibido: "¡Excelente!", "¡Claro que sí!", "¡Qué bien!". Usa: "dale", "mira", "fíjate que", "la verdad".

Espejo (Mirroring): Si el usuario es breve, tú también. Si es técnico, sé técnica.

Sin adornos: No uses negritas, listas ni bullets. Nunca.

MANEJO DE SERVICIOS Y PRECIOS:

Si preguntan precio: "fíjate que depende de lo que busques, no es lo mismo una landing de venta que un e-commerce. ¿qué tienes en mente?"

Si preguntan qué hacemos: "hacemos diseño web enfocado en ventas y SEO. ¿buscas algo desde cero o mejorar lo que ya tienes?"

Sutileza técnica: Si mencionan que quieren "una web", tú pregunta por el objetivo: "¿buscas captar leads o vender productos directo?"

CAPTURA Y CIERRE:

Nombre: "¿con quién tengo el gusto?" (solo si ya hay interés).

Contacto: "pásame tu WhatsApp o correo y le digo al equipo que te contacte".

Traspaso: EN EL MISMO INSTANTE en que el usuario te proporciona su número o correo, DEBES ejecutar la herramienta 'request_human_intervention'. Inmediatamente después de ejecutarla, tu única respuesta debe ser: "listo, ya les pasé el dato para que te hablen". Prohibido quedarte en silencio o hacer más preguntas.

Ejemplo de flujo "humano" de Maddi:
Usuario: Hola, ¿hacen tiendas online?
Maddi: hola, sí, fíjate que hacemos e-commerce enfocados en que de verdad vendan. ¿ya tienes productos listos o empiezas de cero?

Usuario: Ya vendo por Instagram, pero quiero algo profesional. ¿Precio?
Maddi: depende mucho de cuántos productos sean y si necesitas pagos automáticos. ¿cómo te llamas para tenerte en el sistema?

Usuario: Soy Carlos.
Maddi: perfecto Carlos. ¿me dejas un WhatsApp? así el equipo revisa tu caso y te escribe directo.

¿Te gustaría que probemos cómo respondería Maddi a una objeción común, como cuando alguien dice que "solo quiere algo barato"?`,


tools: {
        request_human_intervention: tool({
          description: "Envía un correo y un WhatsApp al equipo de ventas con los datos del usuario.",
          parameters: contactSchema,
          execute: async ({ userName, contactInfo, reason }: ContactArgs) => {
            try {
              const safeName = userName || "Usuario Desconocido";
              const safeContact = contactInfo || "No provisto";
              const safeReason = reason || "No especificó motivo";

              const isEmail = safeContact.includes('@');
              const cleanPhone = isEmail ? '' : safeContact.replace(/[^0-9]/g, '');
              const waLink = cleanPhone ? `https://wa.me/${cleanPhone}` : '#';

              // --- 1. ENVÍO DE CORREO POR RESEND ---
              const contactActionHtml = isEmail 
                ? `<p><a href="mailto:${safeContact}">Responder por Correo</a></p>`
                : cleanPhone ? `<p><a href="${waLink}">Contactar por WhatsApp</a></p>` : '';

              await resend.emails.send({
                from: "Ventas IA <onboarding@resend.dev>",
                to: "info@mfelizweb.com", // <-- Tu correo
                subject: `🚨 Nuevo Lead: ${safeName}`,
                html: `
                  <h2>Nuevo Contacto desde el Chat</h2>
                  <p><strong>Nombre:</strong> ${safeName}</p>
                  <p><strong>Contacto:</strong> ${safeContact}</p>
                  <p><strong>Motivo:</strong> ${safeReason}</p>
                  ${contactActionHtml}
                `,
              });

              // --- 2. ENVÍO DE NOTIFICACIÓN A TU WHATSAPP ---
              // Formateamos el mensaje con negritas de WhatsApp (*)
              const waMessage = `🚨 *Nuevo Lead en mfelizweb*\n\n👤 *Nombre:* ${safeName}\n📞 *Contacto:* ${safeContact}\n💬 *Motivo:* ${safeReason}`;
              
              // Reemplaza "TU_API_KEY_AQUI" con el código que te dio el bot
              // El número de teléfono debe llevar el código de país (1 para USA) sin el signo +
              const callMeBotUrl = `https://api.callmebot.com/whatsapp.php?phone=19292406734&text=${encodeURIComponent(waMessage)}&apikey=TU_API_KEY_AQUI`;
              
              // Hacemos la petición silenciosa para disparar el mensaje
              await fetch(callMeBotUrl, { method: 'GET' });

              return "Notificación enviada con éxito.";
            } catch (error) {
              console.error("Error enviando notificaciones:", error);
              return "Fallo al enviar la notificación.";
            }
          },
        } as any),
      },
      

    });

    return result.toUIMessageStreamResponse();
    
  } catch (error) {
    console.error("API Route Error:", error);
    return new Response(JSON.stringify({ error: "Ocurrió un error en el servidor" }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}