import React, { useState, useEffect } from 'react';
import { getSiteContent } from '../../admin/adminStore';

// Import craftsmanship image
import craftsmanshipImage from 'figma:asset/b4028c8570a789f1a093ab2adadbe21482d9e04f.png';

export function CraftsmanshipHeritage() {
  const [sectionHeaders, setSectionHeaders] = useState(getSiteContent().sectionHeaders);
  const [about, setAbout] = useState(getSiteContent().about);

  useEffect(() => {
    const handler = () => setSectionHeaders(getSiteContent().sectionHeaders);
    window.addEventListener('admin-content-updated', handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('admin-content-updated', handler);
      window.removeEventListener('storage', handler);
    };
  }, []);
  useEffect(() => {
    const handler = () => setAbout(getSiteContent().about);
    window.addEventListener('admin-content-updated', handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('admin-content-updated', handler);
      window.removeEventListener('storage', handler);
    };
  }, []);
  return (
    <section 
      className="py-32 px-6 relative"
      style={{
        background: 'linear-gradient(180deg, #121212 0%, #0A0A0A 100%)',
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
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Craftsmanship Image */}
          <div
            className="relative rounded-[40px] overflow-hidden backdrop-blur-xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              minHeight: '500px'
            }}
          >
            {/* Image */}
            <img 
              src={craftsmanshipImage} 
              alt="Craftsmanship - Premium Leather Belt"
              className="w-full h-full object-cover"
              style={{
                minHeight: '500px'
              }}
            />

            {/* Gold Light Streak Overlay */}
            <div 
              className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, transparent 0%, rgba(212, 175, 55, 0.2) 50%, transparent 100%)'
              }}
            />
          </div>

          {/* Right: Content Block */}
          <div
            className="relative p-12 rounded-[40px] backdrop-blur-xl flex flex-col justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Title */}
            <h2 
              className="text-4xl md:text-5xl mb-8 tracking-wide"
              style={{
                fontFamily: 'Georgia, serif',
                background: 'linear-gradient(135deg, #ffffff 0%, #D4AF37 50%, #F6E27A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {sectionHeaders.craftsmanshipTitle}
            </h2>

            {/* Decorative Line */}
            <div 
              className="h-[2px] w-32 mb-8 rounded-full"
              style={{
                background: 'linear-gradient(90deg, #D4AF37 0%, transparent 100%)',
                boxShadow: '0 0 15px rgba(212, 175, 55, 0.3)'
              }}
            />

            {/* Body Text */}
            <div className="space-y-6 text-white/80 leading-loose">
                <p style={{ fontFamily: 'Georgia, serif', fontSize: '1.0625rem', lineHeight: '1.9', whiteSpace: 'pre-wrap' }}>
                  {about.heritageDescription}
                </p>

                {/* If heritageBlocks exist, render them as additional paragraphs */}
                {(about.heritageBlocks || []).map((blk, i) => (
                  <p key={i} style={{ fontFamily: 'Georgia, serif', fontSize: '1.0625rem', lineHeight: '1.9', whiteSpace: 'pre-wrap' }}>
                    {blk}
                  </p>
                ))}
            </div>

            {/* Corner Accent */}
            <div 
              className="absolute bottom-0 right-0 w-32 h-32 rounded-tl-full opacity-20 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at bottom right, rgba(212, 175, 55, 0.4) 0%, transparent 70%)'
              }}
            />
          </div>
        </div>

        {/* Soft Gold Light Streak Between Cards */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[400px] opacity-10 pointer-events-none blur-3xl"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.5) 50%, transparent 100%)'
          }}
        />
      </div>
    </section>
  );
}