import { notFound } from "next/navigation";
import QRCode from "react-qr-code";
import Image from "next/image";

type Props = {
  params: { username: string };
};

export default function CardPage({ params }: Props) {
  const username = params.username?.toLowerCase();

  const profile = demoProfiles[username];

  if (!profile) return notFound();

  const vcardUrl = `/api/vcard?u=${encodeURIComponent(username)}`;
  const qrValue = `https://mfelizweb.com/card/${username}`;

  return (
    <section className="mx-auto max-w-md px-4 py-12">
      <div className="rounded-2xl border p-6 bg-white/80 dark:bg-white/5 text-center shadow-lg">
      <Image
  src={profile.avatarUrl}         
  alt={`${profile.name} avatar`}
  width={800}                 
  height={450}               
  className="rounded-2xl w-full h-auto"
/>
 
        <h1 className="mt-4 text-2xl font-bold">{profile.name} Driver</h1>
        <p className="text-slate-600 dark:text-slate-300">{profile.title}</p>

        <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
          <a
            href={`https://wa.me/${profile.whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            className="rounded-md border px-4 py-2 hover:bg-slate-100 dark:hover:bg-white/10"
          >
            WhatsApp
          </a>
          <a
            href={`tel:${profile.phone}`}
            className="rounded-md border px-4 py-2 hover:bg-slate-100 dark:hover:bg-white/10"
          >
            Call
          </a>
          <a
            href={profile.calendarUrl}
            target="_blank"
            className="rounded-md border px-4 py-2 hover:bg-slate-100 dark:hover:bg-white/10"
          >
            Schedule
          </a>
          <a
            href={vcardUrl}
            className="rounded-md border px-4 py-2 hover:bg-slate-100 dark:hover:bg-white/10"
          >
            Save Contact
          </a>
        </div>

        <div className="mt-6">
          <a
            href={profile.primaryCtaUrl}
            className="inline-block rounded-full px-6 py-3 bg-slate-900 text-white dark:bg-white dark:text-black hover:opacity-90"
          >
            {profile.primaryCtaLabel}
          </a>
        </div>

        <div className="mt-8">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
            Scan QR
          </p>
          <div className="mx-auto w-28 bg-white p-2 rounded-md">
            <QRCode value={qrValue} size={112} />
          </div>
        </div>
      </div>
    </section>
  );
}

const demoProfiles: Record<
  string,
  {
    name: string;
    title: string;
    avatarUrl: string;
    whatsapp: string;
    phone: string;
    calendarUrl: string;
    primaryCtaLabel: string;
    primaryCtaUrl: string;
  }
> = {
  demo: {
    name: "jhon smith",
    title: "Full Stack Developer",
    avatarUrl: "https://api.dicebear.com/8.x/avataaars/svg?seed=demo",
    whatsapp: "+1 1222222",
    phone: "+222222",
    calendarUrl: "https://cal.com/mfeliz",
    primaryCtaLabel: "Let's build your app",
    primaryCtaUrl: "https://wa.me/1111111111"
  }
};
