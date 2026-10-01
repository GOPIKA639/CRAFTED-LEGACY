import React from 'react';
import { Navbar } from '../components/Navbar';
import { HomeSection } from '../components/HomeSection';
import { Commitment } from '../components/Commitment';
import { Collections } from '../components/Collections';
import { Footer } from '../components/Footer';
import { Testimonials } from '../components/Testimonials';
import { SignatureSection } from '../components/SignatureSection';
import { ScrollToTop } from '../components/ScrollToTop';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
      <Navbar />
      <HomeSection />
      <Commitment />
      <Collections />
      <Testimonials />
      <SignatureSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
