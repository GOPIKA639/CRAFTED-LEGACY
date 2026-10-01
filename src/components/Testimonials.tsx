import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { getSiteContent, isLoggedIn } from '../admin/adminStore';
import { getIconComponent } from '../admin/iconOptions';

export function Testimonials() {
  const [testimonials, setTestimonials] = useState(getSiteContent().testimonials);
  const [icons, setIcons] = useState(getSiteContent().icons);
  const [adminMode, setAdminMode] = useState<boolean>(isLoggedIn());
  const StarIcon = getIconComponent(icons.testimonialStarIcon, Star);

  useEffect(() => {
    const handler = () => {
      setTestimonials(getSiteContent().testimonials);
      setIcons(getSiteContent().icons);
      setAdminMode(isLoggedIn());
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
      className="py-32 px-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0A0A0A 0%, #121212 100%)',
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.05) 0%, transparent 50%)'
      }}
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-4xl md:text-5xl text-center mb-6"
          style={{
            fontFamily: 'var(--font-libre)',
            background: 'linear-gradient(135deg, #ffffff 0%, #D4AF37 50%, #F6E27A 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
          }}
        >What our clients say</h2>

        {/* Google Reviews Badge */}
        <div className="flex items-center justify-center gap-3 mb-16">
          <div className="flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              border: '1px solid rgba(255,255,255,0.15)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)'
            }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="text-white/90 tracking-wide" style={{ fontFamily: 'var(--font-roboto)', fontSize: '0.95rem' }}>Google Reviews</span>
            <div className="flex gap-0.5 ml-1">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-4 h-4 fill-[#FBBC05]" style={{ stroke: '#FBBC05' }} />
              ))}
            </div>
            <span className="text-white/70 text-sm ml-1" style={{ fontFamily: 'var(--font-roboto)' }}>5.0</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            const isEmpty = !testimonial.review && !testimonial.name && !testimonial.company;
            if (isEmpty) {
              // Only show the empty "Add (+)" placeholder when an admin is logged in
              if (!adminMode) return null;
              return (
                <div key={`empty-${index}`} className="p-8 rounded-[32px] transition-all duration-500 flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)',
                    border: '1px dashed rgba(255,255,255,0.06)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.25)'
                  }}>
                  <div style={{ width: '100%', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" stroke="rgba(212,175,55,0.18)" strokeWidth="1.5" fill="rgba(212,175,55,0.02)" />
                      <path d="M12 8v8M8 12h8" stroke="rgba(212,175,55,0.6)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              );
            }

            return (
              <div key={index}
                className="group p-8 rounded-[32px] backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
                }}>
              <div className="flex items-center justify-between mb-5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="opacity-80">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 fill-[#FBBC05]" style={{ stroke: '#FBBC05' }} />
                  ))}
                </div>
              </div>

              <p className="text-white/80 mb-6 leading-relaxed"
                style={{ fontFamily: 'var(--font-roboto)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                {testimonial.review}
              </p>

              <div className="border-t border-white/10 pt-5">
                <p className="tracking-wide mb-1" style={{
                  fontFamily: 'var(--font-roboto)', fontWeight: '500',
                  background: 'linear-gradient(135deg, #ffffff 0%, #D4AF37 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
                }}>{testimonial.name}</p>
                {testimonial.company && (
                  <p className="text-sm text-white/60" style={{ fontFamily: 'var(--font-roboto)' }}>
                    {testimonial.company}
                  </p>
                )}
              </div>

              <div className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(circle at center, rgba(212,175,55,0.08) 0%, transparent 70%)', boxShadow: '0 0 40px rgba(212,175,55,0.15)' }}
              />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}