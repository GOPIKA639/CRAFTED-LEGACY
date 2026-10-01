import React from 'react';
import { SiteContent } from '../adminStore';
import ImageUpload from '../ImageUpload';
import IconSelect from '../IconSelect';
import { iconOptions } from '../iconOptions';

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

export default function AboutPanel({ content, setContent, onSave, onReset, saved }: Props) {
  const update = (field: string, value: string) =>
    setContent((p) => ({ ...p, about: { ...p.about, [field]: value } }));

  const updateSectionHeader = (field: string, value: string) =>
    setContent((p) => ({ ...p, sectionHeaders: { ...p.sectionHeaders, [field]: value } }));

  return (
    <div>
      {/* Story Behind Crafted Legacy */}
      <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1.3rem',
        background: `linear-gradient(135deg, #fff 0%, ${gold} 100%)`,
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', margin: '0 0 8px 0'
      }}>Story Behind Crafted Legacy</h3>
      <p style={{ margin: '0 0 12px 0', color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem' }}>Manage the story section title and description.</p>

      <div style={{ border: '1px solid rgba(212,175,55,0.18)', borderRadius: '18px', padding: '16px', background: 'rgba(255,255,255,0.03)', marginBottom: '18px' }}>
        <p style={{ ...labelStyle, color: gold, marginBottom: '12px' }}>Story Content</p>
        <div style={{ marginBottom: '12px' }}>
          <label style={labelStyle}>Title</label>
          <input style={inputStyle} value={content.about.storyTitle} onChange={(e) => update('storyTitle', e.target.value)} />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label style={labelStyle}>Description</label>
          <textarea style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }} value={content.about.storyDescription}
            onChange={(e) => update('storyDescription', e.target.value)} />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label style={labelStyle}>Intro Paragraph Blocks (editable)</label>
          {(content.about.storyBlocks || []).map((blk, idx) => (
            <div key={idx} style={{ marginBottom: '8px' }}>
              <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} value={blk}
                onChange={(e) => setContent((p) => {
                  const arr = [...(p.about.storyBlocks || [])]; arr[idx] = e.target.value; return { ...p, about: { ...p.about, storyBlocks: arr } };
                })} />
              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                <button onClick={() => setContent((p) => {
                  const arr = [...(p.about.storyBlocks || [])]; if (idx > 0) { const t = arr[idx-1]; arr[idx-1] = arr[idx]; arr[idx] = t; } return { ...p, about: { ...p.about, storyBlocks: arr } };
                })} style={{ ...btnStyle, padding: '6px 10px' }} aria-label="Move Up">Move Up</button>
                <button onClick={() => setContent((p) => {
                  const arr = [...(p.about.storyBlocks || [])]; if (idx < arr.length-1) { const t = arr[idx+1]; arr[idx+1] = arr[idx]; arr[idx] = t; } return { ...p, about: { ...p.about, storyBlocks: arr } };
                })} style={{ ...btnStyle, padding: '6px 10px' }} aria-label="Move Down">Move Down</button>
                <button onClick={() => setContent((p) => ({ ...p, about: { ...p.about, storyBlocks: (p.about.storyBlocks || []).filter((_, i) => i !== idx) } }))} style={{ ...btnStyle, padding: '6px 10px', background: 'rgba(220,38,38,0.12)', color: '#fca5a5' }} aria-label="Remove">Remove</button>
              </div>
            </div>
          ))}
          <button onClick={() => setContent((p) => ({ ...p, about: { ...p.about, storyBlocks: [...(p.about.storyBlocks || []), ''] } }))} style={{ ...btnStyle, marginTop: '6px' }}>Add Paragraph</button>
        </div>
      </div>

      {/* What Drives Us */}
      <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1.3rem',
        background: `linear-gradient(135deg, #fff 0%, ${gold} 100%)`,
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', margin: '0 0 8px 0'
      }}>What Drives Us</h3>
      <p style={{ margin: '0 0 12px 0', color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem' }}>Manage the mission section title and description.</p>

      <div style={{ border: '1px solid rgba(212,175,55,0.18)', borderRadius: '18px', padding: '16px', background: 'rgba(255,255,255,0.03)', marginBottom: '18px' }}>
        <div style={{ marginBottom: '18px' }}>
          <p style={{ ...labelStyle, color: gold, marginBottom: '12px' }}>Mission Section Title</p>
          <label style={labelStyle}>Mission Section Title</label>
          <input style={inputStyle} value={content.about.missionTitle} onChange={(e) => update('missionTitle', e.target.value)} />
        </div>

        {(content.about.missionCards || []).map((card, idx) => (
          <div key={idx} style={{ ...cardStyle, marginBottom: '16px' }}>
            <p style={{ ...labelStyle, color: gold, marginBottom: '12px' }}>Card {idx + 1}</p>
            <div style={{ marginBottom: '16px', padding: '14px', border: '1px solid rgba(212,175,55,0.16)', borderRadius: '14px', background: 'rgba(255,255,255,0.03)' }}>
              <p style={{ ...labelStyle, color: gold, marginBottom: '12px' }}>Icon Management</p>
              <div>
                <label style={labelStyle}>Icon Selector</label>
                <IconSelect value={card.icon || 'sparkles'} options={iconOptions} onChange={(value) => setContent((p) => { const arr = [...(p.about.missionCards || [])]; arr[idx] = { ...arr[idx], icon: value }; return { ...p, about: { ...p.about, missionCards: arr } } })} />
              </div>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={labelStyle}>Card Title</label>
              <input style={inputStyle} value={card.title} onChange={(e) => setContent((p) => { const arr = [...(p.about.missionCards || [])]; arr[idx] = { ...arr[idx], title: e.target.value }; return { ...p, about: { ...p.about, missionCards: arr } } })} />
            </div>
            <div>
              <label style={labelStyle}>Card Description</label>
              <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} value={card.description} onChange={(e) => setContent((p) => { const arr = [...(p.about.missionCards || [])]; arr[idx] = { ...arr[idx], description: e.target.value }; return { ...p, about: { ...p.about, missionCards: arr } } })} />
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
              <button onClick={() => setContent((p) => { const arr = [...(p.about.missionCards || [])]; if (idx>0) { const t = arr[idx-1]; arr[idx-1]=arr[idx]; arr[idx]=t; } return { ...p, about: { ...p.about, missionCards: arr } } })} style={{ ...btnStyle, padding: '6px 10px' }} aria-label="Move Up">Move Up</button>
              <button onClick={() => setContent((p) => { const arr = [...(p.about.missionCards || [])]; if (idx < arr.length-1) { const t = arr[idx+1]; arr[idx+1]=arr[idx]; arr[idx]=t; } return { ...p, about: { ...p.about, missionCards: arr } } })} style={{ ...btnStyle, padding: '6px 10px' }} aria-label="Move Down">Move Down</button>
              <button onClick={() => setContent((p) => ({ ...p, about: { ...p.about, missionCards: (p.about.missionCards || []).filter((_, i) => i !== idx) } }))} style={{ ...btnStyle, padding: '6px 10px', background: 'rgba(220,38,38,0.12)', color: '#fca5a5' }} aria-label="Remove">Remove</button>
            </div>
          </div>
        ))}
        <button onClick={() => setContent((p) => ({ ...p, about: { ...p.about, missionCards: [...(p.about.missionCards || []), { title: 'New Card', description: '', icon: 'sparkles' }] } }))} style={{ ...btnStyle, marginTop: '6px' }}>Add Card</button>
      </div>

      {/* Craftsmanship Heritage */}
      <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1.3rem',
        background: `linear-gradient(135deg, #fff 0%, ${gold} 100%)`,
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', margin: '0 0 8px 0'
      }}>Craftsmanship Heritage</h3>
      <p style={{ margin: '0 0 12px 0', color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem' }}>Manage the heritage section title, description, and image.</p>

      <div style={{ border: '1px solid rgba(212,175,55,0.18)', borderRadius: '18px', padding: '16px', background: 'rgba(255,255,255,0.03)', marginBottom: '18px' }}>
        <p style={{ ...labelStyle, color: gold, marginBottom: '12px' }}>Heritage Content</p>
        <div style={{ marginBottom: '12px' }}>
          <label style={labelStyle}>Title</label>
          <input style={inputStyle} value={content.about.heritageTitle} onChange={(e) => update('heritageTitle', e.target.value)} />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label style={labelStyle}>Description</label>
          <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} value={content.about.heritageDescription}
            onChange={(e) => update('heritageDescription', e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Image</label>
          <ImageUpload value={content.about.heritageImage} onChange={(b64) => update('heritageImage', b64)} />
        </div>
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
