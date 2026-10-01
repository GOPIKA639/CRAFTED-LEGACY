import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ScrollToTop } from '../components/ScrollToTop';

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
      <Navbar />
      
      {/* Header Section */}
      <section 
        className="pt-40 pb-20 px-6 relative overflow-hidden"
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
            className="text-5xl md:text-6xl mb-6 tracking-wide"
            style={{
              fontFamily: 'Georgia, serif',
              background: 'linear-gradient(135deg, #ffffff 0%, #D4AF37 50%, #F6E27A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Terms & Conditions
          </h1>
          <p 
            className="text-lg text-white/70 leading-relaxed max-w-3xl mx-auto"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            These Terms govern the use of our website and services. By accessing Crafted Legacy, you agree to the following conditions.
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Acceptance of Terms */}
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
              Acceptance of Terms
            </h2>
            <ul className="space-y-4 text-white/75 leading-relaxed">
              <li className="flex gap-3">
                <span className="text-[#D4AF37] mt-1">•</span>
                <span>By using this website, you agree to comply with these terms.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#D4AF37] mt-1">•</span>
                <span>If you disagree, please refrain from using the site.</span>
              </li>
            </ul>
          </div>

          {/* Products & Services */}
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
              Products & Services
            </h2>
            <ul className="space-y-4 text-white/75 leading-relaxed">
              <li className="flex gap-3">
                <span className="text-[#D4AF37] mt-1">•</span>
                <span>We offer handcrafted leather and non-leather goods along with customization and corporate gifting solutions.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#D4AF37] mt-1">•</span>
                <span>Product colors may vary slightly due to photography and screen display.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#D4AF37] mt-1">•</span>
                <span>Custom orders once confirmed cannot be cancelled after production starts.</span>
              </li>
            </ul>
          </div>

          {/* Pricing & Payments */}
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
              Pricing & Payments
            </h2>
            <ul className="space-y-4 text-white/75 leading-relaxed">
              <li className="flex gap-3">
                <span className="text-[#D4AF37] mt-1">•</span>
                <span>All prices are listed in INR unless specified.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#D4AF37] mt-1">•</span>
                <span>Taxes, shipping, or customization charges may apply.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#D4AF37] mt-1">•</span>
                <span>Orders are processed only upon payment confirmation.</span>
              </li>
            </ul>
          </div>

          {/* Shipping & Delivery */}
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
              Shipping & Delivery
            </h2>
            <ul className="space-y-4 text-white/75 leading-relaxed">
              <li className="flex gap-3">
                <span className="text-[#D4AF37] mt-1">•</span>
                <span>Standard dispatch times vary depending on product category.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#D4AF37] mt-1">•</span>
                <span>Customized or bulk orders may require additional preparation time.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#D4AF37] mt-1">•</span>
                <span>We are not liable for courier delays once shipment is handed over.</span>
              </li>
            </ul>
          </div>

          {/* Returns & Refunds */}
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
              Returns & Refunds
            </h2>
            <ul className="space-y-4 text-white/75 leading-relaxed">
              <li className="flex gap-3">
                <span className="text-[#D4AF37] mt-1">•</span>
                <span>Refunds are applicable only for defective or wrong products delivered.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#D4AF37] mt-1">•</span>
                <span>Return request must be raised within 48 hours of delivery with proof.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#D4AF37] mt-1">•</span>
                <span>Personalized/custom corporate items are not eligible for return unless damaged.</span>
              </li>
            </ul>
          </div>

          {/* Intellectual Property */}
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
              Intellectual Property
            </h2>
            <ul className="space-y-4 text-white/75 leading-relaxed">
              <li className="flex gap-3">
                <span className="text-[#D4AF37] mt-1">•</span>
                <span>All content including designs, images, logos belong to Crafted Legacy.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#D4AF37] mt-1">•</span>
                <span>Reproduction or commercial use without permission is prohibited.</span>
              </li>
            </ul>
          </div>

          {/* Limitation of Liability */}
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
              Limitation of Liability
            </h2>
            <ul className="space-y-4 text-white/75 leading-relaxed">
              <li className="flex gap-3">
                <span className="text-[#D4AF37] mt-1">•</span>
                <span>We are not responsible for misuse of products after delivery.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#D4AF37] mt-1">•</span>
                <span>We do not guarantee uninterrupted website access at all times.</span>
              </li>
            </ul>
          </div>

          {/* Modification of Terms */}
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
              Modification of Terms
            </h2>
            <p className="text-white/75 leading-relaxed">
              We reserve the right to update policies anytime. Users will be notified on this page.
            </p>
          </div>

          {/* Contact */}
          <div
            className="p-10 rounded-[40px] backdrop-blur-xl animate-fade-in"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 15px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              animationDelay: '0.8s'
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
              Contact
            </h2>
            <div className="space-y-2 text-white/75">
              <p><span className="text-[#D4AF37]">Email/Support:</span> us.craftedlegacy@gmail.com</p>
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
