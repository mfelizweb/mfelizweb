"use client";

import { useState } from "react";

type Service = "web" | "mobile" | "nfc" | "payments" | "maintenance";

export default function ChatEstimator() {
  const [service, setService] = useState<Service>("web");
  const [scope, setScope] = useState("basic");
  const [deadlineWeeks, setDeadlineWeeks] = useState(2);
  const [integrations, setIntegrations] = useState<string[]>([]);
  const [result, setResult] = useState<{ low: number; high: number; currency: string; timelineWeeks: number } | null>(null);
  const [loading, setLoading] = useState(false);

  async function onEstimate() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service, scope, deadlineWeeks, integrations })
      });
      const data = await res.json();
      setResult(data);
    } finally {
      setLoading(false);
    }
  }

  function toggleIntegration(name: string) {
    setIntegrations(prev => (prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]));
  }

  return (
    <div className="w-full max-w-2xl rounded-2xl border p-5 bg-white/50 dark:bg-white/5">
      <h3 className="text-xl font-semibold">Instant Estimator</h3>

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="text-sm">Service</label>
          <select value={service} onChange={e => setService(e.target.value as Service)} className="mt-1 w-full rounded-md border p-2 bg-transparent">
            <option value="web">Web</option>
            <option value="mobile">Mobile App</option>
            <option value="nfc">NFC Smart Cards</option>
            <option value="payments">E‑Payments</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        <div>
          <label className="text-sm">Project Scope</label>
          <select value={scope} onChange={e => setScope(e.target.value)} className="mt-1 w-full rounded-md border p-2 bg-transparent">
            <option value="basic">Basic — MVP or landing page</option>
            <option value="standard">Standard — core features and admin</option>
            <option value="pro">Pro — full product, auth, dashboard, scaling</option>
          </select>
        </div>

        <div>
          <label className="text-sm">Timeline (weeks)</label>
          <input
            type="number"
            min={1}
            max={12}
            value={deadlineWeeks}
            onChange={e => setDeadlineWeeks(parseInt(e.target.value || "1"))}
            className="mt-1 w-full rounded-md border p-2 bg-transparent"
          />
        </div>

        <div>
          <label className="text-sm">Integrations</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {["auth", "payments", "maps", "ai-chat", "notifications", "admin-dashboard", "analytics"].map(name => (
              <button
                key={name}
                type="button"
                onClick={() => toggleIntegration(name)}
                className={`text-sm rounded-full px-3 py-1 border transition ${
                  integrations.includes(name) ? "bg-slate-900 text-white dark:bg-white dark:text-black" : ""
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <button onClick={onEstimate} disabled={loading} className="rounded-full px-5 py-2 bg-slate-900 text-white dark:bg-white dark:text-black">
          {loading ? "Calculating..." : "Get Estimate"}
        </button>
        <span className="text-sm opacity-70">Instant estimate range</span>
      </div>

      {result && (
        <div className="mt-4 rounded-xl border p-4">
          <div className="text-sm opacity-70">Estimated Range</div>
          <div className="text-2xl font-semibold">
            ${result.low.toLocaleString()} – ${result.high.toLocaleString()} {result.currency}
          </div>
          <div className="text-sm mt-1">Estimated timeline: {result.timelineWeeks} weeks</div>
          <div className="mt-3 flex gap-2">
            <a href="/contact" className="rounded-md px-4 py-2 border">Book Now</a>
            <a href="/services" className="rounded-md px-4 py-2 border">View Services</a>
          </div>
        </div>
      )}
    </div>
  );
}
