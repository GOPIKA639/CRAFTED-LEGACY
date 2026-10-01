import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/cl-white.svg';
import { getSiteContent } from '../admin/adminStore';
import { getIconComponent } from '../admin/iconOptions';

export function Navbar () {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navbarData, setNavbarData] = useState(getSiteContent().navbar);
  const [icons, setIcons] = useState(getSiteContent().icons);

  useEffect(() => {
    const contentHandler = () => {
      setNavbarData(getSiteContent().navbar);
      setIcons(getSiteContent().icons);
    };
    window.addEventListener('admin-content-updated', contentHandler);
    window.addEventListener('storage', contentHandler);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('admin-content-updated', contentHandler);
      window.removeEventListener('storage', contentHandler);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const closeMobileMenu = () => setIsMenuOpen(false);
  const MenuIcon = getIconComponent(icons.navbarMenuIcon, Menu);
  const CloseIcon = getIconComponent(icons.navbarCloseIcon, X);

  return (
    <>
      <nav 
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          scrolled ? 'scale-95' : 'scale-100'
        }`}
        style={{ width: 'calc(100% - 2rem)', maxWidth: '1400px' }}
      >
        <div 
          className="px-6 py-3 rounded-[32px] backdrop-blur-xl bg-gradient-to-r from-white/10 to-white/5 border border-white/10 shadow-2xl"
          style={{
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center">
              <img 
                src={logo} 
                alt="Crafted Legacy Logo"
                className="h-10 md:h-12 w-auto"
                style={{ maxHeight: '50px' }}
              />
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              {navbarData.menuItems.slice(0, 5).map((item) => (
                <a
                  key={item.name}
                  href={item.path}
                  className="relative group text-base tracking-wide text-white/90 hover:text-[#D4AF37] transition-colors duration-300"
                  style={{ 
                    fontFamily: 'var(--font-roboto)'
                  }}
                >
                  {item.name}
                  <span 
                    className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent group-hover:w-full transition-all duration-500"
                  />
                </a>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-colors duration-300 focus:outline-none"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                outline: 'none',
              }}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <CloseIcon className="w-6 h-6 text-white" /> : <MenuIcon className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Side Drawer */}
      <div
        className={`fixed inset-0 z-[100] transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={closeMobileMenu}
        />

        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] transition-transform duration-500 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{
            background: 'linear-gradient(135deg, rgba(10, 10, 10, 0.98) 0%, rgba(18, 18, 18, 0.98) 100%)',
            backdropFilter: 'blur(20px)',
            borderLeft: '1px solid rgba(212, 175, 55, 0.2)',
            boxShadow: '-10px 0 50px rgba(0, 0, 0, 0.5)'
          }}
        >
          {/* Close Button */}
          <div className="flex justify-end p-6">
            <button
              onClick={closeMobileMenu}
              className="p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="px-8 py-4 space-y-6">
            {navbarData.menuItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                onClick={closeMobileMenu}
                className="block text-lg text-white/80 hover:text-white transition-colors duration-300"
                style={{ 
                  fontFamily: 'Georgia, serif'
                }}
              >
                {item.name}
              </a>
            ))}

            {/* Divider */}
            <div 
              className="h-[1px] my-8"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.3) 50%, transparent 100%)'
              }}
            />

            {/* Social Icons */}
            <div>
              <p className="text-sm text-white/50 mb-4 tracking-wide">Follow Us</p>
              <div className="flex gap-4">
                {navbarData.socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className="w-10 h-10 rounded-full flex items-center justify-center border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300"
                    aria-label={social.name}
                  >
                    <span className="text-xs">{social.name[0]}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}