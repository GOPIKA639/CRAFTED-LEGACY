import React, { useState, useEffect } from 'react';
import { getSiteContent } from '../admin/adminStore';
import { Facebook, Instagram, Linkedin, Home } from 'lucide-react';
import { getIconComponent } from '../admin/iconOptions';

export function Footer() {
  const [footer, setFooter] = useState(getSiteContent().footer);
  const [icons, setIcons] = useState(getSiteContent().icons);

  useEffect(() => {
    const handler = () => {
      setFooter(getSiteContent().footer);
      setIcons(getSiteContent().icons);
    };
    window.addEventListener('admin-content-updated', handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('admin-content-updated', handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  const links = footer.links;
  const AdminIcon = getIconComponent(icons.footerAdminIcon, Home);
  const socials = footer.socialLinks.map((social, index) => ({
    icon: getIconComponent(icons.footerSocialIcons?.[index] || social.name.toLowerCase(), Facebook),
    name: social.name,
    url: social.url,
  }));
  return (
    <footer 
      className="py-12 px-6 border-t"
      style={{
        background: 'linear-gradient(180deg, #0A0A0A 0%, #000000 100%)',
        borderColor: 'rgba(212, 175, 55, 0.2)',
        borderTopLeftRadius: '32px',
        borderTopRightRadius: '32px'
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Links */}
        <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-x-6 gap-y-3 mb-8">
          {links.map((link, index) => (
            <React.Fragment key={link.name}>
              <a
                href={link.path}
                className="relative group text-sm text-white/70 hover:text-[#D4AF37] transition-colors duration-300 tracking-wide"
              >
                {link.name}
                <span 
                  className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D4AF37] group-hover:w-full transition-all duration-300"
                />
              </a>
              {index < links.length - 1 && (
                <span className="text-white/30 hidden md:inline">|</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Social Icons with Admin Icon first on left */}
        <div className="flex justify-center gap-4 mb-8">
          {/* Admin Portal Home Icon — first on the left */}
          <a
            href="#admin"
            id="footer-admin-icon"
            className="p-2.5 rounded-full transition-all duration-300 hover:scale-110"
            style={{
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(246, 226, 122, 0.15) 100%)',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              boxShadow: '0 0 12px rgba(212, 175, 55, 0.1)'
            }}
            aria-label="Admin Portal"
            title="Admin Portal"
          >
            <AdminIcon className="w-4 h-4 text-[#D4AF37]" />
          </a>

          {/* Social media icons */}
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full transition-all duration-300 hover:scale-110"
                style={{
                  background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(246, 226, 122, 0.1) 100%)',
                  border: '1px solid rgba(212, 175, 55, 0.3)'
                }}
                aria-label={social.name}
              >
                <Icon className="w-4 h-4 text-[#D4AF37]" />
              </a>
            );
          })}
        </div>

        {/* Copyright */}
        <div className="text-center space-y-1.5">
          <p className="text-xs text-white/60">
            {footer.copyrightText}
          </p>
          <p className="text-xs text-white/40">
            {footer.designerText}{' '}
            <a
              href={footer.designerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D4AF37] hover:underline"
            >
              {footer.designerUrl.replace('https://www.', '').replace('https://', '').split('/')[0]}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}