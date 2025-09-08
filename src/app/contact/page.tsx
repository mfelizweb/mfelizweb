import contactAction from "@/actions/contactAction";

export default function ContactPage() {
 

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Contact</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">
        Tell me about your project and I’ll get back to you shortly.
      </p>

      <form action={contactAction}  className="mt-6 space-y-4">
        <div>
          <label className="text-sm">Name</label>
          <input
            name="name"
            required
            className="mt-1 w-full rounded-md border p-2 bg-transparent"
          />
        </div>

        <div>
          <label className="text-sm">Email</label>
          <input
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-md border p-2 bg-transparent"
          />
        </div>

        <div>
          <label className="text-sm">Message</label>
          <textarea
            name="message"
            rows={5}
            required
            className="mt-1 w-full rounded-md border p-2 bg-transparent"
          />
        </div>

        <button className="rounded-full px-6 py-3 bg-slate-900 text-white dark:bg-white dark:text-black">
          Send Message
        </button>
      </form>
    </section>
  );
}
