export default function MobileServicePage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
        Mobile App Development
      </h1>
      <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
        Cross-platform apps for iOS & Android built with React Native / Expo — deployment and long-term support included.
      </p>

      <ul className="mt-8 space-y-4 text-base text-gray-700 dark:text-gray-200">
        <li className="flex items-start gap-3">
          <span className="mt-1 h-2 w-2 rounded-full bg-indigo-400" />
          Authentication, push notifications, maps, offline mode
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1 h-2 w-2 rounded-full bg-indigo-400" />
          Subscriptions via RevenueCat and in‑app purchases
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1 h-2 w-2 rounded-full bg-indigo-400" />
          Backend options: Supabase, Firebase, or custom Node APIs
        </li>
      </ul>
    </section>
  );
}
