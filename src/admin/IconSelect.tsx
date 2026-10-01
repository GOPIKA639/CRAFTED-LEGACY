import React, { useEffect, useRef, useState } from 'react';
import type { IconOption } from './iconOptions';

const gold = '#D4AF37';

interface Props {
  value: string;
  options: IconOption[];
  onChange: (value: string) => void;
}

export default function IconSelect({ value, options, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((option) => option.value === value) || options[0];

  return (
    <div ref={wrapperRef} style={{ position: 'relative', marginTop: '6px' }}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          width: '100%',
          padding: '12px 16px',
          borderRadius: '12px',
          border: '1px solid rgba(212,175,55,0.28)',
          background: 'linear-gradient(135deg, #242424 0%, #1E1E1E 100%)',
          color: '#fff',
          fontSize: '0.92rem',
          boxSizing: 'border-box',
          fontFamily: '"Roboto Condensed", sans-serif',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03), 0 8px 24px rgba(0, 0, 0, 0.35)',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px',
          textAlign: 'left',
          paddingRight: '14px',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
          <span style={{ width: '32px', height: '32px', borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.2)', flexShrink: 0 }}>
            {selectedOption ? <selectedOption.icon size={16} style={{ color: gold }} /> : null}
          </span>
          <span style={{ color: '#fff', fontSize: '0.95rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {selectedOption ? selectedOption.label : 'Select icon'}
          </span>
        </span>
        <span style={{ color: gold, fontSize: '1rem', marginLeft: '8px' }}>{isOpen ? '▴' : '▾'}</span>
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            right: 0,
            zIndex: 30,
            borderRadius: '12px',
            border: '1px solid rgba(212,175,55,0.28)',
            background: 'linear-gradient(135deg, #242424 0%, #1E1E1E 100%)',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.45)',
            padding: '6px',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            maxHeight: '240px',
            overflowY: 'auto',
          }}
        >
          {options.map((option) => {
            const OptionIcon = option.icon;
            const isSelected = option.value === value;
            const isHovered = option.value === hoveredValue;
            const optionBackground = isSelected
              ? 'linear-gradient(135deg, rgba(212,175,55,0.24), rgba(246,226,122,0.12))'
              : isHovered
                ? 'rgba(255,255,255,0.06)'
                : 'transparent';

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                onMouseEnter={() => setHoveredValue(option.value)}
                onMouseLeave={() => setHoveredValue(null)}
                style={{
                  padding: '10px 12px',
                  border: isSelected ? '1px solid rgba(212,175,55,0.75)' : '1px solid transparent',
                  background: optionBackground,
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  gap: '10px',
                  fontSize: '0.9rem',
                  textAlign: 'left',
                  borderRadius: '10px',
                  transition: 'background 0.2s ease, border-color 0.2s ease',
                  cursor: 'pointer',
                }}
              >
                <span style={{ width: '28px', height: '28px', borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.2)', flexShrink: 0 }}>
                  <OptionIcon size={16} style={{ color: gold }} />
                </span>
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
