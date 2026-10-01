import React, { useState, useEffect } from 'react';
import { Building2 } from 'lucide-react';
import { getSiteContent } from '../../admin/adminStore';
import { getIconComponent } from '../../admin/iconOptions';
import { addEnquiry } from '../../admin/adminStore';
import emailjs from '@emailjs/browser';

const EMAILJS_PUBLIC_KEY = (import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '').trim();
const EMAILJS_SERVICE_ID = (import.meta.env.VITE_EMAILJS_SERVICE_ID || '').trim();
const EMAILJS_TEMPLATE_ID = (import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '').trim();

export function ContactFormSection() {
  const [contact, setContact] = useState(() => getSiteContent().contact ?? {});
  const [isContentReady, setIsContentReady] = useState(false);
  const safeContact = contact ?? {};
  const safeContactInfo = safeContact.contactInfo ?? {};
  const safeCorporateInquiries = safeContact.corporateInquiries ?? {};
  const contactAddress = safeContactInfo.address || safeContact.address || 'Address details will be added soon.';
  const contactPhones = (Array.isArray(safeContactInfo.phones) ? safeContactInfo.phones : (safeContact.phone ? [safeContact.phone] : [])).filter(Boolean);
  const contactEmail = safeContactInfo.email || safeContact.email || 'contact@craftedlegacy.com';
  const contactBusinessHours = (Array.isArray(safeContactInfo.businessHours) ? safeContactInfo.businessHours : []).filter(Boolean);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  useEffect(() => {
    const handler = () => setContact(getSiteContent().contact ?? {});
    window.addEventListener('admin-content-updated', handler);
    window.addEventListener('storage', handler);

    setIsContentReady(true);

    if (EMAILJS_PUBLIC_KEY) {
      emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    return () => {
      window.removeEventListener('admin-content-updated', handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (!isContentReady) {
    return (
      <section className="py-32 px-6 relative" style={{ background: 'linear-gradient(180deg, #0f0f0f 0%, #0A0A0A 100%)' }}>
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/70 text-sm tracking-wide">Loading contact details…</p>
        </div>
      </section>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const adminEmail = (safeCorporateInquiries.email || safeContactInfo.email || safeContact.email || 'contact@craftedlegacy.com').trim();

    addEnquiry({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      message: formData.message.trim(),
      adminEmail,
    });

    if (EMAILJS_PUBLIC_KEY && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID) {
      try {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          to_email: adminEmail,
          from_name: formData.name.trim(),
          from_email: formData.email.trim(),
          phone: formData.phone.trim(),
          message: formData.message.trim(),
        });
        console.log('Email sent to admin successfully');
      } catch (error) {
        console.error('Failed to send email to admin:', error);
      }
    } else {
      console.warn('EmailJS is not configured. Enquiry was saved locally in the Queries panel only.');
    }

    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      message: '',
    });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
  };

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Card - Contact Form */}
          <div
            className="relative p-10 md:p-12 rounded-[36px] backdrop-blur-xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Title */}
            <h2 
              className="text-3xl md:text-4xl mb-10 tracking-wide"
              style={{
                fontFamily: 'var(--font-libre)',
                background: 'linear-gradient(135deg, #ffffff 0%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Send us a message
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-xs text-white/70 mb-2 tracking-wide">
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-5 py-3.5 rounded-3xl bg-white/5 backdrop-blur-sm transition-all duration-300 outline-none text-sm"
                  style={{
                    border: focusedField === 'name' 
                      ? '1px solid rgba(212, 175, 55, 0.5)' 
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: focusedField === 'name' 
                      ? '0 0 20px rgba(212, 175, 55, 0.3)' 
                      : 'none'
                  }}
                  required
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-xs text-white/70 mb-2 tracking-wide">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-5 py-3.5 rounded-3xl bg-white/5 backdrop-blur-sm transition-all duration-300 outline-none text-sm"
                  style={{
                    border: focusedField === 'email' 
                      ? '1px solid rgba(212, 175, 55, 0.5)' 
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: focusedField === 'email' 
                      ? '0 0 20px rgba(212, 175, 55, 0.3)' 
                      : 'none'
                  }}
                  required
                />
              </div>

              {/* Company Name Input */}
              <div>
                <label className="block text-xs text-white/70 mb-2 tracking-wide">
                  Phone number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-5 py-3.5 rounded-3xl bg-white/5 backdrop-blur-sm transition-all duration-300 outline-none text-sm"
                  style={{
                    border: focusedField === 'phone' 
                      ? '1px solid rgba(212, 175, 55, 0.5)' 
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: focusedField === 'phone' 
                      ? '0 0 20px rgba(212, 175, 55, 0.3)' 
                      : 'none'
                  }}
                  required
                />
              </div>

              {/* Message Textarea */}
              <div>
                <label className="block text-xs text-white/70 mb-2 tracking-wide">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  rows={5}
                  className="w-full px-5 py-3.5 rounded-3xl bg-white/5 backdrop-blur-sm transition-all duration-300 outline-none resize-none text-sm"
                  style={{
                    border: focusedField === 'message' 
                      ? '1px solid rgba(212, 175, 55, 0.5)' 
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: focusedField === 'message' 
                      ? '0 0 20px rgba(212, 175, 55, 0.3)' 
                      : 'none'
                  }}
                  required
                />
              </div>

              {submitted && (
                <p className="text-sm text-[#D4AF37] tracking-wide">
                  Your enquiry has been submitted.
                </p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="group w-full px-10 py-4 rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #F6E27A 100%)',
                  boxShadow: '0 15px 40px rgba(212, 175, 55, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                }}
              >
                <span className="relative z-10 text-black tracking-widest text-sm">
                  Send message
                </span>
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-[#F6E27A] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    boxShadow: '0 0 30px rgba(246, 226, 122, 0.6)'
                  }}
                />
              </button>
            </form>

            {/* Corner Glow */}
            <div 
              className="absolute bottom-0 right-0 w-32 h-32 rounded-tl-full opacity-15 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at bottom right, rgba(212, 175, 55, 0.4) 0%, transparent 70%)'
              }}
            />
          </div>

          {/* Right Side - Two Stacked Cards */}
          <div className="flex flex-col gap-6">
            {/* Contact Information Card */}
            <div
              className="relative p-8 rounded-[32px] backdrop-blur-xl flex-1"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Title */}
              <h3 
                className="text-2xl mb-6 tracking-wide"
                style={{
                  fontFamily: 'Georgia, serif',
                  background: 'linear-gradient(135deg, #ffffff 0%, #D4AF37 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Contact information
              </h3>

              <div className="space-y-5">
                {[
                  {
                    label: 'Address',
                    key: 'address' as const,
                    value: contactAddress,
                    multiline: true,
                  },
                  {
                    label: 'Phone',
                    key: 'phone' as const,
                    value: contactPhones.join('\n'),
                    multiline: true,
                  },
                  {
                    label: 'Email',
                    key: 'email' as const,
                    value: contactEmail,
                    multiline: false,
                  },
                  {
                    label: 'Business hours',
                    key: 'businessHours' as const,
                    value: contactBusinessHours.join('\n'),
                    multiline: true,
                  },
                ].map((item) => {
                  const iconName = safeContactInfo.icons?.[item.key] || (item.key === 'address' ? 'map-pin' : item.key === 'phone' ? 'phone' : item.key === 'email' ? 'mail' : 'clock');
                  const Icon = getIconComponent(iconName, undefined);
                  const value = (item.value || '').trim();

                  return (
                    <div key={item.label} className="flex items-start gap-3">
                      <div 
                        className="p-2.5 rounded-full flex-shrink-0"
                        style={{
                          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(246, 226, 122, 0.15) 100%)',
                          border: '1px solid rgba(212, 175, 55, 0.3)'
                        }}
                      >
                        <Icon className="w-4 h-4 text-[#D4AF37]" />
                      </div>
                      <div>
                        <p className="text-white/60 text-xs mb-1 tracking-wide">{item.label}</p>
                        <p
                          className="text-white/90 text-sm"
                          style={{
                            whiteSpace: item.multiline ? 'pre-wrap' : 'normal',
                            lineHeight: item.multiline ? '1.7' : '1.5',
                          }}
                        >
                          {value || '—'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Light Streak */}
              <div 
                className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none rounded-[32px]"
                style={{
                  background: 'linear-gradient(135deg, transparent 0%, rgba(212, 175, 55, 0.3) 50%, transparent 100%)'
                }}
              />
            </div>

            {/* Corporate Inquiries Card */}
            <div
              className="relative p-8 rounded-[32px] backdrop-blur-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Title */}
              <h3 
                className="text-2xl mb-5 tracking-wide"
                style={{
                  fontFamily: 'Georgia, serif',
                  background: 'linear-gradient(135deg, #ffffff 0%, #D4AF37 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {safeCorporateInquiries.title || 'Corporate inquiries'}
              </h3>

              <p 
                className="text-white/75 leading-relaxed mb-5 text-sm"
                style={{ fontFamily: 'Georgia, serif', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}
              >
                {safeCorporateInquiries.description || 'For bulk orders and customization projects, please contact our corporate sales team for personalized assistance.'}
              </p>

              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-[#D4AF37]" />
                <p className="text-[#D4AF37] text-sm">{safeContact.corporateInquiries?.email || 'us.craftedlegacy@gmail.com'}</p>
              </div>

              {/* Corner Accent */}
              <div 
                className="absolute top-0 left-0 w-24 h-24 rounded-br-full opacity-15 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at top left, rgba(246, 226, 122, 0.4) 0%, transparent 70%)'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
