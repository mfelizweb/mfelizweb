export default function MaintenanceServicePage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
        Maintenance & Support
      </h1>
      <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
        Monthly plans to keep everything stable, secure, and fast.
      </p>

      <ul className="mt-8 space-y-4 text-base text-gray-700 dark:text-gray-200">
        <li className="flex items-start gap-3">
          <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
          Regular updates, backups, and monitoring
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
          Incident-based support
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
          Scheduled monthly improvements
        </li>
      </ul>
    </section>
  );
}
