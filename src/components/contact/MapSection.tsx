import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import { getSiteContent } from '../../admin/adminStore';
import { getIconComponent } from '../../admin/iconOptions';

export function MapSection() {
  const [contact, setContact] = useState(() => getSiteContent().contact ?? {});
  const [isContentReady, setIsContentReady] = useState(false);
  const safeContact = contact ?? {};
  const safeContactInfo = safeContact.contactInfo ?? {};
  const AddressIcon = getIconComponent(safeContactInfo.icons?.address || 'map-pin', MapPin);

  useEffect(() => {
    const handler = () => setContact(getSiteContent().contact ?? {});
    window.addEventListener('admin-content-updated', handler);
    window.addEventListener('storage', handler);
    setIsContentReady(true);
    return () => {
      window.removeEventListener('admin-content-updated', handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  // Exact Google Maps embed and directions URLs
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.279768677277!2d80.191636!3d13.080929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5264002633005b%3A0x6295333642340552!2sW48V%2BGW%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1703952000000!5m2!1sen!2sin";
  const directionUrl = safeContact.mapSection?.directionUrl || "https://www.google.com/maps/search/?api=1&query=W48V%2BGW+Chennai,+Tamil+Nadu";
  const plusCode = safeContact.mapSection?.plusCode || 'W48V+GW Chennai, Tamil Nadu';

  if (!isContentReady) {
    return (
      <section className="py-20 px-6 relative" style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #0f0f0f 100%)' }}>
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-white/70 text-sm tracking-wide">Loading map details…</p>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="py-20 px-6 relative"
      style={{
        background: 'linear-gradient(180deg, #0A0A0A 0%, #0f0f0f 100%)',
        backgroundImage: `
          repeating-linear-gradient(
            45deg,
            rgba(139, 69, 19, 0.02) 0px,
            rgba(139, 69, 19, 0.02) 2px,
            transparent 2px,
            transparent 4px
          ),
          repeating-linear-gradient(
            -45deg,
            rgba(139, 69, 19, 0.02) 0px,
            rgba(139, 69, 19, 0.02) 2px,
            transparent 2px,
            transparent 4px
          )
        `
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Card Container */}
        <div
          className="relative p-6 rounded-[32px] backdrop-blur-xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 60px rgba(212, 175, 55, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Title */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <div 
              className="p-2.5 rounded-full"
              style={{
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(246, 226, 122, 0.15) 100%)',
                border: '1px solid rgba(212, 175, 55, 0.3)'
              }}
            >
              <AddressIcon className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <h3 
              className="text-xl tracking-wider uppercase"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Location
            </h3>
          </div>

          {/* Plus Code Display */}
          <div className="text-center mb-4">
            <p className="text-white/70 text-sm tracking-wide">
              Plus Code: <span className="text-[#D4AF37]">{plusCode}</span>
            </p>
          </div>

          {/* Map Frame - Updated with exact location */}
          <div 
            className="relative rounded-[28px] overflow-hidden mb-6"
            style={{
              height: '450px',
              border: '2px solid rgba(212, 175, 55, 0.2)',
              boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.3)'
            }}
          >
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Crafted Legacy Location - W48V+GW Chennai"
            />
            
            {/* Fallback placeholder if map doesn't load */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0A0A0A] flex items-center justify-center pointer-events-none"
              style={{ zIndex: -1 }}
            >
              <div className="text-center text-white/30 p-12">
                <AddressIcon className="w-16 h-16 mx-auto mb-4 text-[#D4AF37]" />
                <p className="text-lg tracking-wider">Map Loading...</p>
                <p className="text-sm mt-2">W48V+GW Chennai, Tamil Nadu</p>
              </div>
            </div>
          </div>

          {/* Get Directions Button */}
          <div className="flex justify-center">
            <a
              href={directionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-10 py-3.5 rounded-full overflow-hidden transition-all duration-500 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #F6E27A 100%)',
                boxShadow: '0 10px 30px rgba(212, 175, 55, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
              }}
            >
              <span className="relative z-10 text-black text-sm tracking-wider">
                Get directions
              </span>
              <div 
                className="absolute inset-0 bg-gradient-to-r from-[#F6E27A] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  boxShadow: '0 0 30px rgba(246, 226, 122, 0.6)'
                }}
              />
            </a>
          </div>

          {/* Decorative Glow Border Effect */}
          <div 
            className="absolute inset-0 rounded-[32px] pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, transparent 50%, rgba(246, 226, 122, 0.1) 100%)',
              mixBlendMode: 'overlay'
            }}
          />
        </div>

        {/* Subtle background glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-10 pointer-events-none blur-3xl -z-10"
          style={{
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, transparent 70%)'
          }}
        />
      </div>
    </section>
  );
}