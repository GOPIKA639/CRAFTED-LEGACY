import React, { useState, useEffect } from 'react';
import { Gem } from 'lucide-react';
import { getSiteContent } from '../admin/adminStore';
import { getIconComponent } from '../admin/iconOptions';

export function Commitment() {
  const [commitments, setCommitments] = useState(getSiteContent().commitments);
  const [sectionHeaders, setSectionHeaders] = useState(getSiteContent().sectionHeaders);
  const [commitmentIcons, setCommitmentIcons] = useState(getSiteContent().icons.commitmentIcons);

  useEffect(() => {
    const handler = () => {
      setCommitments(getSiteContent().commitments);
      setSectionHeaders(getSiteContent().sectionHeaders);
      setCommitmentIcons(getSiteContent().icons.commitmentIcons);
    };
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
        background: 'linear-gradient(180deg, #0A0A0A 0%, #0f0f0f 50%, #0A0A0A 100%)',
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(246, 226, 122, 0.03) 0%, transparent 50%)'
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 
          className="text-5xl md:text-7xl text-center mb-24"
          style={{
            fontFamily: 'var(--font-libre)',
            background: 'linear-gradient(135deg, #ffffff 0%, #D4AF37 50%, #F6E27A 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 2px 8px rgba(212, 175, 55, 0.3))'
          }}
        >
          {sectionHeaders.commitmentTitle}
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {commitments.map((item, index) => {
            const Icon = getIconComponent(commitmentIcons[index], Gem);
            return (
              <div
                key={index}
                className="group relative p-12 rounded-[40px] backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 focus:outline-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                  outline: 'none'
                }}
              >
                {/* Icon */}
                <div className="flex justify-center mb-8">
                  <div 
                    className="p-7 rounded-full transition-all duration-500 group-hover:scale-110"
                    style={{
                      background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(246, 226, 122, 0.15) 100%)',
                      border: '1.5px solid rgba(212, 175, 55, 0.4)',
                      boxShadow: '0 0 30px rgba(212, 175, 55, 0.2)'
                    }}
                  >
                    <Icon 
                      className="w-12 h-12"
                      style={{ stroke: 'url(#gold-gradient)' }}
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 
                  className="text-2xl md:text-3xl text-center mb-5 tracking-wide"
                  style={{
                    fontFamily: 'var(--font-libre)',
                    background: 'linear-gradient(135deg, #ffffff 0%, #D4AF37 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p 
                  className="text-center text-white/75 leading-relaxed tracking-wide text-base"
                  style={{ fontFamily: 'var(--font-roboto)' }}
                >
                  {item.description}
                </p>

                {/* Hover Glow Effect */}
                <div 
                  className="absolute inset-0 rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.12) 0%, transparent 70%)',
                    boxShadow: '0 0 50px rgba(212, 175, 55, 0.3)'
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* SVG Gradient Definition */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#D4AF37', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#F6E27A', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>
    </section>
  );
}