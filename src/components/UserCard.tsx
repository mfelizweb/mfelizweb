'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { Copy, Mail, Phone,  Globe, X, ChevronLeft, ChevronRight, Car } from 'lucide-react';
import { DriverProfile } from '@/types/DriverProfile';

export default function UserCard({ profile }: { profile: DriverProfile }) {
  const {
    name,
    title,
    city,
    vehicle,
    avatar,
    website,
    email,
    phone,
    whatsapp,
 
    zelle,
    cardColor,
    carPhotos = [],
    frase,
    showVCardDownload,
  } = profile;

  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const handleMouseEnter = () => {
      card.classList.remove('shine');
      void card.offsetWidth;
      card.classList.add('shine');
    };
    card.addEventListener('mouseenter', handleMouseEnter);
    return () => card.removeEventListener('mouseenter', handleMouseEnter);
  }, []);

  function saveVCard() {
    const vc = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${name}`,
      `N:${name};;;;`,
      title ? `ORG:${title}` : '',
      email ? `EMAIL;TYPE=INTERNET;TYPE=WORK:${email}` : '',
      phone ? `TEL;TYPE=CELL:${phone}` : '',
      city ? `ADR;TYPE=WORK:;;${city};;;;` : '',
      website ? `URL:${website}` : '',
      'END:VCARD',
    ].filter(Boolean).join('\n');

    const blob = new Blob([vc], { type: 'text/vcard;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.setAttribute('download', `${name!.toLowerCase().replace(/\s+/g, '-')}.vcf`);
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 250);
  }

  const [showGallery, setShowGallery] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const hasPhotos = carPhotos.length > 0;
  const currentPhoto = useMemo(() => hasPhotos ? carPhotos[currentIdx] : '', [carPhotos, currentIdx, hasPhotos]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 flex items-center justify-center px-4">
      <div
        ref={cardRef}
        className="shine-card bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 w-full max-w-md mx-auto p-7 flex flex-col items-center gap-5 relative overflow-hidden"
      >
        <div className="shine-glow pointer-events-none" aria-hidden />

        {avatar && (
          <Image
            src={avatar}
            alt={"mfelizweb"}
            width={112}
            height={112}
            className="w-28 h-28 rounded-full object-cover border-4 shadow-lg mb-2"
            style={{ borderColor: cardColor }}
            priority
          />
        )}
        <h1 className="text-3xl font-bold text-white text-center">{name} Driver</h1>
        {title && <p className="text-lg text-white/80 text-center">{title}</p>}
        {city && <p className="text-sm text-white/60 mb-1 text-center">{city}</p>}
{vehicle && <p className="text-sm text-white/60 mb-1 text-center">{vehicle}</p>}
        {frase && <p className="text-sm italic text-white/50 text-center">“{frase}”</p>}

        <div className="flex flex-wrap justify-center gap-4 mt-2 mb-3">
          {website && (
            <a href={website} className="group" target="_blank" rel="noopener noreferrer" aria-label="Website">
              <Globe className="w-6 h-6"   />
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`} className="group" aria-label="Email">
              <Mail className="w-6 h-6"  />
            </a>
          )}
          {phone && (
            <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="group" aria-label="Phone">
              <Phone className="w-6 h-6"  />
            </a>
          )}
 
        </div>

     <div className="w-full flex flex-col gap-4 mb-4">
 
 

  {zelle && (
    <div>
      <label className="block text-xs text-white/60 mb-1">Zelle</label>
      <div className="flex items-center justify-between bg-black/30 rounded-lg px-3 py-2">
        <span className="text-white text-sm truncate">{zelle}</span>
        <button onClick={() => navigator.clipboard.writeText(zelle)} aria-label="Copy Zelle">
          <Copy className="w-5 h-5 text-white/60 hover:text-white" />
        </button>
      </div>
    </div>
  )}

  {whatsapp && (
    <div>
      <label className="block text-xs text-white/60 mb-1">WhatsApp</label>
      <a
        href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between bg-black/30 rounded-lg px-3 py-2 hover:bg-black/40 transition"
      >
        <span className="text-white text-sm truncate">{whatsapp}</span>
        <span className="text-white/60 text-sm">Open</span>
      </a>
    </div>
  )}
</div>

        {showVCardDownload && (
          <button
            onClick={saveVCard}
            className="mt-1 py-2 px-5 rounded-xl text-white font-semibold flex items-center gap-2 shadow active:scale-95 transition-all"
            style={{ backgroundColor: cardColor }}
          >
            <Copy className="w-5 h-5" />
            Save Contact
          </button>
        )}

        {hasPhotos && (
          <button
            onClick={() => setShowGallery(true)}
            className="mt-3 flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-semibold text-white"
            style={{ backgroundColor: cardColor }}
          >
            <Car className="w-4 h-4" />
            See Photos
          </button>
        )}

 
        {showGallery && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center">
                 <button
                onClick={() => setShowGallery(false)}
                className="absolute top-58 right-3 z-10 bg-black/50 p-1 rounded-full text-white"
              >
                <X className="w-5 h-5" />
              </button>
            <div className="relative w-full max-w-xl mx-auto p-4">
          
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
                <Image
                  src={currentPhoto}
                  alt={`Car photo`}
                  fill
                  className="object-cover"
                />
                {carPhotos.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentIdx((i) => (i - 1 + carPhotos.length) % carPhotos.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 p-2 rounded-full text-white"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setCurrentIdx((i) => (i + 1) % carPhotos.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 p-2 rounded-full text-white"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          .shine-glow {
            position: absolute;
            top: -60%;
            left: -80%;
            width: 70%;
            height: 220%;
            background: linear-gradient(
              120deg,
              rgba(255, 255, 255, 0.12) 0%,
              rgba(255, 255, 255, 0.36) 50%,
              rgba(255, 255, 255, 0.07) 100%
            );
            filter: blur(2px);
            border-radius: 32px;
            transform: rotate(8deg);
            animation: shine 2.1s cubic-bezier(0.7, 0.15, 0.41, 0.92) 1;
            pointer-events: none;
            z-index: 2;
          }
          .shine-card:hover .shine-glow {
            animation: shine 1.2s cubic-bezier(0.7, 0.15, 0.41, 0.92) 1;
          }
          @keyframes shine {
            0% {
              left: -80%;
              opacity: 0.1;
            }
            20% {
              opacity: 0.28;
            }
            50% {
              left: 100%;
              opacity: 0.4;
            }
            90% {
              opacity: 0.13;
            }
            100% {
              left: 140%;
              opacity: 0.04;
            }
          }
        `}</style>
      </div>
    </main>
  );
}
