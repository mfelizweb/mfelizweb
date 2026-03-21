/* eslint-disable react/no-unescaped-entities */
// app/privacy/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | mfelizweb",
  description:
    "Privacy Policy for all apps and services provided by mfelizweb. Learn how we handle your data across our entire ecosystem.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "March 10, 2026";
const SUPPORT_EMAIL = "info@mfelizweb.com";
const BRAND_NAME = "mfelizweb";

export default function PrivacyPage() {
  const sections = [
    { id: "information-we-collect", label: "Information We Collect" },
    { id: "how-we-use-information", label: "How We Use Information" },
    { id: "data-sharing", label: "Data Sharing" },
    { id: "data-retention", label: "Data Retention" },
    { id: "your-rights", label: "Your Rights" },
    { id: "childrens-privacy", label: "Children’s Privacy" },
    { id: "security", label: "Security" },
    { id: "changes", label: "Changes" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <main className="min-h-[70vh] px-6 py-14 md:py-20">
      <div className="mx-auto w-full max-w-3xl">
        <header className="mb-10">
          <p className="text-xs uppercase tracking-widest text-neutral-500 font-medium">Legal & Transparency</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl text-neutral-900 dark:text-neutral-50">
            Global Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-neutral-500">Last updated: {LAST_UPDATED}</p>
        </header>

        {/* Quick nav */}
        <nav aria-label="On this page" className="mb-12 rounded-2xl border border-neutral-200/60 bg-white/60 p-5 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/60">
          <p className="mb-3 text-xs font-semibold uppercase text-neutral-400">On this page</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {sections.map(({ id, label }) => (
              <li key={id}>
                <a href={`#${id}`} className="text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <section className="prose prose-neutral max-w-none dark:prose-invert prose-headings:scroll-mt-20">
          <p className="leading-relaxed">
            <strong>{BRAND_NAME}</strong> ("we", "our", or "us") develops and operates a variety of mobile and web applications
            focused on education, productivity, and utility (collectively, our <strong>"Services"</strong>).
            This Privacy Policy applies to all applications published under the {BRAND_NAME} brand.
          </p>

          <h2 id="information-we-collect">Information We Collect</h2>
          <p>Depending on which of our Services you use, we may collect:</p>
          <ul>
            <li>
              <strong>Account Data:</strong> Email address, display name, and profile information provided via third-party
              auth providers (Google, Apple, etc.).
            </li>
            <li>
              <strong>Usage & Analytics:</strong> Anonymous diagnostic data, device type, OS version, and interaction
              metrics to help us fix bugs and improve performance.
            </li>
            <li>
              <strong>Financial Data:</strong> We do not store credit card numbers. All transactions are handled by
              secure third-party processors like Apple App Store, Google Play, Stripe, or RevenueCat.
            </li>
            <li>
              <strong>User-Generated Content:</strong> Study progress, scores, bookmarks, and preferences saved within
              our apps to sync your experience across devices.
            </li>
          </ul>

          <h2 id="how-we-use-information">How We Use Information</h2>
          <p>We process your data to:</p>
          <ul>
            <li>Provide and maintain the core functionality of our Services.</li>
            <li>Sync your progress and premium features across multiple devices.</li>
            <li>Provide technical support and respond to your inquiries.</li>
            <li>Analyze usage patterns to build better educational tools.</li>
            <li>Comply with legal obligations and prevent fraudulent activity.</li>
          </ul>

          <h2 id="data-sharing">Data Sharing</h2>
          <p>
            We <strong>never sell</strong> your personal information. We only share data with essential service
            providers that enable our apps to function, including:
          </p>
          <ul>
            <li><strong>Infrastructure:</strong> Firebase, Supabase, or AWS for hosting and databases.</li>
            <li><strong>Subscriptions:</strong> RevenueCat, Apple, and Google for managing your purchases.</li>
            <li><strong>Intelligence:</strong> OpenAI or similar LLM providers (only if the specific app uses AI features).</li>
          </ul>

          <h2 id="data-retention">Data Retention</h2>
          <p>
            We retain your personal information only for as long as your account is active or as needed to provide
            you with our Services. You can request data deletion at any time by contacting us.
          </p>

          <h2 id="your-rights">Your Rights</h2>
          <p>
            Regardless of your location, we provide tools to access, update, or delete your data.
            If you wish to exercise your rights under GDPR, CCPA, or other regional laws, please email us at
            <Link href={`mailto:${SUPPORT_EMAIL}`} className="ml-1 font-medium underline transition-opacity hover:opacity-70">
              {SUPPORT_EMAIL}
            </Link>.
          </p>

          <h2 id="childrens-privacy">Children’s Privacy</h2>
          <p>
            Our Services are generally intended for a general audience. We do not knowingly collect personal
            information from children under 13 (or 16 in certain jurisdictions). If you become aware that a child
            has provided us with personal data, please contact us immediately.
          </p>

          <h2 id="security">Security</h2>
          <p>
            We implement industry-standard security measures, including <strong>SSL/TLS encryption</strong> for all
            data in transit and secure encrypted databases for storage.
          </p>

          <h2 id="changes">Changes to this Policy</h2>
          <p>
            We may update this Global Privacy Policy as we launch new apps. The latest version will always be
            available at this URL with an updated "Last modified" date.
          </p>

          <h2 id="contact">Contact</h2>
          <p>
            Questions? Requests? Feedback? Reach out to us at:
            <Link href={`mailto:${SUPPORT_EMAIL}`} className="ml-1 font-medium underline transition-opacity hover:opacity-70">
              {SUPPORT_EMAIL}
            </Link>
          </p>
        </section>

        <footer className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <div className="rounded-2xl bg-neutral-50 p-6 dark:bg-neutral-900/50">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              This Privacy Policy is legally binding for all software products published by <strong>{BRAND_NAME}</strong>.
              By using any of our applications, you agree to the terms outlined above.
              You may provide this URL as the official Privacy Policy link in the Apple App Store and Google Play Console.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}