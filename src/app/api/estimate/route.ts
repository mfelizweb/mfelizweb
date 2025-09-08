import { NextRequest } from "next/server";
import { estimate } from "@/lib/pricing";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { service, scope, deadlineWeeks, integrations } = body || {};
  const result = estimate({ service, scope, deadlineWeeks, integrations });
  return new Response(JSON.stringify(result), { headers: { "Content-Type": "application/json" } });
}
