import React from 'react';
import { SiteContent } from '../adminStore';
import IconSelect from '../IconSelect';
import { getCustomizationFeatureIcon, iconOptions } from '../iconOptions';

const cardStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
  border: '1px solid rgba(212,175,55,0.15)', borderRadius: '24px', padding: '28px', marginBottom: '24px',
};
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '12px 16px', borderRadius: '12px',
  border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)',
  color: '#fff', fontSize: '0.9rem', boxSizing: 'border-box', marginTop: '6px',
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

const sectionTitleStyle: React.CSSProperties = {
  fontFamily: "'Libre Baskerville', serif",
  fontSize: '1.05rem',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: gold,
  marginBottom: '10px',
  marginTop: '4px',
};

type ProcessStepItem = { number: string; title: string; description: string; icon?: string; isVisible?: boolean };

const getFeatureIconOptions = (currentValue?: string) => {
  const currentOption = currentValue ? iconOptions.find((option) => option.value === currentValue) : undefined;
  if (!currentOption) return iconOptions;
  return [currentOption, ...iconOptions.filter((option) => option.value !== currentValue)];
};

interface Props {
  content: SiteContent;
  setContent: React.Dispatch<React.SetStateAction<SiteContent>>;
  onSave: () => void;
  onReset: () => void;
  saved: boolean;
}

export default function CustomizationPanel({ content, setContent, onSave, onReset, saved }: Props) {
  const update = (field: string, value: string) =>
    setContent((p) => ({ ...p, customization: { ...p.customization, [field]: value } }));

  const updateCTA = (field: string, value: string) =>
    setContent((p) => ({ ...p, cta: { ...(p.cta || {}), [field]: value } }));

  const updateFeatureIcon = (idx: number, value: string) =>
    setContent((p) => {
      const arr = [...(p.customization.features || [])];
      arr[idx] = { ...arr[idx], icon: value };
      return { ...p, customization: { ...p.customization, features: arr } };
    });

  const updateStepVisibility = (idx: number, value: boolean) =>
    setContent((p) => {
      const arr = [...(p.customization.processSteps || [])] as ProcessStepItem[];
      arr[idx] = { ...arr[idx], isVisible: value };
      return { ...p, customization: { ...p.customization, processSteps: arr } };
    });

  return (
    <div>
      <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1.3rem', marginBottom: '8px',
        background: `linear-gradient(135deg, #fff 0%, ${gold} 100%)`,
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      }}>Customization</h3>
      <p style={{ margin: '0 0 12px 0', color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem' }}>Manage the customization page content.</p>

      <div style={{ border: '1px solid rgba(212,175,55,0.18)', borderRadius: '18px', padding: '16px', background: 'rgba(255,255,255,0.03)', marginBottom: '18px' }}>
        <p style={{ ...labelStyle, color: gold, marginBottom: '12px' }}>Hero Section</p>
        <div style={{ marginBottom: '12px' }}>
          <label style={labelStyle}>Header Title</label>
          <input style={inputStyle} value={content.customization.headerTitle} onChange={(e) => update('headerTitle', e.target.value)} />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label style={labelStyle}>Header Description</label>
          <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} value={content.customization.headerDescription}
            onChange={(e) => update('headerDescription', e.target.value)} />
        </div>
      </div>

      <div style={{ marginBottom: '18px' }}>
        <h4 style={sectionTitleStyle}>Features</h4>
        <div style={{ border: '1px solid rgba(212,175,55,0.12)', borderRadius: '18px', padding: '16px', background: 'rgba(255,255,255,0.02)' }}>
          {(content.customization.features || []).map((f, idx) => (
            <div key={idx} style={{ ...cardStyle, marginBottom: '16px', padding: '20px' }}>
              <p style={{ ...labelStyle, color: gold, marginBottom: '12px' }}>Feature {idx + 1}</p>
              <div style={{ marginBottom: '16px', padding: '14px', border: '1px solid rgba(212,175,55,0.16)', borderRadius: '14px', background: 'rgba(255,255,255,0.03)' }}>
                <label style={labelStyle}>Feature Icon</label>
                <IconSelect value={f.icon || getCustomizationFeatureIcon(f.title)} options={getFeatureIconOptions(f.icon || getCustomizationFeatureIcon(f.title))} onChange={(value) => updateFeatureIcon(idx, value)} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={labelStyle}>Feature Title</label>
                <input style={inputStyle} value={f.title} onChange={(e) => setContent((p) => { const arr = [...(p.customization.features || [])]; arr[idx] = { ...arr[idx], title: e.target.value }; return { ...p, customization: { ...p.customization, features: arr } } })} />
              </div>
              <div>
                <label style={labelStyle}>Feature Description</label>
                <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} value={f.description} onChange={(e) => setContent((p) => { const arr = [...(p.customization.features || [])]; arr[idx] = { ...arr[idx], description: e.target.value }; return { ...p, customization: { ...p.customization, features: arr } } })} />
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                <button onClick={() => setContent((p) => { const arr = [...(p.customization.features || [])]; if (idx>0) { const t = arr[idx-1]; arr[idx-1]=arr[idx]; arr[idx]=t; } return { ...p, customization: { ...p.customization, features: arr } } })} style={{ ...btnStyle, padding: '6px 10px' }} aria-label="Move Up">Move Up</button>
                <button onClick={() => setContent((p) => { const arr = [...(p.customization.features || [])]; if (idx < arr.length-1) { const t = arr[idx+1]; arr[idx+1]=arr[idx]; arr[idx]=t; } return { ...p, customization: { ...p.customization, features: arr } } })} style={{ ...btnStyle, padding: '6px 10px' }} aria-label="Move Down">Move Down</button>
                <button onClick={() => setContent((p) => ({ ...p, customization: { ...p.customization, features: (p.customization.features || []).filter((_, i) => i !== idx) } }))} style={{ ...btnStyle, padding: '6px 10px', background: 'rgba(220,38,38,0.12)', color: '#fca5a5' }} aria-label="Remove">Remove</button>
              </div>
            </div>
          ))}
          <button onClick={() => setContent((p) => ({ ...p, customization: { ...p.customization, features: [...(p.customization.features || []), { title: 'New Feature', description: '', icon: 'star' }] } }))} style={{ ...btnStyle, marginTop: '6px' }}>Add Feature</button>
        </div>
      </div>

      <div style={{ marginBottom: '18px' }}>
        <h4 style={sectionTitleStyle}>Process Steps</h4>
        <div style={{ border: '1px solid rgba(212,175,55,0.12)', borderRadius: '18px', padding: '16px', background: 'rgba(255,255,255,0.02)' }}>
          {(content.customization.processSteps || []).map((s, idx) => (
            <div key={idx} style={{ ...cardStyle, marginBottom: '16px', padding: '20px' }}>
              <p style={{ ...labelStyle, color: gold, marginBottom: '12px' }}>Step {idx + 1}</p>
              <div style={{ marginBottom: '12px' }}>
                <label style={labelStyle}>Step Number</label>
                <input style={inputStyle} value={s.number} onChange={(e) => setContent((p) => { const arr = [...(p.customization.processSteps || [])]; arr[idx] = { ...arr[idx], number: e.target.value }; return { ...p, customization: { ...p.customization, processSteps: arr } } })} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={labelStyle}>Step Title</label>
                <input style={inputStyle} value={s.title} onChange={(e) => setContent((p) => { const arr = [...(p.customization.processSteps || [])]; arr[idx] = { ...arr[idx], title: e.target.value }; return { ...p, customization: { ...p.customization, processSteps: arr } } })} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={labelStyle}>Step Description</label>
                <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} value={s.description} onChange={(e) => setContent((p) => { const arr = [...(p.customization.processSteps || [])]; arr[idx] = { ...arr[idx], description: e.target.value }; return { ...p, customization: { ...p.customization, processSteps: arr } } })} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={labelStyle}>Visibility</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px', color: 'rgba(255,255,255,0.8)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={s.isVisible !== false}
                    onChange={(e) => updateStepVisibility(idx, e.target.checked)}
                    style={{ accentColor: gold, width: '16px', height: '16px' }}
                  />
                  <span>{s.isVisible !== false ? 'Visible on site' : 'Hidden from site'}</span>
                </label>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                <button onClick={() => setContent((p) => { const arr = [...(p.customization.processSteps || [])]; if (idx>0) { const t = arr[idx-1]; arr[idx-1]=arr[idx]; arr[idx]=t; } return { ...p, customization: { ...p.customization, processSteps: arr } } })} style={{ ...btnStyle, padding: '6px 10px' }} aria-label="Move Up">Move Up</button>
                <button onClick={() => setContent((p) => { const arr = [...(p.customization.processSteps || [])]; if (idx < arr.length-1) { const t = arr[idx+1]; arr[idx+1]=arr[idx]; arr[idx]=t; } return { ...p, customization: { ...p.customization, processSteps: arr } } })} style={{ ...btnStyle, padding: '6px 10px' }} aria-label="Move Down">Move Down</button>
                <button onClick={() => setContent((p) => ({ ...p, customization: { ...p.customization, processSteps: (p.customization.processSteps || []).filter((_, i) => i !== idx) } }))} style={{ ...btnStyle, padding: '6px 10px', background: 'rgba(220,38,38,0.12)', color: '#fca5a5' }} aria-label="Remove">Remove</button>
              </div>
            </div>
          ))}
          <button onClick={() => setContent((p) => ({ ...p, customization: { ...p.customization, processSteps: [...(p.customization.processSteps || []), { number: '', title: 'New Step', description: '', isVisible: true }] } }))} style={{ ...btnStyle, marginTop: '6px' }}>Add Step</button>
        </div>
      </div>

      <div style={{ marginBottom: '18px' }}>
        <h4 style={sectionTitleStyle}>Contact</h4>
        <div style={{ border: '1px solid rgba(212,175,55,0.12)', borderRadius: '18px', padding: '16px', background: 'rgba(255,255,255,0.02)' }}>
          <div style={{ marginTop: '12px', marginBottom: '12px' }}>
            <p style={{ ...labelStyle, color: gold, marginBottom: '10px' }}>Define your corporate signature</p>
            <div style={{ marginBottom: '8px' }}>
              <label style={labelStyle}>Heading</label>
              <input style={inputStyle} value={content.cta?.heading || ''} onChange={(e) => updateCTA('heading', e.target.value)} />
            </div>
            <div style={{ marginBottom: '8px' }}>
              <label style={labelStyle}>Description</label>
              <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} value={content.cta?.description || ''} onChange={(e) => updateCTA('description', e.target.value)} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Button Text</label>
                <input style={inputStyle} value={content.cta?.buttonText || ''} onChange={(e) => updateCTA('buttonText', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Button Link / Redirect URL</label>
                <input style={inputStyle} value={content.cta?.buttonLink || ''} onChange={(e) => updateCTA('buttonLink', e.target.value)} placeholder="/contact" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
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
