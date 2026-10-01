import React, { useState, useEffect } from 'react';
import { getSiteContent } from '../admin/adminStore';

export function CTA() {
  const [content, setContent] = useState(getSiteContent().cta);

  useEffect(() => {
    const handler = () => setContent(getSiteContent().cta);
    window.addEventListener('admin-content-updated', handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('admin-content-updated', handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div
          className="relative p-20 md:p-24 rounded-[40px] overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(10, 10, 10, 0.9) 100%)',
            border: '1.5px solid rgba(212, 175, 55, 0.3)',
            boxShadow: '0 25px 70px rgba(212, 175, 55, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 120px rgba(212, 175, 55, 0.2)'
          }}
        >
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{ background: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.4) 0%, transparent 70%)' }}
          />

          <div className="relative z-10 text-center">
            <h2
              className="text-6xl md:text-7xl mb-10"
              style={{
                fontFamily: 'var(--font-caveat)',
                background: 'linear-gradient(135deg, #D4AF37 0%, #F6E27A 50%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                letterSpacing: '0.02em',
                filter: 'drop-shadow(0 4px 12px rgba(212, 175, 55, 0.4))'
              }}
            >{content.heading}</h2>

            <p
              className="text-xl md:text-2xl text-white/85 leading-relaxed mb-14 max-w-3xl mx-auto"
              style={{ fontFamily: 'var(--font-roboto)' }}
            >{content.description}</p>

            <button
              onClick={() => window.location.href = '#contact'}
              className="group relative px-16 py-6 rounded-full overflow-hidden transition-all duration-500 hover:scale-105 focus:outline-none"
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #F6E27A 100%)',
                boxShadow: '0 18px 55px rgba(212, 175, 55, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                fontFamily: 'var(--font-caveat)', fontSize: '1.3rem', outline: 'none'
              }}
            >
              <span className="relative z-10 text-black tracking-wider">{content.buttonText}</span>
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#F6E27A] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ boxShadow: '0 0 50px rgba(246, 226, 122, 0.9)' }}
              />
            </button>
          </div>

          <div className="absolute top-0 left-0 w-40 h-40 rounded-br-full"
            style={{ background: 'radial-gradient(circle at top left, rgba(212, 175, 55, 0.25) 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 right-0 w-40 h-40 rounded-tl-full"
            style={{ background: 'radial-gradient(circle at bottom right, rgba(246, 226, 122, 0.25) 0%, transparent 70%)' }} />
        </div>
      </div>
    </section>
  );
}