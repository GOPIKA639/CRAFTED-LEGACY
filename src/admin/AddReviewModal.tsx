import React, { useState } from 'react';
import ImageUpload from './ImageUpload';

interface Props {
  visible: boolean;
  onClose: () => void;
  onAdd: (item: { name: string; company?: string; review: string; rating: number; image?: string }) => void;
}

export default function AddReviewModal({ visible, onClose, onAdd }: Props) {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  if (!visible) return null;

  const submit = async () => {
    if (!name.trim() || !review.trim()) {
      alert('Please provide at least a name and review text.');
      return;
    }
    try {
      setLoading(true);
      onAdd({ name: name.trim(), company: company.trim(), review: review.trim(), rating: Math.max(1, Math.min(5, Number(rating) || 5)), image });
      alert('Review added');
      // reset
      setName(''); setCompany(''); setReview(''); setRating(5); setImage('');
      onClose();
    } catch (e) {
      console.error('Add review failed', e);
      alert('Failed to add review. See console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
      <div style={{ width: '720px', maxWidth: '92%', background: '#0b0b0b', border: '1px solid rgba(212,175,55,0.14)', borderRadius: '12px', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ margin: 0, fontFamily: "'Libre Baskerville', serif", background: 'linear-gradient(135deg, #fff 0%, #D4AF37 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Add Review</h3>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>Close</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: '12px' }}>
          <div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', background: '#0b0b0b', color: '#fff' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>Company / Designation</label>
              <input value={company} onChange={(e) => setCompany(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', background: '#0b0b0b', color: '#fff' }} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>Review</label>
              <textarea value={review} onChange={(e) => setReview(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', background: '#0b0b0b', color: '#fff', minHeight: '100px' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>Rating (1-5)</label>
              <input type="number" min={1} max={5} value={rating} onChange={(e) => setRating(parseInt(e.target.value || '5'))} style={{ width: '120px', padding: '8px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', background: '#0b0b0b', color: '#fff' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>Profile Image</label>
            <ImageUpload value={image} onChange={(b64) => setImage(b64)} />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
          <button onClick={onClose} style={{ padding: '8px 14px', background: 'transparent', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)', borderRadius: '8px' }}>Cancel</button>
          <button onClick={submit} disabled={loading} style={{ padding: '8px 16px', background: 'linear-gradient(135deg, #D4AF37 0%, #F6E27A 100%)', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>{loading ? 'Adding...' : 'Add Review'}</button>
        </div>
      </div>
    </div>
  );
}
