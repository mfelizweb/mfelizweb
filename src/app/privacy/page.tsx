/* eslint-disable react/no-unescaped-entities */
// app/privacy/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | mfelizweb",
  description:
    "Privacy Policy for mfelizweb apps, including CDL Coach and Ciudadanía Ya. Learn what data we collect, how we use it, and your rights.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "September 7, 2025";
const SUPPORT_EMAIL = "support@mfelizweb.com";

export default function PrivacyPage() {
  return (
    <main className="min-h-[70vh] px-6 py-14 md:py-20">
      <div className="mx-auto w-full max-w-3xl">
        <header className="mb-10">
          <p className="text-xs uppercase tracking-widest text-neutral-500">Legal</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Privacy Policy</h1>
          <p className="mt-3 text-sm text-neutral-500">Last updated: {LAST_UPDATED}</p>
        </header>

        {/* Quick nav */}
        <nav aria-label="On this page" className="mb-8 rounded-2xl border border-neutral-200/60 bg-white/60 p-4 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/60">
          <p className="mb-2 text-xs font-medium text-neutral-500">On this page</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {[
              ["information-we-collect", "Information We Collect"],
              ["how-we-use-information", "How We Use Information"],
              ["data-sharing", "Data Sharing"],
              ["data-retention", "Data Retention"],
              ["your-rights", "Your Rights"],
              ["childrens-privacy", "Children’s Privacy"],
              ["security", "Security"],
              ["changes", "Changes"],
              ["contact", "Contact"],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={`#${href}`} className="underline-offset-2 hover:underline">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <section className="prose prose-neutral max-w-none dark:prose-invert">
          <p>
            <strong>mfelizweb</strong> ("we", "our", or "us") operates mobile applications including
            <em> CDL Coach</em>, <em>Ciudadanía Ya</em>, and other educational and productivity apps (collectively, the
            "Apps"). This Privacy Policy explains how we collect, use, and protect your information.
          </p>

          <h2 id="information-we-collect">Information We Collect</h2>
          <ul>
            <li>
              <strong>Personal Information.</strong> When you sign in, we may collect your email address, display name, and
              profile photo.
            </li>
            <li>
              <strong>Usage Data.</strong> We may collect anonymous data such as device type, OS version, app interactions,
              diagnostics, and crash reports.
            </li>
            <li>
              <strong>Payments.</strong> If you purchase premium features, payments are processed securely through third-party
              providers (such as Apple, Google, Stripe, or RevenueCat). We do not store credit card details.
            </li>
            <li>
              <strong>User Content.</strong> If an App allows saving preferences, progress, scores, or favorites, this data can be
              stored to provide the core functionality.
            </li>
          </ul>

          <h2 id="how-we-use-information">How We Use Information</h2>
          <ul>
            <li>To provide, maintain, and improve the Apps and their core features.</li>
            <li>To personalize your experience (e.g., language, progress, or content recommendations).</li>
            <li>To offer customer support and respond to requests.</li>
            <li>To process payments, manage subscriptions, and combat fraud/abuse.</li>
            <li>To comply with legal obligations and enforce our terms.</li>
          </ul>

          <h2 id="data-sharing">Data Sharing</h2>
          <p>
            We do <strong>not</strong> sell your personal data. We may share limited information only with trusted service
            providers who help us operate the Apps—for example: authentication, databases, analytics, subscriptions, and
            AI services (e.g., Firebase, Supabase, RevenueCat, Apple, Google, Stripe, OpenAI). These providers process
            data on our behalf under appropriate safeguards.
          </p>

          <h2 id="data-retention">Data Retention</h2>
          <p>
            We keep your information only as long as necessary to provide the services described in this Policy, resolve
            disputes, enforce agreements, and to the extent required by applicable law. When no longer needed, we take
            reasonable steps to delete or anonymize data.
          </p>

          <h2 id="your-rights">Your Rights</h2>
          <p>
            Depending on your location, you may have rights to access, rectify, delete, or export your personal
            information, and to object to or restrict certain processing. To exercise these rights, contact us at
            <Link href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</Link>. We may need to verify your identity before
            completing your request.
          </p>

          <h2 id="childrens-privacy">Children’s Privacy</h2>
          <p>
            Our Apps are not directed to children under 13. We do not knowingly collect personal information from
            children. If you believe a child has provided us personal data, please contact us so we can delete it.
          </p>

          <h2 id="security">Security</h2>
          <p>
            We use modern security practices—including encryption in transit, authentication, role-based access, and
            least-privilege controls—to protect your data. However, no method of transmission or storage is 100% secure.
          </p>

          <h2 id="changes">Changes</h2>
          <p>
            We may update this Policy from time to time. Updates will be posted on this page with a new Last updated
            date. If changes are material, we will take additional steps as required by law.
          </p>

          <h2 id="contact">Contact</h2>
          <p>
            If you have questions about this Privacy Policy or our data practices, contact us at
            {" "}
            <Link href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</Link>.
          </p>
        </section>

        <footer className="mt-12 rounded-2xl border border-neutral-200/60 bg-white/60 p-5 text-sm text-neutral-600 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-300">
          <p>
            This page applies to mfelizweb apps, including CDL Coach and Ciudadanía Ya. You can reuse this URL in
            App Store Connect and Google Play Console.
          </p>
        </footer>
      </div>
    </main>
  );
}
