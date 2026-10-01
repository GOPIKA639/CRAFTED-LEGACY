import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ScrollToTop } from '../components/ScrollToTop';
import { AboutHeader } from '../components/about/AboutHeader';
import { OurStory } from '../components/about/OurStory';
import { MissionValues } from '../components/about/MissionValues';
import { CraftsmanshipHeritage } from '../components/about/CraftsmanshipHeritage';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
      <Navbar />
      <AboutHeader />
      <OurStory />
      <MissionValues />
      <CraftsmanshipHeritage />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
