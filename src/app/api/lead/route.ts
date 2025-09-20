// src/app/api/lead/route.ts
export const runtime = "nodejs";
export async function GET() {
  return new Response(
    JSON.stringify({ ok: true, message: "Lead API alive" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { RESEND_API_KEY, RESEND_FROM_EMAIL, RESEND_TO_EMAIL } =
      process.env as Record<string, string>;

    if (!RESEND_API_KEY || !RESEND_FROM_EMAIL || !RESEND_TO_EMAIL) {
      return new Response(
        JSON.stringify({ ok: false, error: "Missing RESEND env vars" }),
        { status: 500 }
      );
    }

    const { Resend } = await import("resend");
    const resend = new Resend(RESEND_API_KEY);

    // 🔹 Asunto bilingüe
    const subject =
      body.lang === "es"
        ? `Nuevo Lead — ${body.business || "Negocio desconocido"}`
        : `New Lead — ${body.business || "Unknown business"}`;

    // 🔹 Contenido simple (rápido)
    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#111">
        <h2>${subject}</h2>
        <p><b>Nombre/Name:</b> ${body.name || "-"}</p>
        <p><b>Teléfono/Phone:</b> ${body.phone || "-"}</p>
        <p><b>Email:</b> ${body.email || "-"}</p>
        ${body.services?.length ? `<p><b>Servicios/Services:</b> ${body.services.join(", ")}</p>` : ""}
        ${body.budget ? `<p><b>Presupuesto/Budget:</b> ${body.budget}</p>` : ""}
        ${body.timing ? `<p><b>Tiempo/Timing:</b> ${body.timing}</p>` : ""}
        ${body.message ? `<p><b>Mensaje/Message:</b> ${body.message}</p>` : ""}
        <hr style="border:none;border-top:1px solid #eee;margin:12px 0" />
        <p><b>Idioma/Language:</b> ${body.lang || "-"}</p>
      </div>
    `;

    await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: RESEND_TO_EMAIL,
      replyTo: body.email || undefined,
      subject,
      html,
    });

    return new Response(JSON.stringify({ ok: true }));
  } catch (e: any) {
    return new Response(
      JSON.stringify({ ok: false, error: e?.message || "Unknown" }),
      { status: 500 }
    );
  }
  
}
