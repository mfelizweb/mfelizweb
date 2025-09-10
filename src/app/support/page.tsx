// app/support/page.tsx
export default function SupportPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-gray-800">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">CDL Coach - Support</h1>
      <p className="mb-6">
        If you need help or have questions about the CDL Coach app, we’re here for you.
      </p>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-10">
        <h2 className="text-xl font-semibold mb-2">📧 Email Support</h2>
        <p>
          <a
            href="mailto:support@mfelizweb.com"
            className="text-blue-700 hover:underline"
          >
            info@mfelizweb.com
          </a>
        </p>
        <p className="text-sm text-gray-500">We usually reply within 24 hours.</p>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

      <div className="space-y-6">
        <div>
          <p className="font-medium">1. How do I restore my subscription?</p>
          <p className="text-gray-700">
            You can restore your subscription from the app by going to{" "}
            <strong>Settings → Restore Purchases</strong>.
          </p>
        </div>

        <div>
          <p className="font-medium">2. How do I delete my account?</p>
          <p className="text-gray-700">
            You can request account deletion from within the app under{" "}
            <strong>Settings → Data & Privacy → Delete my account</strong>.
          </p>
        </div>

        <div>
          <p className="font-medium">3. How do I contact support?</p>
          <p className="text-gray-700">
            Simply email us at{" "}
            <a
              href="mailto:info@mfelizweb.com"
              className="text-blue-700 hover:underline"
            >
              info@mfelizweb.com
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
