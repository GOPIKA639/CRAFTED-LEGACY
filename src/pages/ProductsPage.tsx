import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ScrollToTop } from '../components/ScrollToTop';
import { ProductsHeader } from '../components/products/ProductsHeader';
import { CategoriesSection } from '../components/products/CategoriesSection';

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
      <Navbar />
      <ProductsHeader />
      <CategoriesSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
