"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function contactAction(formData: FormData) {
  const name = String(formData.get("name") || "");
  const email = String(formData.get("email") || "");
  const message = String(formData.get("message") || "");

  if (!name || !email || !message) {
    throw new Error("All fields are required.");
  }

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,  // e.g. hello@mfelizweb.com
    to: "info@mfelizweb.com",
    subject: `New Contact Message from ${name}`,
    replyTo: email,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`
  });
}
