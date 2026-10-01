import React from 'react';
import { SiteContent, saveSiteContent } from '../adminStore';
import ImageUpload from '../ImageUpload';
import IconSelect from '../IconSelect';
import { getIconComponent, iconOptions } from '../iconOptions';

const gold = '#D4AF37';
const goldLight = '#F6E27A';

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
const iconSelectStyle: React.CSSProperties = {
  ...inputStyle,
  background: '#fff',
  color: '#000',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4), 0 8px 24px rgba(0, 0, 0, 0.12)',
};
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)',
  letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '4px',
};
const btnStyle: React.CSSProperties = {
  padding: '10px 24px', borderRadius: '12px', border: 'none', cursor: 'pointer',
  fontSize: '0.9rem', fontWeight: 600, transition: 'all 0.3s',
};

interface Props {
  content: SiteContent;
  setContent: React.Dispatch<React.SetStateAction<SiteContent>>;
  onSave: () => void;
  onReset: () => void;
  saved: boolean;
}

export default function HomePanel({ content, setContent, onSave, onReset, saved }: Props) {
  const updateHome = (field: string, value: string) =>
    setContent((p) => ({ ...p, home: { ...p.home, [field]: value } }));

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, setter: (b64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) { const b64 = await fileToBase64(file); setter(b64); }
  };

  const updateCommitment = (i: number, field: string, value: string) =>
    setContent((p) => {
      const arr = [...p.commitments]; arr[i] = { ...arr[i], [field]: value }; return { ...p, commitments: arr };
    });

  const updateCommitmentIcon = (i: number, value: string) =>
    setContent((p) => {
      const currentIcons = p.icons?.commitmentIcons || ['gem', 'award', 'sparkles'];
      const nextIcons = [...currentIcons];
      nextIcons[i] = value;
      return { ...p, icons: { ...p.icons, commitmentIcons: nextIcons } };
    });

  const updateCTA = (field: string, value: string) =>
    setContent((p) => ({ ...p, homeSignature: { ...p.homeSignature, [field]: value } }));

  const updateTestimonial = (i: number, field: string, value: string | number) =>
    setContent((p) => {
      const arr = [...p.testimonials]; arr[i] = { ...arr[i], [field]: value }; return { ...p, testimonials: arr };
    });

  const persistTestimonials = (testimonials: SiteContent['testimonials']) => {
    const nextContent: SiteContent = { ...content, testimonials };
    setContent(nextContent);
    saveSiteContent(nextContent);
  };

  const addTestimonial = () => {
    const nextTestimonials = [...(content.testimonials || []), { name: '', company: '', review: '', rating: 5 }];
    persistTestimonials(nextTestimonials);
  };

  const removeTestimonial = (i: number) => {
    if (!window.confirm('Delete this testimonial?')) return;
    const nextTestimonials = (content.testimonials || []).filter((_, index) => index !== i);
    persistTestimonials(nextTestimonials);
  };

  const moveTestimonialUp = (i: number) => {
    if (i <= 0) return;
    const nextTestimonials = [...(content.testimonials || [])];
    const temp = nextTestimonials[i - 1];
    nextTestimonials[i - 1] = nextTestimonials[i];
    nextTestimonials[i] = temp;
    persistTestimonials(nextTestimonials);
  };

  const moveTestimonialDown = (i: number) => {
    const nextTestimonials = [...(content.testimonials || [])];
    if (i >= nextTestimonials.length - 1) return;
    const temp = nextTestimonials[i + 1];
    nextTestimonials[i + 1] = nextTestimonials[i];
    nextTestimonials[i] = temp;
    persistTestimonials(nextTestimonials);
  };

  const updateCollectionIcon = (field: 'collectionPlaceholderIcon' | 'collectionCloseIcon', value: string) =>
    setContent((p) => ({ ...p, icons: { ...p.icons, [field]: value } }));

  const updateTestimonialStarIcon = (value: string) =>
    setContent((p) => ({ ...p, icons: { ...p.icons, testimonialStarIcon: value } }));

  const updateSectionHeader = (field: string, value: string) =>
    setContent((p) => ({ ...p, sectionHeaders: { ...p.sectionHeaders, [field]: value } }));

  return (
    <div>
      {/* Page Header */}
      <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1.3rem',
        background: `linear-gradient(135deg, #fff 0%, ${gold} 100%)`,
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', margin: '0 0 8px 0'
      }}>Home</h3>
      <p style={{ margin: '0 0 12px 0', color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem' }}>Manage the main hero heading, subheading, button text, and background image.</p>

      <div style={{ border: '1px solid rgba(212,175,55,0.18)', borderRadius: '18px', padding: '16px', background: 'rgba(255,255,255,0.03)', marginBottom: '18px' }}>
        <p style={{ ...labelStyle, color: gold, marginBottom: '12px' }}>Hero Content</p>
        <div style={{ marginBottom: '12px' }}>
          <label style={labelStyle}>Main Heading</label>
          <input style={inputStyle} value={content.home.heading} onChange={(e) => updateHome('heading', e.target.value)} />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label style={labelStyle}>Subheading</label>
          <textarea style={{ ...inputStyle, minHeight: '96px', resize: 'vertical' }} value={content.home.subheading} onChange={(e) => updateHome('subheading', e.target.value)} />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label style={labelStyle}>Button Text</label>
          <input style={inputStyle} value={content.home.buttonText} onChange={(e) => updateHome('buttonText', e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Background Image</label>
          <ImageUpload value={content.home.backgroundImage} onChange={(b64) => updateHome('backgroundImage', b64)} />
        </div>
      </div>

      {/* Commitment Cards */}
      <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1.3rem',
        background: `linear-gradient(135deg, #fff 0%, ${gold} 100%)`,
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', margin: '0 0 8px 0'
      }}>Commitment Cards</h3>
      <p style={{ margin: '0 0 12px 0', color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem' }}>Manage the three commitment cards displayed on the home page.</p>

      <div style={{ border: '1px solid rgba(212,175,55,0.18)', borderRadius: '18px', padding: '16px', background: 'rgba(255,255,255,0.03)', marginBottom: '18px' }}>
        <div style={{ marginBottom: '18px' }}>
          <p style={{ ...labelStyle, color: gold, marginBottom: '12px' }}>Commitment Section Title</p>
          <div>
            <label style={labelStyle}>Commitment Section Title</label>
            <input style={inputStyle} value={content.sectionHeaders.commitmentTitle} onChange={(e) => updateSectionHeader('commitmentTitle', e.target.value)} />
          </div>
        </div>

        {content.commitments.map((item, i) => {
          const iconName = (content.icons?.commitmentIcons || ['gem', 'award', 'sparkles'])[i] || 'gem';
          const Icon = getIconComponent(iconName, undefined);
          return (
            <div key={i} style={{ ...cardStyle, marginBottom: '16px' }}>
              <p style={{ ...labelStyle, color: gold, marginBottom: '12px' }}>Card {i + 1}</p>
              <div style={{ marginBottom: '16px', padding: '14px', border: '1px solid rgba(212,175,55,0.16)', borderRadius: '14px', background: 'rgba(255,255,255,0.03)' }}>
                <p style={{ ...labelStyle, color: gold, marginBottom: '12px' }}>Icon Management</p>
                <div style={{ marginBottom: '12px' }}>
                  <label style={labelStyle}>Icon Selector</label>
                  <IconSelect value={iconName} options={iconOptions} onChange={(value) => updateCommitmentIcon(i, value)} />
                </div>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={labelStyle}>Title</label>
                <input style={inputStyle} value={item.title} onChange={(e) => updateCommitment(i, 'title', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Description</label>
                <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} value={item.description}
                  onChange={(e) => updateCommitment(i, 'description', e.target.value)} />
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA admin block removed per admin rules (frontend CTA remains) */}

      {/* Collections Editor */}
      <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1.3rem',
        background: `linear-gradient(135deg, #fff 0%, ${gold} 100%)`,
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', margin: '0 0 8px 0'
      }}>Feature Collections</h3>
      <p style={{ margin: '0 0 12px 0', color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem' }}>Edit feature collections: title, image, visibility, order.</p>

      <div style={{ border: '1px solid rgba(212,175,55,0.18)', borderRadius: '18px', padding: '16px', background: 'rgba(255,255,255,0.03)', marginBottom: '18px' }}>
        {((content.collections || []).map((col, idx) => ({ col, idx })).filter(({ col }) => col.isFeaturedCollection !== false)).map(({ col, idx }) => {
          const collectionIconName = content.icons?.collectionPlaceholderIcon || 'shopping-bag';
          const CollectionIcon = getIconComponent(collectionIconName, undefined);
          return (
            <div key={idx} style={{ ...cardStyle, marginBottom: '16px' }}>
              <p style={{ ...labelStyle, color: gold, marginBottom: '12px' }}>Collection {idx + 1}</p>
              <div style={{ marginBottom: '12px' }}>
                <label style={labelStyle}>Title</label>
                <input style={inputStyle} value={col.title} onChange={(e) => setContent((p) => { const arr = [...(p.collections || [])]; arr[idx] = { ...arr[idx], title: e.target.value }; return { ...p, collections: arr } })} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={labelStyle}>Image</label>
                <ImageUpload value={col.image} onChange={(b64) => setContent((p) => { const arr = [...(p.collections || [])]; arr[idx] = { ...arr[idx], image: b64 }; return { ...p, collections: arr } })} />
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                <label style={{ ...labelStyle, marginTop: '6px' }}>
                  <input type="checkbox" checked={!!col.isVisible} onChange={(e) => setContent((p) => { const arr = [...(p.collections || [])]; arr[idx] = { ...arr[idx], isVisible: e.target.checked }; return { ...p, collections: arr } })} />
                  {' '}Visible
                </label>
                <button onClick={() => setContent((p) => { const arr = [...(p.collections || [])]; if (idx>0) { const t = arr[idx-1]; arr[idx-1]=arr[idx]; arr[idx]=t; } return { ...p, collections: arr } })} style={{ ...btnStyle, padding: '8px 10px' }} aria-label="Move Up">Move Up</button>
                <button onClick={() => setContent((p) => { const arr = [...(p.collections || [])]; if (idx < arr.length-1) { const t = arr[idx+1]; arr[idx+1]=arr[idx]; arr[idx]=t; } return { ...p, collections: arr } })} style={{ ...btnStyle, padding: '8px 10px' }} aria-label="Move Down">Move Down</button>
                <button onClick={() => setContent((p) => ({ ...p, collections: (p.collections || []).filter((_, i) => i !== idx) }))} style={{ ...btnStyle, padding: '8px 10px', background: 'rgba(220,38,38,0.12)', color: '#fca5a5' }} aria-label="Remove">Remove</button>
              </div>
            </div>
          );
        })}
      </div>
      <button onClick={() => setContent((p) => ({ ...p, collections: [...(p.collections || []), { title: 'New Collection', image: '', isVisible: true, isFeaturedCollection: true }] }))} style={{ ...btnStyle, marginBottom: '18px' }}>Add Collection</button>

      {/* Testimonials */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
        <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1.3rem',
          background: `linear-gradient(135deg, #fff 0%, ${gold} 100%)`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', margin: 0
        }}>Testimonials</h3>
        <button onClick={addTestimonial} style={{ ...btnStyle, padding: '8px 16px', background: `linear-gradient(135deg, ${gold} 0%, ${goldLight} 100%)`, color: '#000' }}>
          Add
        </button>
      </div>
      <p style={{ margin: '0 0 12px 0', color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem' }}>Manage customer testimonials with name, company, review, and rating.</p>

      <div style={{ border: '1px solid rgba(212,175,55,0.18)', borderRadius: '18px', padding: '16px', background: 'rgba(255,255,255,0.03)', marginBottom: '18px' }}>
        {content.testimonials.map((item, i) => {
          const testimonialIconName = content.icons?.testimonialStarIcon || 'star';
          const TestimonialIcon = getIconComponent(testimonialIconName, undefined);
          return (
            <div key={i} style={{ ...cardStyle, marginBottom: '16px' }}>
              <p style={{ ...labelStyle, color: gold, marginBottom: '12px' }}>Testimonial {i + 1}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label style={labelStyle}>Name</label>
                  <input style={inputStyle} value={item.name} onChange={(e) => updateTestimonial(i, 'name', e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Designation</label>
                  <input style={inputStyle} value={item.company || ''} onChange={(e) => updateTestimonial(i, 'company', e.target.value)} />
                </div>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={labelStyle}>Review</label>
                <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} value={item.review}
                  onChange={(e) => updateTestimonial(i, 'review', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Rating (1-5)</label>
                <input type="number" min="1" max="5" style={inputStyle} value={item.rating} onChange={(e) => updateTestimonial(i, 'rating', parseInt(e.target.value))} />
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                <button type="button" onClick={() => moveTestimonialUp(i)} style={{ ...btnStyle, padding: '8px 10px' }} aria-label="Move Up">Move Up</button>
                <button type="button" onClick={() => moveTestimonialDown(i)} style={{ ...btnStyle, padding: '8px 10px' }} aria-label="Move Down">Move Down</button>
                <button type="button" onClick={() => removeTestimonial(i)} style={{ ...btnStyle, padding: '8px 10px', background: 'rgba(220,38,38,0.12)', color: '#fca5a5' }} aria-label="Delete">Delete</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Define your corporate signature admin block */}
      <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1.3rem',
        background: `linear-gradient(135deg, #fff 0%, ${gold} 100%)`,
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', margin: '18px 0 8px 0'
      }}>Define your corporate signature</h3>
      <p style={{ margin: '0 0 12px 0', color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem' }}>Manage the home page signature heading, description, button text, and redirect URL.</p>

      <div style={{ border: '1px solid rgba(212,175,55,0.18)', borderRadius: '18px', padding: '16px', background: 'rgba(255,255,255,0.03)', marginBottom: '18px' }}>
        <div style={{ marginBottom: '12px' }}>
          <label style={labelStyle}>Heading</label>
          <input style={inputStyle} value={content.homeSignature?.heading || ''} onChange={(e) => updateCTA('heading', e.target.value)} />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label style={labelStyle}>Description</label>
          <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} value={content.homeSignature?.description || ''} onChange={(e) => updateCTA('description', e.target.value)} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={labelStyle}>Button Text</label>
            <input style={inputStyle} value={content.homeSignature?.buttonText || ''} onChange={(e) => updateCTA('buttonText', e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Button Link / Redirect URL</label>
            <input style={inputStyle} value={content.homeSignature?.buttonLink || ''} onChange={(e) => updateCTA('buttonLink', e.target.value)} placeholder="/contact" />
          </div>
        </div>
      </div>

      {/* Collections section headers removed from admin per request (frontend remains) */}

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
