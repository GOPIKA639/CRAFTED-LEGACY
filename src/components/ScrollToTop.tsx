import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { getSiteContent } from '../admin/adminStore';
import { getIconComponent } from '../admin/iconOptions';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [icons, setIcons] = useState(getSiteContent().icons);
  const ArrowIcon = getIconComponent(icons.scrollToTopIcon, ArrowUp);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 500);
    };
    const handler = () => setIcons(getSiteContent().icons);

    window.addEventListener('scroll', toggleVisibility);
    window.addEventListener('admin-content-updated', handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      window.removeEventListener('admin-content-updated', handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  const scrollToTop = () => {
    setIsScrolling(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setTimeout(() => setIsScrolling(false), 1000);
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 p-4 rounded-full transition-all duration-500 hover:scale-110 group"
      style={{
        background: 'linear-gradient(135deg, #D4AF37 0%, #F6E27A 100%)',
        boxShadow: '0 10px 40px rgba(212, 175, 55, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
      }}
      aria-label="Scroll to top"
    >
      <ArrowIcon 
        className={`w-6 h-6 text-black transition-transform duration-500 ${
          isScrolling ? 'animate-bounce' : ''
        }`}
      />
      
      {/* Rotating Border Effect */}
      <div 
        className={`absolute inset-0 rounded-full border-2 border-[#F6E27A] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
          isScrolling ? 'animate-spin' : ''
        }`}
        style={{
          animation: isScrolling ? 'spin 1s linear infinite' : 'none'
        }}
      />
    </button>
  );
}
