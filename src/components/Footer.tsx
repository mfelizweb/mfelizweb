export default function Footer() {
  return (
    <footer className="border-t border-slate-200/50 dark:border-slate-700/50 mt-10">
      <div className="mx-auto max-w-7xl px-1 py-1 text-sm flex flex-col md:flex-row items-center justify-between gap-1 text-slate-600 dark:text-slate-400">
        <p>© {new Date().getFullYear()} mfelizweb. All rights reserved.</p>
        <div className="flex gap-4">
          <a
            href="https://wa.me/19292406734"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            WhatsApp
          </a>
          <a
            href="mailto:info@mfelizweb.com"
            className="hover:underline"
          >
            info@mfelizweb.com
          </a>
        </div>
      </div>
    </footer>
  );
}
