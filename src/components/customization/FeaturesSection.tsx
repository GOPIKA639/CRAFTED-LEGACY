import React, { useState, useEffect } from 'react';
import { Package } from 'lucide-react';
import { getSiteContent } from '../../admin/adminStore';
import { getCustomizationFeatureIcon, getIconComponent } from '../../admin/iconOptions';

export function FeaturesSection() {
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

  const defaultFeatures = [
    { title: 'Embossing & Debossing', description: 'Add a touch of sophistication with embossing and debossing, highlighting your brand with subtle elegance.' },
    { title: 'Custom Color Selection', description: 'Select from our luxurious range of leather shades and partner with our artisans to develop a signature color for your brand.' },
    { title: 'Metallic Foil Stamping', description: 'Infuse your designs with luxury using gold, silver, or rose gold foil, reflecting refinement and prestige.' },
    { title: 'Premium Packaging', description: 'Our customized packaging ensures every piece makes a memorable and distinguished corporate impression.' },
  ];

  const features = (customization.features && customization.features.length) ? customization.features : defaultFeatures;
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
      <div className="max-w-7xl mx-auto">
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const title = (feature as any).title || '';
            const selectedIconName = (feature as any).icon || getCustomizationFeatureIcon(title);
            const Icon = getIconComponent(selectedIconName, Package);
            return (
              <div
                key={index}
                className="group relative p-12 rounded-[45px] backdrop-blur-xl transition-all duration-500 hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 15px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                {/* Icon */}
                <div className="flex justify-center mb-8">
                  <div 
                    className="p-6 rounded-full transition-all duration-500 group-hover:scale-110"
                    style={{
                      background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(246, 226, 122, 0.15) 100%)',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      boxShadow: '0 0 30px rgba(212, 175, 55, 0.2)'
                    }}
                  >
                    <Icon 
                      className="w-10 h-10"
                      style={{ stroke: 'url(#gold-gradient)' }}
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 
                  className="text-3xl text-center mb-6 tracking-wide"
                  style={{
                    fontFamily: 'Georgia, serif',
                    background: 'linear-gradient(135deg, #ffffff 0%, #D4AF37 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p 
                  className="text-center text-white/75 leading-relaxed"
                  style={{ fontFamily: 'Georgia, serif', fontSize: '1.0625rem', lineHeight: '1.8' }}
                >
                  {feature.description}
                </p>

                {/* Hover Glow */}
                <div 
                  className="absolute inset-0 rounded-[45px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
                    boxShadow: '0 0 50px rgba(212, 175, 55, 0.2)'
                  }}
                />

                {/* Gold Bevel on Focus */}
                <div 
                  className="absolute inset-0 rounded-[45px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    border: '2px solid transparent',
                    borderImage: 'linear-gradient(135deg, transparent, rgba(212, 175, 55, 0.3), transparent) 1'
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
