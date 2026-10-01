import React, { useState, useEffect } from 'react';
import { getSiteContent } from '../../admin/adminStore';

export function ContactHeader() {
  const [sectionHeaders, setSectionHeaders] = useState(() => getSiteContent().sectionHeaders ?? {});
  const safeSectionHeaders = sectionHeaders ?? {};
  const pageTitle = safeSectionHeaders.contactPageTitle || "We're here to assist";
  const pageSubtitle = safeSectionHeaders.contactPageSubtitle || "Whether you're exploring products or personalization, we're here to help you craft meaningful corporate gifts.";

  useEffect(() => {
    const handler = () => setSectionHeaders(getSiteContent().sectionHeaders ?? {});
    window.addEventListener('admin-content-updated', handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('admin-content-updated', handler);
      window.removeEventListener('storage', handler);
    };
  }, []);
  return (
    <section 
      className="pt-40 pb-32 px-6 relative overflow-hidden"
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
      {/* Breathing Light Animation */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] opacity-20 pointer-events-none blur-3xl animate-breathe"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, transparent 70%)'
        }}
      />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Title */}
        <h1 
          className="text-5xl md:text-6xl mb-8 tracking-wide"
          style={{
            fontFamily: 'var(--font-libre)',
            background: 'linear-gradient(135deg, #ffffff 0%, #D4AF37 50%, #F6E27A 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 60px rgba(212, 175, 55, 0.2)'
          }}
        >
          {pageTitle}
        </h1>

        {/* Subtitle */}
        <p 
          className="text-xl md:text-2xl mb-8 text-white/75 max-w-4xl mx-auto leading-relaxed"
          style={{ fontFamily: 'var(--font-roboto)' }}
        >
          {pageSubtitle}
        </p>

        {/* Decorative Underline */}
        <div className="flex justify-center">
          <div 
            className="h-[2px] w-48 rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, #D4AF37 50%, transparent 100%)',
              boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)'
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes breathe {
          0%, 100% {
            opacity: 0.15;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.25;
            transform: translate(-50%, -50%) scale(1.1);
          }
        }
        .animate-breathe {
          animation: breathe 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}