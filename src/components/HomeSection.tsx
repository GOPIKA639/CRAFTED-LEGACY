import React, { useState, useEffect } from 'react';
import heroImage from 'figma:asset/7cf70cc92ae0aa3d58dd5a54b861696108cdcbfc.png';
import { getSiteContent } from '../admin/adminStore';

export function HomeSection() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [content, setContent] = useState(getSiteContent().home);

  useEffect(() => {
    console.log('🏠 [HomeSection] Component mounted, initial content:', content);
    const img = new Image();
    img.src = heroImage;
    img.onload = () => setImageLoaded(true);
  }, []);

  // Log whenever content changes
  useEffect(() => {
    console.log('🏠 [HomeSection] Content state changed:', content);
    console.log('🏠 [HomeSection] Heading:', content.heading);
    console.log('🏠 [HomeSection] Button Text:', content.buttonText);
  }, [content]);

  // Listen for admin content updates
  useEffect(() => {
    const handler = () => {
      console.log('🏠 [HomeSection] Admin content updated event received');
      const fullContent = getSiteContent();
      console.log('🏠 [HomeSection] Full site content:', fullContent);
      const homeContent = fullContent.home;
      console.log('🏠 [HomeSection] Home content:', homeContent);
      console.log('🏠 [HomeSection] Updated heading:', homeContent.heading);
      console.log('🏠 [HomeSection] Updated buttonText:', homeContent.buttonText);
      console.log('🏠 [HomeSection] Updated subheading:', homeContent.subheading);
      setContent(homeContent);
      console.log('🏠 [HomeSection] State updated, component will re-render');
    };

    // Test: Log when component mounts and try manual refresh
    console.log('🏠 [HomeSection] useEffect hook setup - attaching listeners');

    window.addEventListener('admin-content-updated', handler);
    window.addEventListener('storage', handler);

    // Also try to check localStorage directly for debugging
    try {
      const stored = localStorage.getItem('crafted_legacy_admin_content');
      if (stored) {
        const parsed = JSON.parse(stored);
        console.log('🏠 [HomeSection] localStorage content exists, home section:', parsed.home);
      }
    } catch (e) {
      console.error('🏠 [HomeSection] Error reading localStorage:', e);
    }

    return () => {
      console.log('🏠 [HomeSection] useEffect cleanup - removing listeners');
      window.removeEventListener('admin-content-updated', handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  const bgImage = content.backgroundImage || heroImage;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#0A0A0A] to-[#000000]"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div 
          className="absolute inset-0 backdrop-blur-[1px]"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(10,10,10,0.75) 100%)'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <h1 
          className="text-6xl md:text-8xl mb-10 tracking-wide"
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
          {content.heading}
        </h1>

        <p 
          className="text-xl md:text-2xl mb-14 text-white/80 tracking-wide max-w-3xl mx-auto leading-relaxed"
          style={{ fontFamily: 'var(--font-roboto)' }}
        >
          {content.subheading}
        </p>

        <button
          onClick={() => window.location.href = '#products'}
          className="group relative px-14 py-5 rounded-full overflow-hidden transition-all duration-500 hover:scale-105 focus:outline-none"
          style={{
            background: 'linear-gradient(135deg, #D4AF37 0%, #F6E27A 100%)',
            boxShadow: '0 12px 45px rgba(212, 175, 55, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
            fontFamily: 'var(--font-caveat)',
            fontSize: '1.3rem',
            outline: 'none'
          }}
        >
          <span className="relative z-10 text-black tracking-wider">
            {content.buttonText}
          </span>
          <div 
            className="absolute inset-0 bg-gradient-to-r from-[#F6E27A] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              boxShadow: '0 0 40px rgba(246, 226, 122, 0.8)'
            }}
          />
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
      
      {/* Enhanced corner glow effects */}
      <div 
        className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, transparent 70%)'
        }}
      />
      <div 
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(246, 226, 122, 0.3) 0%, transparent 70%)'
        }}
      />
    </section>
  );
}