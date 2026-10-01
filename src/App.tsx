import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import CustomizationPage from './pages/CustomizationPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsConditionsPage from './pages/TermsConditionsPage';
import AdminAuth from './admin/AdminAuth';
import AdminDashboard from './admin/AdminDashboard';
import { isLoggedIn } from './admin/adminStore';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    // Handle hash-based navigation
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the #
      if (hash === 'about') {
        setCurrentPage('about');
      } else if (hash === 'products') {
        setCurrentPage('products');
      } else if (hash === 'customization') {
        setCurrentPage('customization');
      } else if (hash === 'contact') {
        setCurrentPage('contact');
      } else if (hash === 'privacy') {
        setCurrentPage('privacy');
      } else if (hash === 'terms') {
        setCurrentPage('terms');
      } else if (hash === 'admin') {
        setCurrentPage(isLoggedIn() ? 'admin-dashboard' : 'admin-auth');
      } else if (hash === 'admin-dashboard') {
        setCurrentPage(isLoggedIn() ? 'admin-dashboard' : 'admin-auth');
      } else {
        setCurrentPage('home');
      }
      
      // Scroll to top when page changes
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    };

    // Set initial page based on hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Also scroll to top when currentPage changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [currentPage]);

  return (
    <>
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'products' && <ProductsPage />}
      {currentPage === 'customization' && <CustomizationPage />}
      {currentPage === 'contact' && <ContactPage />}
      {currentPage === 'privacy' && <PrivacyPolicyPage />}
      {currentPage === 'terms' && <TermsConditionsPage />}
      {currentPage === 'admin-auth' && (
        <AdminAuth onAuthSuccess={() => {
          setCurrentPage('admin-dashboard');
          window.location.hash = 'admin-dashboard';
        }} />
      )}
      {currentPage === 'admin-dashboard' && (
        <AdminDashboard onLogout={() => {
          setCurrentPage('home');
          window.location.hash = '';
        }} />
      )}
    </>
  );
}