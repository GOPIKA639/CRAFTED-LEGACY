import React, { useState, useEffect } from 'react';
import { getSiteContent } from '../../admin/adminStore';

export function CustomizationHeader() {
  const [customization, setCustomization] = useState(getSiteContent().customization);

  useEffect(() => {
    const handler = () => setCustomization(getSiteContent().customization);
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
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-[500px] h-[500px] rounded-full opacity-10 animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, transparent 70%)',
            top: '10%',
            left: '5%',
            animation: 'float 20s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute w-[400px] h-[400px] rounded-full opacity-10 animate-float-delayed"
          style={{
            background: 'radial-gradient(circle, rgba(246, 226, 122, 0.3) 0%, transparent 70%)',
            bottom: '10%',
            right: '5%',
            animation: 'float 25s ease-in-out infinite'
          }}
        />
      </div>

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
          {customization.headerTitle || 'Customization & Branding'}
        </h1>

        {/* Subtitle */}
        <p 
          className="text-xl md:text-2xl mb-8 text-white/75 max-w-4xl mx-auto leading-relaxed"
          style={{ fontFamily: 'var(--font-roboto)' }}
        >
          {customization.headerDescription}
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
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
      `}</style>
    </section>
  );
}