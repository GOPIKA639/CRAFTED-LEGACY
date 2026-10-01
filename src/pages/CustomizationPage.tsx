import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ScrollToTop } from '../components/ScrollToTop';
import { CustomizationHeader } from '../components/customization/CustomizationHeader';
import { FeaturesSection } from '../components/customization/FeaturesSection';
import { ProcessSection } from '../components/customization/ProcessSection';
import { CustomizationCTA } from '../components/customization/CustomizationCTA';

export default function CustomizationPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
      <Navbar />
      <CustomizationHeader />
      <FeaturesSection />
      <ProcessSection />
      <CustomizationCTA />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
