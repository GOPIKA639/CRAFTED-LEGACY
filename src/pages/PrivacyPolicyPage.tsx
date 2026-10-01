import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ScrollToTop } from '../components/ScrollToTop';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
      <Navbar />
      
      {/* Header Section */}
      <section 
        className="pt-32 pb-16 px-6 relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #0A0A0A 0%, #0f0f0f 100%)',
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
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 
            className="text-4xl md:text-5xl mb-5 tracking-wide"
            style={{
              fontFamily: 'Georgia, serif',
              background: 'linear-gradient(135deg, #ffffff 0%, #D4AF37 50%, #F6E27A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Privacy policy
          </h1>
          <p 
            className="text-base text-white/70 leading-relaxed max-w-3xl mx-auto"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            This Privacy Policy explains how we collect, use, disclose, and protect your information when you visit or make a purchase from Crafted Legacy. By using our website, you agree to the practices described here.
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Information We Collect */}
          <div
            className="p-10 rounded-[40px] backdrop-blur-xl animate-fade-in"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 15px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            <h2 
              className="text-3xl mb-6 tracking-wide"
              style={{
                fontFamily: 'Georgia, serif',
                background: 'linear-gradient(135deg, #ffffff 0%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Information We Collect
            </h2>
            <ul className="space-y-4 text-white/75 leading-relaxed">
              <li className="flex gap-3">
                <span className="text-[#D4AF37] mt-1">•</span>
                <span>Personal information such as name, email, phone number, company details when you contact or place orders.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#D4AF37] mt-1">•</span>
                <span>Order related details such as shipping address, billing details, product preferences.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#D4AF37] mt-1">•</span>
                <span>Technical data like IP address, browser type, pages visited, referral source for analytics.</span>
              </li>
            </ul>
          </div>

          {/* How We Use Your Information */}
          <div
            className="p-10 rounded-[40px] backdrop-blur-xl animate-fade-in"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 15px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              animationDelay: '0.1s'
            }}
          >
            <h2 
              className="text-3xl mb-6 tracking-wide"
              style={{
                fontFamily: 'Georgia, serif',
                background: 'linear-gradient(135deg, #ffffff 0%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              How We Use Your Information
            </h2>
            <ul className="space-y-4 text-white/75 leading-relaxed">
              <li className="flex gap-3">
                <span className="text-[#D4AF37] mt-1">•</span>
                <span>To process orders & deliver products.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#D4AF37] mt-1">•</span>
                <span>To improve site experience and customer support.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#D4AF37] mt-1">•</span>
                <span>To send updates, promotional offers, and corporate gifting information.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#D4AF37] mt-1">•</span>
                <span>To enhance business needs & personalization requests.</span>
              </li>
            </ul>
          </div>

          {/* Sharing of Information */}
          <div
            className="p-10 rounded-[40px] backdrop-blur-xl animate-fade-in"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 15px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              animationDelay: '0.2s'
            }}
          >
            <h2 
              className="text-3xl mb-6 tracking-wide"
              style={{
                fontFamily: 'Georgia, serif',
                background: 'linear-gradient(135deg, #ffffff 0%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Sharing of Information
            </h2>
            <ul className="space-y-4 text-white/75 leading-relaxed">
              <li className="flex gap-3">
                <span className="text-[#D4AF37] mt-1">•</span>
                <span>We do not sell your personal information.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#D4AF37] mt-1">•</span>
                <span>We may share details only with delivery partners, payment gateways, and trusted vendors necessary for order processing.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#D4AF37] mt-1">•</span>
                <span>We may disclose information if required by law or legal request.</span>
              </li>
            </ul>
          </div>

          {/* Cookies and Tracking Technologies */}
          <div
            className="p-10 rounded-[40px] backdrop-blur-xl animate-fade-in"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 15px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              animationDelay: '0.3s'
            }}
          >
            <h2 
              className="text-3xl mb-6 tracking-wide"
              style={{
                fontFamily: 'Georgia, serif',
                background: 'linear-gradient(135deg, #ffffff 0%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Cookies and Tracking Technologies
            </h2>
            <ul className="space-y-4 text-white/75 leading-relaxed">
              <li className="flex gap-3">
                <span className="text-[#D4AF37] mt-1">•</span>
                <span>Cookies are used to enhance browsing, remember preferences, and understand site usage.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#D4AF37] mt-1">•</span>
                <span>You may disable cookies in the browser settings, but some features may not function properly.</span>
              </li>
            </ul>
          </div>

          {/* Data Security */}
          <div
            className="p-10 rounded-[40px] backdrop-blur-xl animate-fade-in"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 15px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              animationDelay: '0.4s'
            }}
          >
            <h2 
              className="text-3xl mb-6 tracking-wide"
              style={{
                fontFamily: 'Georgia, serif',
                background: 'linear-gradient(135deg, #ffffff 0%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Data Security
            </h2>
            <ul className="space-y-4 text-white/75 leading-relaxed">
              <li className="flex gap-3">
                <span className="text-[#D4AF37] mt-1">•</span>
                <span>We use secure systems to protect your data from unauthorized access.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#D4AF37] mt-1">•</span>
                <span>No electronic transmission is 100% secure but we take industry-standard precautions.</span>
              </li>
            </ul>
          </div>

          {/* Third-Party Links */}
          <div
            className="p-10 rounded-[40px] backdrop-blur-xl animate-fade-in"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 15px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              animationDelay: '0.5s'
            }}
          >
            <h2 
              className="text-3xl mb-6 tracking-wide"
              style={{
                fontFamily: 'Georgia, serif',
                background: 'linear-gradient(135deg, #ffffff 0%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Third-Party Links
            </h2>
            <p className="text-white/75 leading-relaxed">
              Our website may contain links to external websites. We are not responsible for their content or privacy practices.
            </p>
          </div>

          {/* Your Rights */}
          <div
            className="p-10 rounded-[40px] backdrop-blur-xl animate-fade-in"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 15px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              animationDelay: '0.6s'
            }}
          >
            <h2 
              className="text-3xl mb-6 tracking-wide"
              style={{
                fontFamily: 'Georgia, serif',
                background: 'linear-gradient(135deg, #ffffff 0%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Your Rights
            </h2>
            <ul className="space-y-4 text-white/75 leading-relaxed">
              <li className="flex gap-3">
                <span className="text-[#D4AF37] mt-1">•</span>
                <span>You may request corrections or deletion of your data.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#D4AF37] mt-1">•</span>
                <span>Contact us to update account or information.</span>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div
            className="p-10 rounded-[40px] backdrop-blur-xl animate-fade-in"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 15px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              animationDelay: '0.7s'
            }}
          >
            <h2 
              className="text-3xl mb-6 tracking-wide"
              style={{
                fontFamily: 'Georgia, serif',
                background: 'linear-gradient(135deg, #ffffff 0%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Contact Information
            </h2>
            <p className="text-white/75 leading-relaxed mb-4">
              For privacy concerns or queries, reach us at:
            </p>
            <div className="space-y-2 text-white/75">
              <p><span className="text-[#D4AF37]">Email:</span> us.craftedlegacy@gmail.com</p>
              <p><span className="text-[#D4AF37]">Phone:</span> +91 99526 18170 / +91 97888 88483</p>
            </div>
          </div>

          {/* Last Updated */}
          <div className="text-center py-8">
            <p className="text-white/50 text-sm">Last updated: 2025</p>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}