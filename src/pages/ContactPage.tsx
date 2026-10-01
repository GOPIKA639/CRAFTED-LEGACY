import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ScrollToTop } from '../components/ScrollToTop';
import { ContactHeader } from '../components/contact/ContactHeader';
import { ContactFormSection } from '../components/contact/ContactFormSection';
import { MapSection } from '../components/contact/MapSection';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
      <Navbar />
      <ContactHeader />
      <ContactFormSection />
      <MapSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
