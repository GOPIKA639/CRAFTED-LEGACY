import React, { useState, useEffect } from 'react';
import { getSiteContent } from '../admin/adminStore';

export function SignatureSection() {
  const [cta, setCta] = useState(() => getSiteContent().homeSignature);

  useEffect(() => {
    const handler = () => setCta(getSiteContent().homeSignature);
    window.addEventListener('admin-content-updated', handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('admin-content-updated', handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  const heading = cta.heading || 'Design your corporate signature';
  const description = cta.description || 'Every gift is a statement. We design narratives of excellence and timeless value that leave a lasting impression.';
  const buttonText = cta.buttonText || 'Start your journey';

  return (
    <section className="relative overflow-hidden flex items-center justify-center" style={{ padding: '80px 20px', background: 'transparent' }}>
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '50%',
          maxWidth: '800px',
          minWidth: '400px',
          borderRadius: '48px',
          padding: '60px 50px',
          minHeight: '400px',
          background: 'linear-gradient(180deg, rgba(6,6,6,0.95) 0%, rgba(12,12,12,0.72) 100%)',
          boxShadow: '0 100px 180px rgba(212,175,55,0.28), inset 0 3px 0 rgba(255,255,255,0.02)',
          border: '1.5px solid rgba(212,175,55,0.12)',
          position: 'relative',
          textAlign: 'center',
          margin: '0 auto'
        }}>

          {/* Rounded glowing border layer (visual only) */}
          <div style={{
            position: 'absolute',
            inset: '6px',
            borderRadius: '46px',
            pointerEvents: 'none',
            zIndex: 1,
            boxShadow: '0 0 20px 8px rgba(212,175,55,0.1), 0 10px 40px rgba(212,175,55,0.08)',
            border: '2px solid rgba(212,175,55,0.06)',
            filter: 'blur(2px)'
          }} />

          {/* Focused glow closer to card */}
          <div style={{ position: 'absolute', inset: '4%', borderRadius: '38px', pointerEvents: 'none', zIndex: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 'inherit',
                  boxShadow: '0 60px 100px rgba(212,175,55,0.15), 0 20px 50px rgba(212,175,55,0.08)'
                }} />
                <div style={{ position: 'absolute', width: '74%', height: '74%', borderRadius: 'inherit', background: 'radial-gradient(circle at 50% 50%, rgba(212,175,55,0.08), transparent 28%)' }} />
          </div>

          <div style={{ position: 'relative', zIndex: 2 }}>
            <h2 style={{
              fontFamily: 'var(--font-caveat)',
              fontSize: '3.5rem',
              fontWeight: 400,
              letterSpacing: '0.02em',
              lineHeight: 1.1,
              maxWidth: '100%',
              margin: '0 auto 30px',
              background: 'linear-gradient(135deg, #D4AF37 0%, #F6E27A 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              textShadow: '0 0 40px rgba(212,175,55,0.25), 0 4px 12px rgba(212,175,55,0.12)'
            }}>{heading}</h2>

            <p style={{
              fontFamily: 'var(--font-roboto)',
              color: 'rgba(255,255,255,0.94)',
              fontSize: '18px',
              maxWidth: '520px',
              margin: '0 auto 64px',
              lineHeight: 2.0,
              textAlign: 'center'
            }}>
              {description}
            </p>

            <button onClick={() => { if (cta?.buttonLink) { window.location.href = cta.buttonLink; } else { window.location.hash = 'contact'; } }}
              className="relative rounded-full"
                style={{
                display: 'inline-block',
                padding: '16px 64px',
                borderRadius: '56px',
                background: 'linear-gradient(135deg, #D4AF37 0%, #F6E27A 100%)',
                boxShadow: '0 28px 80px rgba(212,175,55,0.36), inset 0 2px 0 rgba(255,255,255,0.45)',
                fontFamily: 'var(--font-caveat)',
                fontSize: '24px',
                fontStyle: 'italic',
                color: '#000',
                border: 'none',
                cursor: 'pointer',
                zIndex: 3
              }}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignatureSection;
