import React, { useState, useEffect } from 'react';
import { getSiteContent } from '../../admin/adminStore';

export function CustomizationCTA() {
  const [cta, setCta] = useState(getSiteContent().cta);

  useEffect(() => {
    console.log('📌 [CustomizationCTA] Component mounted, initial CTA:', cta);

    const handler = () => {
      console.log('📌 [CustomizationCTA] Admin content updated event received');
      const updated = getSiteContent().cta;
      console.log('📌 [CustomizationCTA] Updated CTA:', updated);
      setCta(updated);
    };

    window.addEventListener('admin-content-updated', handler);
    window.addEventListener('storage', handler);

    return () => {
      window.removeEventListener('admin-content-updated', handler);
      window.removeEventListener('storage', handler);
    };
  }, []);
  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div
          className="relative p-16 md:p-20 rounded-[50px] overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(10, 10, 10, 0.9) 100%)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            boxShadow: '0 20px 60px rgba(212, 175, 55, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 100px rgba(212, 175, 55, 0.15)'
          }}
        >
          {/* Animated Glow Effect */}
          <div 
            className="absolute inset-0 opacity-30 pointer-events-none animate-pulse-slow"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.3) 0%, transparent 70%)'
            }}
          />

          <div className="relative z-10 text-center">
            {/* Title */}
            <h2
              className="text-5xl md:text-6xl mb-8 tracking-wide"
              style={{
                fontFamily: 'var(--font-caveat)',
                background: 'linear-gradient(135deg, #D4AF37 0%, #F6E27A 50%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 50px rgba(212, 175, 55, 0.4)',
                letterSpacing: '0.02em',
                filter: 'drop-shadow(0 4px 12px rgba(212, 175, 55, 0.3))'
              }}
            >
              {cta.heading}
            </h2>

            {/* Description */}
            <p
              className="text-xl md:text-2xl text-white/80 leading-relaxed mb-12 max-w-3xl mx-auto"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {cta.description}
            </p>

            {/* Button */}
            <button
              onClick={() => window.location.href = '#contact'}
              className="group relative px-14 py-5 rounded-full overflow-hidden transition-all duration-500 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #F6E27A 100%)',
                boxShadow: '0 15px 50px rgba(212, 175, 55, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
              }}
            >
              <span 
                className="relative z-10 text-black tracking-wider"
                style={{
                  fontFamily: 'var(--font-caveat)',
                  fontSize: '1.3rem'
                }}
              >
                {cta.buttonText}
              </span>
              
              {/* Hover Glow Animation */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-[#F6E27A] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  boxShadow: '0 0 40px rgba(246, 226, 122, 0.8)'
                }}
              />

              {/* Micro shine effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
                  transform: 'translateX(-100%)',
                  animation: 'shine 1.5s infinite'
                }}
              />
            </button>
          </div>

          {/* Corner Decorative Elements */}
          <div 
            className="absolute top-0 left-0 w-32 h-32 rounded-br-full"
            style={{
              background: 'radial-gradient(circle at top left, rgba(212, 175, 55, 0.2) 0%, transparent 70%)'
            }}
          />
          <div 
            className="absolute bottom-0 right-0 w-32 h-32 rounded-tl-full"
            style={{
              background: 'radial-gradient(circle at bottom right, rgba(246, 226, 122, 0.2) 0%, transparent 70%)'
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </section>
  );
}
