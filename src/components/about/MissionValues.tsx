import React, { useState, useEffect } from 'react';
import { Target, Award, Users, Heart, Sparkles, Gem, Shield, Handshake, BriefcaseBusiness, Compass, ScrollText, type LucideIcon } from 'lucide-react';
import { getSiteContent } from '../../admin/adminStore';

export function MissionValues() {
  const [sectionHeaders, setSectionHeaders] = useState(getSiteContent().sectionHeaders);
  const [about, setAbout] = useState(getSiteContent().about);

  useEffect(() => {
    const handler = () => {
      setSectionHeaders(getSiteContent().sectionHeaders);
      setAbout(getSiteContent().about);
    };
    window.addEventListener('admin-content-updated', handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('admin-content-updated', handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  const defaultValues = [
    { title: 'Our Mission', description: 'To craft premium leather gifts that reflect luxury, artistry, and meaningful connections.', icon: 'target' },
    { title: 'Our Excellence', description: 'Skilled artisans, traditional techniques, and superior materials ensure every piece reflects unparalleled quality.', icon: 'award' },
    { title: 'Our Clients', description: 'We serve forward-thinking organizations and reputable brands, ensuring every detail exemplifies premium quality and sophistication.', icon: 'users' },
    { title: 'Our Passion', description: 'For us, every piece of leather is a canvas, crafted with knowledge passed down through generations.', icon: 'heart' },
  ];

  const values = about.missionCards && about.missionCards.length ? about.missionCards : defaultValues;

  const missionIconMap: Record<string, LucideIcon> = {
    target: Target,
    award: Award,
    users: Users,
    heart: Heart,
    sparkles: Sparkles,
    gem: Gem,
    shield: Shield,
    handshake: Handshake,
    briefcase: BriefcaseBusiness,
    compass: Compass,
    scroll: ScrollText,
  };

  const fallbackIcons = [Target, Award, Users, Heart, Sparkles];

  return (
    <section 
      className="py-32 px-6 relative"
      style={{
        background: 'linear-gradient(180deg, #0A0A0A 0%, #121212 100%)',
        borderTop: '1px solid rgba(212, 175, 55, 0.2)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.2)'
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 
          className="text-center mb-20 text-3xl tracking-widest uppercase"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #D4AF37 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '0.2em'
          }}
        >
          {sectionHeaders.missionSectionTitle}
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => {
            const Icon = missionIconMap[(value as { icon?: string }).icon || ''] || fallbackIcons[index % fallbackIcons.length];
            return (
              <div
                key={index}
                className="group relative p-10 rounded-[40px] backdrop-blur-xl transition-all duration-500 hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                {/* Icon */}
                <div className="flex items-start gap-6 mb-6">
                  <div 
                    className="p-4 rounded-full transition-all duration-500 group-hover:scale-110"
                    style={{
                      background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(246, 226, 122, 0.15) 100%)',
                      border: '1px solid rgba(212, 175, 55, 0.3)'
                    }}
                  >
                    <Icon 
                      className="w-8 h-8"
                      style={{ stroke: 'url(#gold-gradient)' }}
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Title */}
                  <h3 
                    className="text-2xl pt-3 tracking-wide"
                    style={{
                      fontFamily: 'Georgia, serif',
                      background: 'linear-gradient(135deg, #ffffff 0%, #D4AF37 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    {value.title}
                  </h3>
                </div>

                {/* Description */}
                <p 
                  className="text-white/75 leading-relaxed pl-[88px]"
                  style={{ fontFamily: 'Georgia, serif', fontSize: '1rem', lineHeight: '1.8' }}
                >
                  {value.description}
                </p>

                {/* Hover Glow */}
                <div 
                  className="absolute inset-0 rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
                    boxShadow: '0 0 40px rgba(212, 175, 55, 0.15)'
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