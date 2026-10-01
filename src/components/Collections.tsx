import React, { useState, useEffect } from 'react';
import { ShoppingBag, X } from 'lucide-react';
import { getSiteContent } from '../admin/adminStore';
import { getFeaturedProductImage } from './featuredProductImages';
import { getIconComponent } from '../admin/iconOptions';

export function Collections() {
  const [collections, setCollections] = useState(getSiteContent().collections.filter((item) => item.isFeaturedCollection !== false));
  const [sectionHeaders, setSectionHeaders] = useState(getSiteContent().sectionHeaders);
  const [icons, setIcons] = useState(getSiteContent().icons);
  const [selectedProduct, setSelectedProduct] = useState<typeof collections[0] | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  useEffect(() => {
    const handler = () => {
      setCollections(getSiteContent().collections.filter((item) => item.isFeaturedCollection !== false));
      setSectionHeaders(getSiteContent().sectionHeaders);
      setIcons(getSiteContent().icons);
    };
    window.addEventListener('admin-content-updated', handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('admin-content-updated', handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => new Set(prev).add(id));
  };

  const getImage = (item: typeof collections[0]) => getFeaturedProductImage(item);
  const PlaceholderIcon = getIconComponent(icons.collectionPlaceholderIcon, ShoppingBag);
  const CloseIcon = getIconComponent(icons.collectionCloseIcon, X);

  return (
    <section
      id="products"
      className="py-32 px-6 relative"
      style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #121212 100%)' }}
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-5xl md:text-7xl text-center mb-24"
          style={{
            fontFamily: 'var(--font-libre)',
            background: 'linear-gradient(135deg, #D4AF37 0%, #F6E27A 50%, #D4AF37 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            filter: 'drop-shadow(0 2px 8px rgba(212, 175, 55, 0.3))'
          }}
        >{sectionHeaders.collectionsTitle}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
          {collections.map((product, index) => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="group cursor-pointer relative rounded-[36px] overflow-hidden backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 focus:outline-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                outline: 'none'
              }}
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-[#1a1a1a] to-[#0A0A0A] flex items-center justify-center border-b border-white/10 relative overflow-hidden">
                <img
                  src={getImage(product)}
                  alt={product.title}
                  onLoad={() => handleImageLoad(product.id)}
                  onError={() => {}}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    loadedImages.has(product.id) ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ filter: 'brightness(0.9)' }}
                />
                {!loadedImages.has(product.id) && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white/20 p-8">
                      <PlaceholderIcon className="w-16 h-16 mx-auto mb-4 opacity-30" />
                      <p className="text-sm tracking-wider" style={{ fontFamily: 'var(--font-roboto)' }}>Product Image</p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="p-8">
                <h3 className="text-center tracking-wide text-lg" style={{
                  fontFamily: 'var(--font-libre)',
                  background: 'linear-gradient(135deg, #ffffff 0%, #D4AF37 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
                }}>{product.title}</h3>
                {/* Description intentionally hidden in card view per restoration request */}
              </div>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[36px]"
                style={{ background: 'radial-gradient(circle at center, rgba(212,175,55,0.15) 0%, transparent 70%)', boxShadow: '0 0 40px rgba(212,175,55,0.3)' }}
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <button onClick={() => window.location.href = '#products'}
            className="group relative px-16 py-6 rounded-full overflow-hidden transition-all duration-500 hover:scale-105 focus:outline-none"
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #F6E27A 100%)',
              boxShadow: '0 12px 45px rgba(212,175,55,0.5), inset 0 1px 0 rgba(255,255,255,0.3)',
              fontFamily: 'var(--font-caveat)', fontSize: '1.3rem', outline: 'none'
            }}>
            <span className="relative z-10 text-black tracking-wider">{sectionHeaders.collectionsButtonText}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#F6E27A] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ boxShadow: '0 0 50px rgba(246,226,122,0.8)' }} />
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-xl"
          style={{ background: 'rgba(0,0,0,0.8)' }} onClick={() => setSelectedProduct(null)}>
          <div className="relative max-w-4xl w-full rounded-[40px] overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)'
            }} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedProduct(null)}
              className="absolute top-6 right-6 z-10 p-3 rounded-full backdrop-blur-xl transition-all duration-300 hover:scale-110"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <CloseIcon className="w-6 h-6 text-white" />
            </button>
            <div className="aspect-[16/10] bg-gradient-to-br from-[#1a1a1a] to-[#0A0A0A] flex items-center justify-center overflow-hidden">
              <img src={getImage(selectedProduct)} alt={selectedProduct.title}
                className="w-full h-full object-contain" style={{ maxHeight: '80vh' }} />
            </div>
            <div className="p-8">
              <h3
                className="text-2xl mb-3"
                style={{
                  fontFamily: 'var(--font-libre)',
                  background: 'linear-gradient(135deg, #ffffff 0%, #D4AF37 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {selectedProduct.title}
              </h3>
              {selectedProduct.description && (
                <p className="text-white/70 leading-relaxed" style={{ fontFamily: 'var(--font-roboto)' }}>
                  {selectedProduct.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
