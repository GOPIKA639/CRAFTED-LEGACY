import React, { useState, useEffect } from 'react';
import { getSiteContent } from '../../admin/adminStore';

export function OurStory() {
  const [about, setAbout] = useState(getSiteContent().about);

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
        background: 'linear-gradient(180deg, #0f0f0f 0%, #0A0A0A 100%)',
        backgroundImage: `
          repeating-linear-gradient(
            45deg,
            rgba(139, 69, 19, 0.03) 0px,
            rgba(139, 69, 19, 0.03) 2px,
            transparent 2px,
            transparent 4px
          ),
          repeating-linear-gradient(
            -45deg,
            rgba(139, 69, 19, 0.03) 0px,
            rgba(139, 69, 19, 0.03) 2px,
            transparent 2px,
            transparent 4px
          )
        `
      }}
    >
      <div className="max-w-5xl mx-auto">
        <div
          className="p-12 md:p-16 rounded-[45px] backdrop-blur-xl relative"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Content */}
          <div className="space-y-8 text-white/85 leading-loose tracking-wide">
            {(about.storyBlocks || []).map((blk, idx) => (
              <p key={idx} style={{ fontFamily: 'Georgia, serif', fontSize: '1.125rem', lineHeight: '2' }}>
                {blk}
              </p>
            ))}

            <p 
              className="pt-4"
              style={{ 
                fontFamily: 'Georgia, serif', 
                fontSize: '1.25rem', 
                lineHeight: '2',
                background: 'linear-gradient(135deg, #ffffff 0%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              For us, it's more than business.<br />
              It's legacy—crafted with purpose.
            </p>
          </div>

          {/* Corner Glow Accents */}
          <div 
            className="absolute top-0 right-0 w-40 h-40 rounded-bl-full opacity-20 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at top right, rgba(212, 175, 55, 0.3) 0%, transparent 70%)'
            }}
          />
          <div 
            className="absolute bottom-0 left-0 w-40 h-40 rounded-tr-full opacity-20 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at bottom left, rgba(246, 226, 122, 0.3) 0%, transparent 70%)'
            }}
          />
        </div>
      </div>
    </section>
  );
}
