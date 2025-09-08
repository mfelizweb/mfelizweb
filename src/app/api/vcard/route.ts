import { NextRequest } from "next/server";
export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fullName = searchParams.get("u") || "demo";
  const phone = "+1-929-240-6734";  

  const [firstName, lastName = ""] = fullName.split(" ");

  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${lastName};${firstName};;;`,
    `FN:${fullName}`,
    `TEL;TYPE=CELL:${phone}`,
    "END:VCARD"
  ].join("\n");

  return new Response(vcard, {
    headers: {
      "Content-Type": "text/vcard;charset=utf-8",
      "Content-Disposition": `attachment; filename="${fullName}.vcf"`
    }
  });
}
