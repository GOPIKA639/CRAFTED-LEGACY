import React, { useState } from 'react';
import { SiteContent, saveSiteContent } from '../adminStore';

const cardStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
  border: '1px solid rgba(212,175,55,0.15)', borderRadius: '20px', padding: '20px', marginBottom: '20px',
};
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 14px', borderRadius: '10px',
  border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)',
  color: '#fff', fontSize: '0.875rem', boxSizing: 'border-box', marginTop: '4px',
};
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)',
  letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '3px',
};
const btnStyle: React.CSSProperties = {
  padding: '8px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer',
  fontSize: '0.875rem', fontWeight: 600, transition: 'all 0.3s',
};
const gold = '#D4AF37';

interface Props {
  content: SiteContent;
  setContent: React.Dispatch<React.SetStateAction<SiteContent>>;
  onSave: () => void;
  onReset: () => void;
  saved: boolean;
}

export default function GeneralPanel({ content, setContent, onSave, onReset, saved }: Props) {
  const updateNavbar = (field: string, value: any) =>
    setContent((p) => ({ ...p, navbar: { ...p.navbar, [field]: value } }));

  const persistContent = (newContent: SiteContent) => {
    try {
      setContent(newContent);
      saveSiteContent(newContent);
    } catch (e) {
      console.error('Persist failed', e);
    }
  };

  const updateFooter = (field: string, value: any) =>
    setContent((p) => ({ ...p, footer: { ...p.footer, [field]: value } }));

  const updateCTA = (field: string, value: string) =>
    setContent((p) => ({ ...p, cta: { ...p.cta, [field]: value } }));

  const updateSectionHeader = (field: string, value: string) =>
    setContent((p) => ({ ...p, sectionHeaders: { ...p.sectionHeaders, [field]: value } }));

  const updateTestimonial = (index: number, field: string, value: any) =>
    setContent((p) => {
      const arr = [...p.testimonials];
      arr[index] = { ...arr[index], [field]: value };
      return { ...p, testimonials: arr };
    });

  const addTestimonial = () => {
    const newContent: SiteContent = { ...content, testimonials: [...(content.testimonials || []), { name: '', company: '', review: '', rating: 5 }] };
    persistContent(newContent);
  };

  const removeTestimonial = (index: number) => {
    if (!confirm('Delete this testimonial?')) return;
    const arr = (content.testimonials || []).filter((_, i) => i !== index);
    const newContent: SiteContent = { ...content, testimonials: arr };
    persistContent(newContent);
  };

  const moveTestimonialUp = (index: number) => {
    if (index <= 0) return;
    const arr = [...(content.testimonials || [])];
    const tmp = arr[index - 1]; arr[index - 1] = arr[index]; arr[index] = tmp;
    const newContent: SiteContent = { ...content, testimonials: arr };
    persistContent(newContent);
  };

  const moveTestimonialDown = (index: number) => {
    const arr = [...(content.testimonials || [])];
    if (index >= arr.length - 1) return;
    const tmp = arr[index + 1]; arr[index + 1] = arr[index]; arr[index] = tmp;
    const newContent: SiteContent = { ...content, testimonials: arr };
    persistContent(newContent);
  };

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

  const updateFooterLink = (index: number, field: string, value: string) =>
    setContent((p) => {
      const arr = [...p.footer.links];
      arr[index] = { ...arr[index], [field]: value };
      return { ...p, footer: { ...p.footer, links: arr } };
    });

  const updateFooterSocial = (index: number, field: string, value: string) =>
    setContent((p) => {
      const arr = [...p.footer.socialLinks];
      arr[index] = { ...arr[index], [field]: value };
      return { ...p, footer: { ...p.footer, socialLinks: arr } };
    });

  return (
    <div>
      {/* Navbar Content */}
      <div style={cardStyle}>
        <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1.3rem', marginBottom: '20px',
          background: `linear-gradient(135deg, #fff 0%, ${gold} 100%)`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>Navbar</h3>
        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>Logo Text</label>
          <input style={inputStyle} value={content.navbar.logoText} onChange={(e) => updateNavbar('logoText', e.target.value)} />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>Menu Items</label>
          {content.navbar.menuItems.map((item, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
              <input style={inputStyle} value={item.name} onChange={(e) => updateMenuItem(i, 'name', e.target.value)} placeholder="Name" />
              <input style={inputStyle} value={item.path} onChange={(e) => updateMenuItem(i, 'path', e.target.value)} placeholder="Path" />
            </div>
          ))}
        </div>
        <div>
          <label style={labelStyle}>Social Links</label>
          {content.navbar.socialLinks.map((item, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
              <input style={inputStyle} value={item.name} onChange={(e) => updateSocialLink(i, 'name', e.target.value)} placeholder="Name" />
              <input style={inputStyle} value={item.url} onChange={(e) => updateSocialLink(i, 'url', e.target.value)} placeholder="URL" />
            </div>
          ))}
        </div>
      </div>

      {/* Footer Content */}
      <div style={cardStyle}>
        <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1.3rem', marginBottom: '20px',
          background: `linear-gradient(135deg, #fff 0%, ${gold} 100%)`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>Footer</h3>
        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>Copyright Text</label>
          <input style={inputStyle} value={content.footer.copyrightText} onChange={(e) => updateFooter('copyrightText', e.target.value)} />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>Designer Text</label>
          <input style={inputStyle} value={content.footer.designerText} onChange={(e) => updateFooter('designerText', e.target.value)} />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>Designer URL</label>
          <input style={inputStyle} value={content.footer.designerUrl} onChange={(e) => updateFooter('designerUrl', e.target.value)} />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>Footer Links</label>
          {content.footer.links.map((item, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
              <input style={inputStyle} value={item.name} onChange={(e) => updateFooterLink(i, 'name', e.target.value)} placeholder="Name" />
              <input style={inputStyle} value={item.path} onChange={(e) => updateFooterLink(i, 'path', e.target.value)} placeholder="Path" />
            </div>
          ))}
        </div>
        <div>
          <label style={labelStyle}>Footer Social Links</label>
          {content.footer.socialLinks.map((item, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
              <input style={inputStyle} value={item.name} onChange={(e) => updateFooterSocial(i, 'name', e.target.value)} placeholder="Name" />
              <input style={inputStyle} value={item.url} onChange={(e) => updateFooterSocial(i, 'url', e.target.value)} placeholder="URL" />
            </div>
          ))}
        </div>
      </div>

      {/* CTA Content */}
      <div style={cardStyle}>
        <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1.3rem', marginBottom: '20px',
          background: `linear-gradient(135deg, #fff 0%, ${gold} 100%)`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>Call to Action</h3>
        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>Heading</label>
          <input style={inputStyle} value={content.cta.heading} onChange={(e) => updateCTA('heading', e.target.value)} />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={labelStyle}>Description</label>
          <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} value={content.cta.description}
            onChange={(e) => updateCTA('description', e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Button Text</label>
          <input style={inputStyle} value={content.cta.buttonText} onChange={(e) => updateCTA('buttonText', e.target.value)} />
        </div>
      </div>

      {/* Testimonials */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1.3rem', margin: 0,
            background: `linear-gradient(135deg, #fff 0%, ${gold} 100%)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>Testimonials</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={addTestimonial} style={{ ...btnStyle, background: `linear-gradient(135deg, ${gold} 0%, #F6E27A 100%)`, color: '#000', padding: '8px 16px' }}>
              Add Testimonial
            </button>
          </div>
        </div>
        {content.testimonials.map((testimonial, i) => (
          <div key={i} style={{ ...cardStyle, marginBottom: '16px', padding: '20px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '8px' }}>
              <button onClick={() => moveTestimonialUp(i)} title="Move Up" style={{ ...btnStyle, padding: '6px 10px', background: 'transparent', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.04)', fontSize: '0.8rem' }}>↑</button>
              <button onClick={() => moveTestimonialDown(i)} title="Move Down" style={{ ...btnStyle, padding: '6px 10px', background: 'transparent', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.04)', fontSize: '0.8rem' }}>↓</button>
              <button onClick={() => removeTestimonial(i)} title="Delete" style={{ ...btnStyle, padding: '6px 10px', background: 'rgba(220,38,38,0.15)', color: '#fca5a5', border: '1px solid rgba(220,38,38,0.2)', fontSize: '0.8rem' }}>✕</button>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={labelStyle}>Name</label>
              <input style={inputStyle} value={testimonial.name} onChange={(e) => updateTestimonial(i, 'name', e.target.value)} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={labelStyle}>Company</label>
              <input style={inputStyle} value={testimonial.company || ''} onChange={(e) => updateTestimonial(i, 'company', e.target.value)} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={labelStyle}>Review</label>
              <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} value={testimonial.review}
                onChange={(e) => updateTestimonial(i, 'review', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Rating (1-5)</label>
              <input type="number" min="1" max="5" style={inputStyle} value={testimonial.rating} onChange={(e) => updateTestimonial(i, 'rating', parseInt(e.target.value))} />
            </div>
          </div>
        ))}
      </div>

      {/* Section Headers */}
      <div style={cardStyle}>
        <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1.2rem', marginBottom: '16px',
          background: `linear-gradient(135deg, #fff 0%, ${gold} 100%)`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>Section Headers</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          <div>
            <label style={labelStyle}>Commitment Section Title</label>
            <input style={inputStyle} value={content.sectionHeaders.commitmentTitle} onChange={(e) => updateSectionHeader('commitmentTitle', e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Collections Section Title</label>
            <input style={inputStyle} value={content.sectionHeaders.collectionsTitle} onChange={(e) => updateSectionHeader('collectionsTitle', e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Collections Button Text</label>
            <input style={inputStyle} value={content.sectionHeaders.collectionsButtonText} onChange={(e) => updateSectionHeader('collectionsButtonText', e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>About Page Title</label>
            <input style={inputStyle} value={content.sectionHeaders.aboutPageTitle} onChange={(e) => updateSectionHeader('aboutPageTitle', e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Mission Section Title</label>
            <input style={inputStyle} value={content.sectionHeaders.missionSectionTitle} onChange={(e) => updateSectionHeader('missionSectionTitle', e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Craftsmanship Section Title</label>
            <input style={inputStyle} value={content.sectionHeaders.craftsmanshipTitle} onChange={(e) => updateSectionHeader('craftsmanshipTitle', e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Contact Page Title</label>
            <input style={inputStyle} value={content.sectionHeaders.contactPageTitle} onChange={(e) => updateSectionHeader('contactPageTitle', e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Products Page Title</label>
            <input style={inputStyle} value={content.sectionHeaders.productsPageTitle} onChange={(e) => updateSectionHeader('productsPageTitle', e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Categories Section Title</label>
            <input style={inputStyle} value={content.sectionHeaders.categoriesSectionTitle} onChange={(e) => updateSectionHeader('categoriesSectionTitle', e.target.value)} />
          </div>
        </div>
      </div>

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
