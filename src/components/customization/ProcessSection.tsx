import React, { useState, useEffect } from 'react';
import { getSiteContent } from '../../admin/adminStore';

export function ProcessSection() {
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

  const defaultSteps = [
    { number: '01', title: 'Consultation', description: 'Share your vision with our design team as we walk you through the best customization options with expert guidance.' },
    { number: '02', title: 'Design Approval', description: 'Review detailed mockups and samples to ensure every element aligns perfectly with your brand expectations.' },
    { number: '03', title: 'Artisan Crafting', description: 'Our master artisans craft each piece with precision, bringing your approved design to life with meticulous care.' },
    { number: '04', title: 'Quality Assurance', description: 'Every item undergoes rigorous inspection, meeting our highest standards before it reaches your hands.' },
  ];

  const processSteps = (customization.processSteps && customization.processSteps.length) ? customization.processSteps : defaultSteps;
  return (
    <section 
      className="py-32 px-6 relative"
      style={{
        background: 'linear-gradient(180deg, #0A0A0A 0%, #121212 100%)',
        borderTop: '1px solid rgba(212, 175, 55, 0.15)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.15)'
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Main Container */}
        <div
          className="relative p-12 md:p-16 rounded-[50px] backdrop-blur-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                rgba(139, 69, 19, 0.02) 0px,
                rgba(139, 69, 19, 0.02) 2px,
                transparent 2px,
                transparent 4px
              )
            `
          }}
        >
          {/* Title */}
          <h2 
            className="text-4xl md:text-5xl text-center mb-16 tracking-wide"
            style={{
              fontFamily: 'Georgia, serif',
              background: 'linear-gradient(135deg, #ffffff 0%, #D4AF37 50%, #F6E27A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Our Customization Process
          </h2>

          {/* Process Steps */}
          <div className="space-y-12 relative">
            {/* Connecting Line */}
            <div 
              className="absolute left-[47px] top-0 bottom-0 w-[2px]"
              style={{
                background: 'linear-gradient(180deg, transparent 0%, rgba(212, 175, 55, 0.5) 10%, rgba(212, 175, 55, 0.5) 90%, transparent 100%)'
              }}
            />

            {processSteps.map((step, index) => (
              <div key={index} className="relative flex gap-8 items-start">
                {/* Number Circle */}
                <div 
                  className="flex-shrink-0 w-24 h-24 rounded-full flex items-center justify-center relative z-10 transition-all duration-500 hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg, rgba(10, 10, 10, 0.9) 0%, rgba(18, 18, 18, 0.9) 100%)',
                    border: '2px solid rgba(212, 175, 55, 0.5)',
                    boxShadow: '0 0 30px rgba(212, 175, 55, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <span 
                    className="text-3xl"
                    style={{
                      fontFamily: 'Georgia, serif',
                      background: 'linear-gradient(135deg, #D4AF37 0%, #F6E27A 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    {step.number}
                  </span>

                  {/* Dot Glow */}
                  <div 
                    className="absolute inset-0 rounded-full opacity-50"
                    style={{
                      background: 'radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, transparent 70%)',
                      filter: 'blur(10px)'
                    }}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 pt-4">
                  <h3 
                    className="text-2xl md:text-3xl mb-4 tracking-wide"
                    style={{
                      fontFamily: 'Georgia, serif',
                      background: 'linear-gradient(135deg, #ffffff 0%, #D4AF37 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    {step.title}
                  </h3>
                  <p 
                    className="text-white/75 leading-relaxed"
                    style={{ fontFamily: 'Georgia, serif', fontSize: '1.0625rem', lineHeight: '1.8' }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Corner Accents */}
          <div 
            className="absolute top-0 right-0 w-40 h-40 rounded-bl-full opacity-15 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at top right, rgba(212, 175, 55, 0.4) 0%, transparent 70%)'
            }}
          />
          <div 
            className="absolute bottom-0 left-0 w-40 h-40 rounded-tr-full opacity-15 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at bottom left, rgba(246, 226, 122, 0.4) 0%, transparent 70%)'
            }}
          />
        </div>
      </div>
    </section>
  );
}
