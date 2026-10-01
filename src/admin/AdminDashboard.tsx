import React, { useState, useEffect } from 'react';
import { getSiteContent, saveSiteContent, resetSiteContent, logout, getCurrentUser, SiteContent } from './adminStore';
import HomePanel from './panels/HomePanel';
import ProductsPanel from './panels/ProductsPanel';
import AboutPanel from './panels/AboutPanel';
import CustomizationPanel from './panels/CustomizationPanel';
import ContactPanel from './panels/ContactPanel';

interface Props { onLogout: () => void; }

const gold = '#D4AF37';
const goldLight = '#F6E27A';

const btnStyle: React.CSSProperties = {
  padding: '10px 24px', borderRadius: '12px', border: 'none', cursor: 'pointer',
  fontSize: '0.9rem', fontWeight: 600, transition: 'all 0.3s',
};

export default function AdminDashboard({ onLogout }: Props) {
  const [content, setContent] = useState<SiteContent>(getSiteContent());
  const [activeTab, setActiveTab] = useState('home');
  const [saved, setSaved] = useState(false);
  const user = getCurrentUser();
  const contentRef = React.useRef(content);

  useEffect(() => { contentRef.current = content; }, [content]);

  useEffect(() => { setContent(getSiteContent()); }, []);

  const save = () => {
    try {
      console.log('💾 [ADMIN SAVE] Initiating save...');
      console.log('💾 [ADMIN SAVE] Current content state:', contentRef.current);
      console.log('💾 [ADMIN SAVE] Customization:', contentRef.current.customization);
      console.log('💾 [ADMIN SAVE] CTA:', contentRef.current.cta);

      // Persist the latest content (use ref to avoid stale closures)
      saveSiteContent(contentRef.current);

      console.log('✅ [ADMIN SAVE] Save completed');
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        console.log('💾 [ADMIN SAVE] Save indicator reset');
      }, 2000);
    } catch (error) {
      console.error('❌ [ADMIN SAVE] Save failed:', error);
      alert('Error saving changes. Check console for details.');
    }
  };

  const reset = () => {
    if (confirm('Reset all content to defaults?')) {
      resetSiteContent();
      setContent(getSiteContent());
    }
  };

  const doLogout = () => { logout(); onLogout(); };

  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Product' },
    { id: 'about', label: 'About' },
    { id: 'customization', label: 'Customization' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0A0A0A 0%, #111 50%, #0A0A0A 100%)',
      color: '#fff', fontFamily: "'Roboto Condensed', sans-serif",
    }}>
      {/* Top Navigation Bar */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(212,175,55,0.15)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: '200px' }}>
            <a href="#" style={{
              fontFamily: "'Libre Baskerville', serif", fontSize: '1.2rem',
              background: `linear-gradient(135deg, #fff 0%, ${gold} 100%)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text', textDecoration: 'none',
            }}>Crafted Legacy</a>
            <span style={{
              padding: '4px 12px', borderRadius: '8px', fontSize: '0.7rem',
              background: 'rgba(212,175,55,0.15)', color: gold, letterSpacing: '0.1em',
              textTransform: 'uppercase', border: '1px solid rgba(212,175,55,0.2)',
            }}>Admin</span>
          </div>
          
          <nav style={{ display: 'flex', gap: '16px', justifyContent: 'center', flex: 1 }}>
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                background: activeTab === tab.id ? 'rgba(212,175,55,0.12)' : 'transparent',
                color: activeTab === tab.id ? gold : 'rgba(255,255,255,0.6)',
                border: activeTab === tab.id ? '1px solid rgba(212,175,55,0.2)' : '1px solid transparent',
                padding: '8px 24px', borderRadius: '24px', cursor: 'pointer',
                fontSize: '0.95rem', fontWeight: activeTab === tab.id ? 600 : 400,
                transition: 'all 0.3s ease',
              }}>
                {tab.label}
              </button>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: '200px', justifyContent: 'flex-end' }}>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>{user}</span>
            <button onClick={doLogout} style={{
              ...btnStyle, background: 'rgba(220,38,38,0.15)', color: '#fca5a5',
              border: '1px solid rgba(220,38,38,0.2)', padding: '6px 16px',
            }}>Logout</button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 20px' }}>
        <main>
          {activeTab === 'home' && <HomePanel content={content} setContent={setContent} onSave={save} onReset={reset} saved={saved} />}
          {activeTab === 'products' && <ProductsPanel content={content} setContent={setContent} onSave={save} onReset={reset} saved={saved} />}
          {activeTab === 'about' && <AboutPanel content={content} setContent={setContent} onSave={save} onReset={reset} saved={saved} />}
          {activeTab === 'customization' && <CustomizationPanel content={content} setContent={setContent} onSave={save} onReset={reset} saved={saved} />}
          {activeTab === 'contact' && <ContactPanel content={content} setContent={setContent} onSave={save} onReset={reset} saved={saved} />}
        </main>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .admin-select {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          background-color: rgba(0, 0, 0, 0.98);
          color: #fff;
          border: 1px solid rgba(212, 175, 55, 0.35);
          border-radius: 12px;
          font-family: 'Roboto Condensed', sans-serif;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03), 0 8px 24px rgba(0, 0, 0, 0.35);
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
        }

        .admin-select:hover {
          border-color: rgba(212, 175, 55, 0.55);
          background-color: rgba(8, 8, 8, 0.98);
        }

        .admin-select:focus {
          border-color: #D4AF37;
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.18), 0 10px 30px rgba(0, 0, 0, 0.35);
          outline: none;
        }

        .admin-select option {
          background-color: #080808;
          color: #F7F4EE;
          padding: 10px;
          font-family: 'Roboto Condensed', sans-serif;
        }

        .admin-select option:hover,
        .admin-select option:checked {
          background: linear-gradient(135deg, #D4AF37 0%, #F6E27A 100%);
          color: #101010;
        }
      `}</style>
    </div>
  );
}
