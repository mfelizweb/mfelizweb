// app/portfolio/page.tsx
"use client";

export default function PortfolioPage() {
  const projects = [
    {
      title: "Adondeir App",
      tags: ["Angular", "Ionic", "Firebase"],
      description: "Tourism discovery app with location-based listings and offline support.",
      results: ["Improved tourist engagement across 3+ regions", "Integrated local storage and geolocation"],
    },
    {
      title: "Hablando de Vehículos",
      tags: ["Angular", "Ionic", "Firebase"],
      description: "Mobile app for automotive news and podcast episodes.",
      results: ["Boosted daily views by 40%", "Offline-ready for video/audio playback"],
    },
    {
      title: "Rule Builder (FireRules)",
      tags: ["Next.js", "Supabase", "OpenAI"],
      description: "Visual rule engine to generate Firestore security rules using AI.",
      results: ["First visual tool of its kind for Firebase", "Automated validation with GPT-4"],
    },
    {
      title: "CDL Coach",
      tags: ["React Native", "AsyncStorage", "RevenueCat"],
      description: "Bilingual mobile app to prepare for the U.S. CDL exam. AI-generated study flow and score tracking.",
      results: ["Reduced study time by 50%", "Subscription-ready with in-app purchases"],
    },
    {
      title: "Academia Chon Ji",
      tags: ["WordPress"],
      description: "Official website for a Taekwondo and Arts academy in DR, with automated schedule updates.",
      results: ["+70% increase in contact form leads", "Integrated WhatsApp and Google Maps"],
    },
    {
      title: "Coin Sentinel",
      tags: ["Angular", "Node.js", "Express"],
      description: "Crypto wallet alert system with real-time monitoring and secure notifications.",
      results: ["Custom alerts for 12+ blockchains", "Reduced false positives using custom filters"],
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Portfolio</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300 text-lg">
          Selected work built with real-world impact.
        </p>
      </div>

      <div className="mt-12 grid md:grid-cols-2 gap-8">
        {projects.map((p) => (
          <div
            key={p.title}
            className="rounded-2xl border border-white/10 bg-white/40 dark:bg-white/5 p-6 backdrop-blur hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{p.title}</h3>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-medium rounded-full border border-white/20 bg-white/10 px-3 py-1 text-white"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">{p.description}</p>

            <ul className="mt-4 list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
              {p.results.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
