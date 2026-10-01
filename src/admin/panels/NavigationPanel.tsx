import React from 'react';
import { SiteContent } from '../adminStore';
import IconSelect from '../IconSelect';
import { getIconComponent, iconOptions } from '../iconOptions';

const cardStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
  border: '1px solid rgba(212,175,55,0.15)', borderRadius: '24px', padding: '28px', marginBottom: '24px',
};
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '12px 16px', borderRadius: '12px',
  border: '1px solid rgba(212,175,55,0.28)', background: 'linear-gradient(135deg, #242424 0%, #1E1E1E 100%)',
  color: '#fff', fontSize: '0.92rem', boxSizing: 'border-box', marginTop: '6px',
  fontFamily: '"Roboto Condensed", sans-serif',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03), 0 8px 24px rgba(0, 0, 0, 0.35)',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
};
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)',
  letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '4px',
};
const btnStyle: React.CSSProperties = {
  padding: '10px 24px', borderRadius: '12px', border: 'none', cursor: 'pointer',
  fontSize: '0.9rem', fontWeight: 600, transition: 'all 0.3s',
};
const gold = '#D4AF37';

interface Props {
  content: SiteContent;
  setContent: React.Dispatch<React.SetStateAction<SiteContent>>;
  onSave: () => void;
  onReset: () => void;
  saved: boolean;
}

export default function NavigationPanel({ content, setContent, onSave, onReset, saved }: Props) {
  const updateNavbar = (field: string, value: string) =>
    setContent((p) => ({ ...p, navbar: { ...p.navbar, [field]: value } }));

  const updateMenuItem = (index: number, field: string, value: string) =>
    setContent((p) => {
      const arr = [...p.navbar.menuItems];
      arr[index] = { ...arr[index], [field]: value };
      return { ...p, navbar: { ...p.navbar, menuItems: arr } };
    });

  const updateSocialLink = (index: number, field: string, value: string) =>
    setContent((p) => {
      const arr = [...p.navbar.socialLinks];
      arr[index] = { ...arr[index], [field]: value };
      return { ...p, navbar: { ...p.navbar, socialLinks: arr } };
    });

  const updateNavbarIcon = (field: 'navbarMenuIcon' | 'navbarCloseIcon', value: string) =>
    setContent((p) => ({ ...p, icons: { ...p.icons, [field]: value } }));

  return (
    <div>
      {/* Navbar Content */}
      <div style={{ ...cardStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <div>
          <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1.3rem',
            background: `linear-gradient(135deg, #fff 0%, ${gold} 100%)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', margin: 0
          }}>Navigation Bar</h3>
          <p style={{ margin: '8px 0 0', color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem' }}>
            Manage the logo text, navigation menu items, and social media links displayed in the header.
          </p>
        </div>
      </div>

      <div style={{ border: '1px solid rgba(212,175,55,0.18)', borderRadius: '18px', padding: '20px', background: 'rgba(255,255,255,0.03)', marginBottom: '24px' }}>
        <p style={{ ...labelStyle, color: gold, marginBottom: '12px' }}>Logo & Branding</p>
        <div style={{ marginBottom: '12px' }}>
          <label style={labelStyle}>Logo Text</label>
          <input style={inputStyle} value={content.navbar.logoText} onChange={(e) => updateNavbar('logoText', e.target.value)} />
        </div>
      </div>

      <div style={{ border: '1px solid rgba(212,175,55,0.18)', borderRadius: '18px', padding: '20px', background: 'rgba(255,255,255,0.03)', marginBottom: '24px' }}>
        <p style={{ ...labelStyle, color: gold, marginBottom: '12px' }}>Mobile Icon Controls</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
          <div>
            <label style={labelStyle}>Menu Open Icon</label>
            <IconSelect value={content.icons?.navbarMenuIcon || 'menu'} options={iconOptions} onChange={(value) => updateNavbarIcon('navbarMenuIcon', value)} />
          </div>
          <div>
            <label style={labelStyle}>Menu Close Icon</label>
            <IconSelect value={content.icons?.navbarCloseIcon || 'x'} options={iconOptions} onChange={(value) => updateNavbarIcon('navbarCloseIcon', value)} />
          </div>
        </div>
      </div>

      <div style={{ border: '1px solid rgba(212,175,55,0.18)', borderRadius: '18px', padding: '20px', background: 'rgba(255,255,255,0.03)', marginBottom: '24px' }}>
        <p style={{ ...labelStyle, color: gold, marginBottom: '12px' }}>Navigation Menu Items</p>
        {content.navbar.menuItems.map((item, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            <div>
              <label style={labelStyle}>Menu Item Name</label>
              <input style={inputStyle} value={item.name} onChange={(e) => updateMenuItem(i, 'name', e.target.value)} placeholder="Name" />
            </div>
            <div>
              <label style={labelStyle}>Menu Item Path</label>
              <input style={inputStyle} value={item.path} onChange={(e) => updateMenuItem(i, 'path', e.target.value)} placeholder="Path" />
            </div>
          </div>
        ))}
      </div>

      <div style={{ border: '1px solid rgba(212,175,55,0.18)', borderRadius: '18px', padding: '20px', background: 'rgba(255,255,255,0.03)', marginBottom: '24px' }}>
        <p style={{ ...labelStyle, color: gold, marginBottom: '12px' }}>Social Media Links</p>
        {content.navbar.socialLinks.map((item, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            <div>
              <label style={labelStyle}>Platform Name</label>
              <input style={inputStyle} value={item.name} onChange={(e) => updateSocialLink(i, 'name', e.target.value)} placeholder="Name" />
            </div>
            <div>
              <label style={labelStyle}>Social URL</label>
              <input style={inputStyle} value={item.url} onChange={(e) => updateSocialLink(i, 'url', e.target.value)} placeholder="URL" />
            </div>
          </div>
        ))}
      </div>

      {/* Global Actions for Section */}
      <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
        <button onClick={onSave} style={{
          ...btnStyle, flex: 1, background: `linear-gradient(135deg, ${gold} 0%, #F6E27A 100%)`, color: '#000'
        }}>
          {saved ? '✓ Saved!' : 'Save'}
        </button>
        <button onClick={onReset} style={{
          ...btnStyle, flex: 1, background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.1)'
        }}>
          Restore to Default
        </button>
      </div>
    </div>
  );
}
