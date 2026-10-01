import React, { useEffect, useState } from 'react';
import { ContactEnquiry, deleteEnquiry, getEnquiries, SiteContent } from '../adminStore';
import IconSelect from '../IconSelect';
import {
  MapPin,
  Phone,
  Mail,
  Clock3,
  Building2,
  Landmark,
  Navigation,
  Smartphone,
  AtSign,
  CalendarDays,
  BriefcaseBusiness,
  type LucideIcon,
} from 'lucide-react';

const gold = '#D4AF37';

const cardStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
  border: '1px solid rgba(212,175,55,0.15)',
  borderRadius: '24px',
  padding: '28px',
  marginBottom: '24px',
};
const sectionTitleStyle: React.CSSProperties = {
  fontFamily: "'Libre Baskerville', serif",
  fontSize: '1.05rem',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: gold,
  marginBottom: '12px',
  marginTop: '4px',
};
const infoCardStyle: React.CSSProperties = {
  ...cardStyle,
  padding: '20px',
  marginBottom: '0',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
};
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: '12px',
  border: '1px solid rgba(212,175,55,0.28)',
  background: 'linear-gradient(135deg, #242424 0%, #1E1E1E 100%)',
  color: '#fff',
  fontSize: '0.92rem',
  boxSizing: 'border-box',
  marginTop: '6px',
  fontFamily: '"Roboto Condensed", sans-serif',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03), 0 8px 24px rgba(0, 0, 0, 0.35)',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
};
const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.75rem',
  color: 'rgba(255,255,255,0.5)',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  marginBottom: '4px',
};
const btnStyle: React.CSSProperties = {
  padding: '10px 24px',
  borderRadius: '12px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '0.9rem',
  fontWeight: 600,
  transition: 'all 0.3s',
};

const addressIconOptions: Array<{ value: string; label: string; icon: LucideIcon }> = [
  { value: 'map-pin', label: 'Map Pin', icon: MapPin },
  { value: 'landmark', label: 'Landmark', icon: Landmark },
  { value: 'navigation', label: 'Navigation', icon: Navigation },
  { value: 'building', label: 'Building', icon: Building2 },
];

const phoneIconOptions: Array<{ value: string; label: string; icon: LucideIcon }> = [
  { value: 'phone', label: 'Phone', icon: Phone },
  { value: 'smartphone', label: 'Smartphone', icon: Smartphone },
  { value: 'building', label: 'Corporate', icon: Building2 },
];

const emailIconOptions: Array<{ value: string; label: string; icon: LucideIcon }> = [
  { value: 'mail', label: 'Mail', icon: Mail },
  { value: 'at-sign', label: 'At Sign', icon: AtSign },
  { value: 'building', label: 'Corporate', icon: Building2 },
];

const businessHoursIconOptions: Array<{ value: string; label: string; icon: LucideIcon }> = [
  { value: 'clock', label: 'Clock', icon: Clock3 },
  { value: 'calendar', label: 'Calendar', icon: CalendarDays },
  { value: 'briefcase', label: 'Office', icon: BriefcaseBusiness },
];

const contactIconMap: Record<string, LucideIcon> = {
  'map-pin': MapPin,
  landmark: Landmark,
  navigation: Navigation,
  building: Building2,
  phone: Phone,
  smartphone: Smartphone,
  mail: Mail,
  'at-sign': AtSign,
  clock: Clock3,
  calendar: CalendarDays,
  briefcase: BriefcaseBusiness,
};

interface Props {
  content: SiteContent;
  setContent: React.Dispatch<React.SetStateAction<SiteContent>>;
  onSave: () => void;
  onReset: () => void;
  saved: boolean;
}

export default function ContactPanel({ content, setContent, onSave, onReset, saved }: Props) {
  const [section, setSection] = useState<'details' | 'enquiries'>('details');
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>(getEnquiries());

  useEffect(() => {
    const refresh = () => setEnquiries(getEnquiries());
    window.addEventListener('admin-enquiries-updated', refresh);
    return () => window.removeEventListener('admin-enquiries-updated', refresh);
  }, []);

  const update = (field: string, value: string) =>
    setContent((p) => ({ ...p, contact: { ...p.contact, [field]: value } }));

  const updateContactInfo = (field: keyof SiteContent['contact']['contactInfo'], value: string | string[]) =>
    setContent((p) => {
      const nextContactInfo = {
        ...p.contact.contactInfo,
        [field]: value,
      };

      const normalizedPhone = Array.isArray(nextContactInfo.phones)
        ? nextContactInfo.phones.join(' • ')
        : (p.contact.phone || '');

      return {
        ...p,
        contact: {
          ...p.contact,
          address: field === 'address' ? String(value) : p.contact.address,
          phone: field === 'phones' ? normalizedPhone : p.contact.phone,
          email: field === 'email' ? String(value) : p.contact.email,
          contactInfo: nextContactInfo,
        }
      };
    });

  const updateContactIcon = (field: 'address' | 'phone' | 'email' | 'businessHours', value: string) =>
    setContent((p) => ({
      ...p,
      contact: {
        ...p.contact,
        contactInfo: {
          ...p.contact.contactInfo,
          icons: {
            ...p.contact.contactInfo.icons,
            [field]: value,
          },
        }
      }
    }));

  const updateSectionHeader = (field: string, value: string) =>
    setContent((p) => ({ ...p, sectionHeaders: { ...p.sectionHeaders, [field]: value } }));

  const removeEnquiry = (id: string) => {
    if (confirm('Delete this enquiry?')) {
      deleteEnquiry(id);
      setEnquiries(getEnquiries());
    }
  };

  const formatDate = (value: string) =>
    new Intl.DateTimeFormat('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(value));

  const tabStyle = (active: boolean): React.CSSProperties => ({
    ...btnStyle,
    background: active ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.04)',
    color: active ? gold : 'rgba(255,255,255,0.65)',
    border: active ? '1px solid rgba(212,175,55,0.35)' : '1px solid rgba(255,255,255,0.08)',
  });

  return (
    <div>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <button onClick={() => setSection('details')} style={tabStyle(section === 'details')}>
          Contact Details
        </button>
        <button onClick={() => setSection('enquiries')} style={tabStyle(section === 'enquiries')}>
          Enquiries ({enquiries.length})
        </button>
      </div>

      {section === 'details' && (
        <>
          <div style={{ border: '1px solid rgba(212,175,55,0.18)', borderRadius: '18px', padding: '20px', background: 'rgba(255,255,255,0.03)', marginBottom: '24px' }}>
            <h3
              style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: '1.3rem',
                background: `linear-gradient(135deg, #fff 0%, ${gold} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                margin: '0 0 8px 0',
              }}
            >
              Contact
            </h3>
            <p style={{ margin: '0 0 20px', color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem' }}>Manage the contact page title, description, contact information, and map embed.</p>

            <div style={{ marginBottom: '18px' }}>
              <label style={labelStyle}>Contact Title</label>
              <input style={inputStyle} value={content.contact.headerTitle || ''} onChange={(e) => update('headerTitle', e.target.value)} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Contact Description</label>
              <textarea style={{ ...inputStyle, minHeight: '92px', resize: 'vertical' }} value={content.contact.headerDescription || ''} onChange={(e) => update('headerDescription', e.target.value)} />
            </div>

            <h4 style={sectionTitleStyle}>Contact Information</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '20px' }}>
              {[
                {
                  key: 'address',
                  label: 'Address',
                  value: content.contact.contactInfo.address,
                  icon: content.contact.contactInfo.icons?.address || 'map-pin',
                  multiline: true,
                  options: addressIconOptions,
                },
                {
                  key: 'phone',
                  label: 'Phone Numbers',
                  value: (content.contact.contactInfo.phones || []).join('\n'),
                  icon: content.contact.contactInfo.icons?.phone || 'phone',
                  multiline: true,
                  options: phoneIconOptions,
                },
                {
                  key: 'email',
                  label: 'Email',
                  value: content.contact.contactInfo.email,
                  icon: content.contact.contactInfo.icons?.email || 'mail',
                  multiline: false,
                  options: emailIconOptions,
                },
                {
                  key: 'businessHours',
                  label: 'Business Hours',
                  value: (content.contact.contactInfo.businessHours || []).join('\n'),
                  icon: content.contact.contactInfo.icons?.businessHours || 'clock',
                  multiline: true,
                  options: businessHoursIconOptions,
                },
              ].map((item) => {
                const Icon = contactIconMap[item.icon] || MapPin;

                return (
                  <div key={item.key} style={infoCardStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                      <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.2)' }}>
                        <Icon style={{ color: gold }} size={16} />
                      </div>
                      <span style={{ ...labelStyle, margin: 0 }}>{item.label}</span>
                    </div>

                    {item.multiline ? (
                      <textarea
                        style={{ ...inputStyle, minHeight: '112px', resize: 'vertical' }}
                        value={item.value}
                        onChange={(e) => {
                          const nextValue = e.target.value;
                          if (item.key === 'phone') {
                            updateContactInfo('phones', nextValue.split('\n').map((line) => line.trim()).filter(Boolean));
                          } else if (item.key === 'businessHours') {
                            updateContactInfo('businessHours', nextValue.split('\n').map((line) => line.trim()).filter(Boolean));
                          } else {
                            updateContactInfo('address', nextValue);
                          }
                        }}
                      />
                    ) : (
                      <input
                        style={inputStyle}
                        value={item.value}
                        onChange={(e) => updateContactInfo('email', e.target.value)}
                      />
                    )}

                    <div style={{ marginTop: '12px' }}>
                      <label style={{ ...labelStyle, marginBottom: '8px' }}>Icon</label>
                      <IconSelect value={item.icon} options={item.options || []} onChange={(value) => updateContactIcon(item.key as 'address' | 'phone' | 'email' | 'businessHours', value)} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ border: '1px solid rgba(212,175,55,0.16)', borderRadius: '18px', padding: '16px', background: 'rgba(255,255,255,0.04)', marginBottom: '18px' }}>
              <h4 style={sectionTitleStyle}>Map</h4>
              <label style={labelStyle}>Map Embed URL</label>
              <input
                style={inputStyle}
                value={content.contact.mapEmbedUrl}
                onChange={(e) => update('mapEmbedUrl', e.target.value)}
                placeholder="https://www.google.com/maps/embed?..."
              />
            </div>

            <div style={{ border: '1px solid rgba(212,175,55,0.16)', borderRadius: '18px', padding: '16px', background: 'rgba(255,255,255,0.04)' }}>
              <h4 style={sectionTitleStyle}>Corporate Inquiries</h4>
              <div style={{ marginBottom: '8px' }}>
                <label style={labelStyle}>Title</label>
                <input style={inputStyle} value={content.contact.corporateInquiries?.title || ''} onChange={(e) => setContent((p) => ({ ...p, contact: { ...p.contact, corporateInquiries: { ...p.contact.corporateInquiries, title: e.target.value } } }))} />
              </div>
              <div style={{ marginBottom: '8px' }}>
                <label style={labelStyle}>Description</label>
                <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} value={content.contact.corporateInquiries?.description || ''} onChange={(e) => setContent((p) => ({ ...p, contact: { ...p.contact, corporateInquiries: { ...p.contact.corporateInquiries, description: e.target.value } } }))} />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input style={inputStyle} value={content.contact.corporateInquiries?.email || ''} onChange={(e) => setContent((p) => ({ ...p, contact: { ...p.contact, corporateInquiries: { ...p.contact.corporateInquiries, email: e.target.value } } }))} />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
            <button
              onClick={onSave}
              style={{
                ...btnStyle,
                flex: 1,
                background: `linear-gradient(135deg, ${gold} 0%, #F6E27A 100%)`,
                color: '#000',
              }}
            >
              {saved ? '✓ Saved!' : 'Save'}
            </button>
            <button
              onClick={onReset}
              style={{
                ...btnStyle,
                flex: 1,
                background: 'rgba(255,255,255,0.05)',
                color: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              Restore to Default
            </button>
          </div>
        </>
      )}

      {section === 'enquiries' && (
        <div>
          {enquiries.length === 0 && (
            <div style={{ ...cardStyle, textAlign: 'center', padding: '48px 28px' }}>
              <p style={{ color: 'rgba(255,255,255,0.55)', margin: 0 }}>No enquiries submitted yet.</p>
            </div>
          )}

          {enquiries.map((enquiry) => (
            <div key={enquiry.id} style={cardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', alignItems: 'flex-start', marginBottom: '18px' }}>
                <div>
                  <h3
                    style={{
                      fontFamily: "'Libre Baskerville', serif",
                      fontSize: '1.15rem',
                      color: '#fff',
                      margin: '0 0 8px',
                    }}
                  >
                    {enquiry.name}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem', margin: 0 }}>
                    {formatDate(enquiry.createdAt)}
                  </p>
                </div>
                <button
                  onClick={() => removeEnquiry(enquiry.id)}
                  style={{
                    ...btnStyle,
                    padding: '8px 14px',
                    background: 'rgba(220,38,38,0.12)',
                    color: '#fca5a5',
                    border: '1px solid rgba(220,38,38,0.25)',
                    fontSize: '0.8rem',
                  }}
                >
                  Delete
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '18px' }}>
                <div>
                  <p style={labelStyle}>Email</p>
                  <p style={{ color: 'rgba(255,255,255,0.85)', margin: 0 }}>{enquiry.email}</p>
                </div>
                <div>
                  <p style={labelStyle}>Phone Number</p>
                  <p style={{ color: 'rgba(255,255,255,0.85)', margin: 0 }}>{enquiry.phone}</p>
                </div>
              </div>

              <div>
                <p style={labelStyle}>Message</p>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.78)',
                    lineHeight: 1.7,
                    margin: 0,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {enquiry.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
