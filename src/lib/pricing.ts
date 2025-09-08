type Service = "web" | "mobile" | "nfc" | "payments" | "maintenance";
type Scope = "basic" | "standard" | "pro";

type Params = {
  service: Service;
  scope: Scope;
  deadlineWeeks?: number;
  integrations?: string[];
};

const BASE: Record<Service, number> = {
  web: 1500,         // sitios bien hechos con SEO, CMS opcional
  mobile: 2600,      // apps con login, subs, push
  nfc: 250,          // por tarjeta o perfil con analíticas
  payments: 850,     // Stripe completo con seguridad
  maintenance: 250   // mensual (entry plan)
};


const SCOPE_MULT: Record<Scope, number> = {
  basic: 1.0,
  standard: 1.6,
  pro: 2.3
};

export function estimate(params: Params) {
  const { service, scope, deadlineWeeks = 2, integrations = [] } = params;
  let base = BASE[service] * SCOPE_MULT[scope];

  const uniqueIntegrations = Array.from(new Set(integrations));
  base *= (1 + uniqueIntegrations.length * 0.12);

  const timeline = Math.max(1, Math.floor(deadlineWeeks));
  const rush = timeline < 2 ? 1.25 : timeline < 3 ? 1.10 : 1.0;
  base *= rush;

  const low = Math.round(base * 0.9);
  const high = Math.round(base * 1.25);

  return { low, high, currency: "USD", timelineWeeks: timeline };
}
