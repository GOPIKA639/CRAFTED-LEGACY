import React, { useState, useEffect } from 'react';
import { getSiteContent } from '../../admin/adminStore';

export function AboutHeader() {
  const [sectionHeaders, setSectionHeaders] = useState(getSiteContent().sectionHeaders);

  useEffect(() => {
    const handler = () => setSectionHeaders(getSiteContent().sectionHeaders);
    window.addEventListener('admin-content-updated', handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('admin-content-updated', handler);
      window.removeEventListener('storage', handler);
    };
  }, []);
  return (
    <section 
      className="pt-32 pb-20 px-6 relative"
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
      <div className="max-w-5xl mx-auto text-center relative">
        {/* Title */}
        <h1 
          className="text-5xl md:text-6xl mb-6 tracking-wide"
          style={{
            fontFamily: 'var(--font-libre)',
            background: 'linear-gradient(135deg, #ffffff 0%, #D4AF37 50%, #F6E27A 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 60px rgba(212, 175, 55, 0.2)'
          }}
        >
          {sectionHeaders.aboutPageTitle}
        </h1>

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

        {/* Glow Effect */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] opacity-20 pointer-events-none blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, transparent 70%)'
          }}
        />
      </div>
    </section>
  );
}