export default function NFCServicePage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
        NFC Smart Contact Cards
      </h1>
      <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
        Personalized NFC cards linked to dynamic landing pages with QR and actionable CTAs.
      </p>

      <ul className="mt-8 space-y-4 text-base text-gray-700 dark:text-gray-200">
        <li className="flex items-start gap-3">
          <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
          Editable profiles at <code>/card/[username]</code>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
          One-click buttons: WhatsApp, call, vCard, calendar, payments
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
          Touch & scan analytics dashboard
        </li>
      </ul>
    </section>
  );
}
