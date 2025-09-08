export default function PaymentsServicePage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
        E‑Payments Integration
      </h1>
      <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
        Complete setup of Stripe and Square — secure and production‑ready.
      </p>

      <ul className="mt-8 space-y-4 text-base text-gray-700 dark:text-gray-200">
        <li className="flex items-start gap-3">
          <span className="mt-1 h-2 w-2 rounded-full bg-yellow-400" />
          Payment links and embedded checkout
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1 h-2 w-2 rounded-full bg-yellow-400" />
          Subscription plans and invoicing
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1 h-2 w-2 rounded-full bg-yellow-400" />
          2025 security best practices built-in
        </li>
      </ul>
    </section>
  );
}
