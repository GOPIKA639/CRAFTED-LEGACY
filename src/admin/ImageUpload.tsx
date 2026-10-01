import React, { useEffect, useRef, useState } from 'react';
import { UploadCloud, Trash2 } from 'lucide-react';
import { fileToBase64 } from './adminStore';

const containerStyle: React.CSSProperties = { borderRadius: 12, overflow: 'hidden' };

interface Props {
  value?: string;
  onChange: (b64: string) => void;
  inputStyle?: React.CSSProperties;
  alt?: string;
}

export default function ImageUpload({ value, onChange, inputStyle, alt }: Props) {
  const ref = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | undefined>(value);

  useEffect(() => {
    setPreview(value || undefined);
  }, [value]);

  const handleSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const b64 = await fileToBase64(file);
      setPreview(b64);
      onChange(b64);
    }
  };

  const handleClear = () => {
    setPreview(undefined);
    onChange('');
    if (ref.current) ref.current.value = '';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button type="button" onClick={() => ref.current?.click()} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 10, background: 'linear-gradient(135deg,#242424,#1E1E1E)', border: '1px solid rgba(212,175,55,0.12)', color: '#fff' }}>
          <UploadCloud className="w-4 h-4" />
          <span style={{ fontSize: '0.9rem' }}>Choose Image</span>
        </button>
        {preview && (
          <button type="button" onClick={handleClear} title="Remove image" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 10px', borderRadius: 10, background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.12)', color: '#fca5a5' }}>
            <Trash2 />
          </button>
        )}
      </div>

      <input ref={ref} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleSelect} />

      {preview && (
        <div style={{ ...containerStyle }}>
          <img src={preview} alt={alt || 'preview'} style={{ width: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 12 }} />
        </div>
      )}
    </div>
  );
}
