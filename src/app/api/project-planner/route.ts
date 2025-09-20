// src/app/api/project-planner/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { lang, data, roadmap } = await req.json();

    const subject = lang === "es"
      ? "Nueva solicitud de proyecto — Project Planner"
      : "New Project Request — Project Planner";

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#111">
        <h2>${subject}</h2>
        <p><strong>Nombre/Name:</strong> ${data.name || "-"}</p>
        <p><strong>Email:</strong> ${data.email || "-"}</p>
        <p><strong>Teléfono/Phone:</strong> ${data.phone || "-"}</p>
        <hr style="border:none;border-top:1px solid #eee;margin:12px 0" />
        <p><strong>Servicios/Services:</strong> ${data.services?.join(", ")}</p>
        <p><strong>Prioridades/Priorities:</strong> ${data.priorities?.join(", ")}</p>
        <p><strong>Características/Features:</strong> ${data.features?.join(", ") || "-"}</p>
        <p><strong>Urgencia/Urgency:</strong> ${data.urgency}</p>
        ${data.notes ? `<p><strong>Notas/Notes:</strong> ${data.notes}</p>` : ""}
        <pre style="white-space:pre-wrap;background:#f8f8f8;padding:12px;border-radius:8px;margin-top:12px"><strong>Roadmap</strong>
${roadmap}</pre>
      </div>
    `;

    const { data: sent, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL as string, // ej: "MFeliz <noreply@mfelizweb.com>"
      to: [process.env.RESEND_FROM_EMAIL as string], // llega a tu inbox
      replyTo: data.email || undefined,
      subject,
      html,
    });

    if (error) {
      console.error(error);
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: sent?.id });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
