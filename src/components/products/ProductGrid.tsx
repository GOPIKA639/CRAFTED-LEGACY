import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { getSiteContent } from '../../admin/adminStore';
import { getIconComponent } from '../../admin/iconOptions';
import { getFeaturedProductImage } from '../featuredProductImages';


// LEATHER PRODUCTS IMPORTS


//Signature Wallet & Belt Sets
import walletBeltSet01 from 'figma:asset/64ae54281b428c47a33b759d10a79057934fcb0f.png';
import walletBeltSet02 from 'figma:asset/7b3f40b5e4050b9f28516cc30320dd2364efa5e4.png';
import walletBeltSet03 from 'figma:asset/937c65f8c2ed9f674701455086257cf5da8b0b2d.png';

//Billfolds
import billfoldsSet01 from './Leather products/Billfolds/billfolds-1.jpg'; 
import billfoldsSet02 from './Leather products/Billfolds/billfolds-2.jpg'; 
import billfoldsSet03 from './Leather products/Billfolds/billfolds-3.jpg'; 
import billfoldsSet04 from './Leather products/Billfolds/billfolds-4.jpg'; 
import billfoldsSet05 from './Leather products/Billfolds/billfolds-5.jpg'; 
import billfoldsSet06 from './Leather products/Billfolds/billfolds-6.jpg'; 
import billfoldsSet07 from './Leather products/Billfolds/billfolds-7.jpg'; 
import billfoldsSet08 from './Leather products/Billfolds/billfolds-8.jpg'; 

//Crafted Watch Strap 
import craftwatchSet01 from './Leather products/crafted watch strap/crafted-strap-1.jpg';
import craftwatchSet02 from './Leather products/crafted watch strap/crafted-strap-2.jpg';
import craftwatchSet03 from './Leather products/crafted watch strap/crafted-strap-3.jpg';
import craftwatchSet04 from './Leather products/crafted watch strap/crafted-strap-4.jpg';

//Crossbody Slings 
import crossSlingSet01 from './Leather products/Crossbody slings/cross-s-1.jpg';
import crossSlingSet02 from './Leather products/Crossbody slings/cross-s-2.jpg';
import crossSlingSet03 from './Leather products/Crossbody slings/cross-s-3.jpg';
import crossSlingSet04 from './Leather products/Crossbody slings/cross-s-4.jpg';

//Leather Card Holder 
import leatherCard01 from './Leather products/leather card holder/leather-cd-1.jpg';
import leatherCard02 from './Leather products/leather card holder/leather-cd-2.jpg';
import leatherCard03 from './Leather products/leather card holder/leather-cd-3.jpg';
import leatherCard04 from './Leather products/leather card holder/leather-cd-4.jpg';
import leatherCard05 from './Leather products/leather card holder/leather-cd-5.jpg';

//Signature Backpack
import sigBackpack01 from './Leather products/signature backbag/1.jpg';

//Signature Belts
import sigBelt01 from './Leather products/signature belts/s-belt-1.jpg';
import sigBelt02 from './Leather products/signature belts/s-belt-2.jpg';
import sigBelt03 from './Leather products/signature belts/s-belt-3.jpg';
import sigBelt04 from './Leather products/signature belts/s-belt-4.jpg';
import sigBelt05 from './Leather products/signature belts/s-belt-5.jpg';

//Signature Women's Bag
import womensBag01 from './Leather products/Signature Womens Bag/s-woman-b-1.jpg';
import womensBag02 from './Leather products/Signature Womens Bag/s-woman-b-2.jpg';
import womensBag03 from './Leather products/Signature Womens Bag/s-woman-b-3.jpg';
import womensBag04 from './Leather products/Signature Womens Bag/s-woman-b-4.jpg';
import womensBag05 from './Leather products/Signature Womens Bag/s-woman-b-5.jpg';
import womensBag06 from './Leather products/Signature Womens Bag/s-woman-b-6.jpg';
import womensBag07 from './Leather products/Signature Womens Bag/s-woman-b-7.jpg';
import womensBag08 from './Leather products/Signature Womens Bag/s-woman-b-8.jpg';
import womensBag09 from './Leather products/Signature Womens Bag/s-woman-b-9.jpg';
import womensBag10 from './Leather products/Signature Womens Bag/s-woman-b-10.jpg';

//Travel & Passport Sleeves
import travelSleeve01 from './Leather products/Travel & Passport sleeves/t&p-s-1.jpg';
import travelSleeve02 from './Leather products/Travel & Passport sleeves/t&p-s-2.jpg';
import travelSleeve03 from './Leather products/Travel & Passport sleeves/t&p-s-3.jpg';
import travelSleeve04 from './Leather products/Travel & Passport sleeves/t&p-s-4.jpg';

//Travel Duffles & Carryalls
import duffle01 from './Leather products/Travel Duffles and Carryalls/TD&C-1.jpg';
import duffle02 from './Leather products/Travel Duffles and Carryalls/TD&C-2.jpg';
import duffle03 from './Leather products/Travel Duffles and Carryalls/TD&C-3.jpg';
import duffle04 from './Leather products/Travel Duffles and Carryalls/TD&C-4.jpg';

//Curated Gift Sets
import giftSet01 from './Leather products/curated gift sets/curated-gift-1.jpg';
import giftSet02 from './Leather products/curated gift sets/curated-gift-2.jpg';
import giftSet03 from './Leather products/curated gift sets/curated-gift-3.png';
import giftSet04 from './Leather products/curated gift sets/curated-gift-4.jpg';
import giftSet05 from './Leather products/curated gift sets/curated-gift-5.jpg';

//Executive Folios
import folio01 from './Leather products/Executive folios/EF-1.jpg';
import folio02 from './Leather products/Executive folios/EF-2.jpg';

//Key Fobs
import keyFob01 from './Leather products/key fobs/key-fobs-1.jpg';
import keyFob02 from './Leather products/key fobs/key-fobs-2.jpg';
import keyFob03 from './Leather products/key fobs/key-fobs-3.jpg';
import keyFob04 from './Leather products/key fobs/key-fobs-4.jpg';

//Executive Laptop Bag and Sleeve
import laptop01 from './Leather products/Executive laptop bags & sleeve/ELBS-1.jpg';
import laptop02 from './Leather products/Executive laptop bags & sleeve/ELBS-2.jpg';
import laptop03 from './Leather products/Executive laptop bags & sleeve/ELBS-3.jpg';
import laptop04 from './Leather products/Executive laptop bags & sleeve/ELBS-4.jpg';
import laptop05 from './Leather products/Executive laptop bags & sleeve/ELBS-5.jpg';
import laptop06 from './Leather products/Executive laptop bags & sleeve/ELBS-6.jpg';
import laptop07 from './Leather products/Executive laptop bags & sleeve/laptop bag 1.jpg';
import laptop08 from './Leather products/Executive laptop bags & sleeve/laptop bag 2.jpg';
import laptop09 from './Leather products/Executive laptop bags & sleeve/laptop bag 3.jpg';

//Womens Clutch
import womensclutch01 from './Leather products/Womens clutch/wc-1.jpg';
import womensclutch02 from './Leather products/Womens clutch/wc-2.jpg';


// 2. NON-LEATHER PRODUCTS IMPORTS

//Business & Credit Card Holders 
import businessCardHolder01 from 'figma:asset/6e72cc5be7911533e0b73918255198ff4a77772e.png';
import businessCardHolder02 from 'figma:asset/51c3d8b70a35ba6a06e33e06c1dfc38b098d54e1.png';
import businessCardHolder03 from 'figma:asset/e6bc2e37a7fcd7b3b841913fc1c5cce7461b62b2.png';

//Backpack & Travel Carriers 
import nlBackpack01 from './Non Leather products/backback & travel carriers/nl-pack-1.png';
import nlBackpack02 from './Non Leather products/backback & travel carriers/nl-pack-2.jpg';

//Hydration Bottles & Flasks 
import bottle01 from './Non Leather products/hydration bottles and flask/bottle-1.jpg';
import bottle02 from './Non Leather products/hydration bottles and flask/bottle-2.png';
import bottle03 from './Non Leather products/hydration bottles and flask/bottle-3.png';
import bottle04 from './Non Leather products/hydration bottles and flask/bottle-4.png';
import bottle05 from './Non Leather products/hydration bottles and flask/bottle-5.png';

//Journals & Pens
import journal01 from './Non Leather products/Journals/journal-1.png';
import journal02 from './Non Leather products/Journals/journal-2.jpg';
import journal03 from './Non Leather products/Journals/journal-4.jpg';
import journal04 from './Non Leather products/Journals/journal-5.png';
import journal05 from './Non Leather products/Journals/journal-6.png';

//Laptop Sleeves
import nlSleeve01 from './Non Leather products/Laptop Sleeves/sleeve-1.jpg';
import nlSleeve02 from './Non Leather products/Laptop Sleeves/sleeve-2.jpg';
import nlSleeve03 from './Non Leather products/Laptop Sleeves/sleeve-3.jpg';
import nlSleeve04 from './Non Leather products/Laptop Sleeves/sleeve-4.jpg';

// T-Shirts
import tshirt01 from './Non Leather products/TShirts/shirt-1.jpg';


interface ProductGridProps {
  products: Array<{ id: string; image: string; imageId?: string; name?: string; title?: string }>;
  title: string;
  collections?: Array<{ id: number; title: string; image: string; imageId?: string; category: string; subtitle?: string; features?: string; suitableFor?: string; isVisible?: boolean; isDraft?: boolean }>;
}

// ==========================================
// 4. PRODUCT IMAGE MAP
// ==========================================

const productImageMap = {
  // Signature Wallet & Belt Sets
  'wallet-belt-set-1': walletBeltSet01,
  'wallet-belt-set-2': walletBeltSet02,
  'wallet-belt-set-3': walletBeltSet03,
  'wallet-belt-sets-1': walletBeltSet01,
  'wallet-belt-sets-2': walletBeltSet02,
  'wallet-belt-sets-3': walletBeltSet03,
  // Backup keys
  'walletBeltSet-1': walletBeltSet01,
  'signature-wallet-belt-set-1': walletBeltSet01,

  // Billfolds
  'billfolds-1': billfoldsSet01,
  'billfolds-2': billfoldsSet02,
  'billfolds-3': billfoldsSet03,
  'billfolds-4': billfoldsSet04,
  'billfolds-5': billfoldsSet05,
  'billfolds-6': billfoldsSet06,
  'billfolds-7': billfoldsSet07,
  'billfolds-8': billfoldsSet08,
  // Backup keys
  'billfoldsSet-1': billfoldsSet01,
  'signature-billfold-1': billfoldsSet01,

  // Crafted Watch Strap 
  'watch-strap-1': craftwatchSet01,
  'watch-strap-2': craftwatchSet02,
  'watch-strap-3': craftwatchSet03,
  'watch-strap-4': craftwatchSet04,
  // Backup keys
  'crafted-strap-1': craftwatchSet01,
  'craftedwatch-1': craftwatchSet01,

  // Crossbody Slings 
  'crossbody-slings-1': crossSlingSet01,
  'crossbody-slings-2': crossSlingSet02,
  'crossbody-slings-3': crossSlingSet03,
  'crossbody-slings-4': crossSlingSet04,
  // Backup keys
  'cross-s-1': crossSlingSet01,
  'crossSling-1': crossSlingSet01,

  // Leather Card Holder
  'card-holder-1': leatherCard01,
  'card-holder-2': leatherCard02,
  'card-holder-3': leatherCard03,
  'card-holder-4': leatherCard04,
  'card-holder-5': leatherCard05,
  // Backup keys
  'leather-cd-1': leatherCard01,
  'leather-card-holder-1': leatherCard01,

  // Signature Backpack
  'signature-backpack-1': sigBackpack01,

  // Signature Belts
  'signature-belts-1': sigBelt01,
  'signature-belts-2': sigBelt02,
  'signature-belts-3': sigBelt03,
  'signature-belts-4': sigBelt04,
  'signature-belts-5': sigBelt05,

  // Womens Bag
  'signature-womens-bag-1': womensBag01,
  'womens-bag-2': womensBag02,
  'womens-bag-3': womensBag03,
  'womens-bag-4': womensBag04,
  'womens-bag-5': womensBag05,
  'womens-bag-6': womensBag06,
  'womens-bag-7': womensBag07,
  'womens-bag-8': womensBag08,
  'womens-bag-9': womensBag09,
  'womens-bag-10': womensBag10,
  // Backup keys
  'womens-bag-1': womensBag01,

  // Travel Sleeves 
  'travel-sleeves-1': travelSleeve01,
  'travel-sleeves-2': travelSleeve02,
  'travel-sleeves-3': travelSleeve03,
  'travel-sleeves-4': travelSleeve04,
  // Backup keys
  't&p-s-1': travelSleeve01,
  'travel-passport-sleeves-1': travelSleeve01,

  // Travel Duffles 
  'travel-duffles-1': duffle01,
  'travel-duffles-2': duffle02,
  'travel-duffles-3': duffle03,
  'travel-duffles-4': duffle04,
  // Backup keys
  'TD&C-1': duffle01,
  'travel-duffles-carryalls-1': duffle01,

  // Gift Sets 
  'gift-sets-1': giftSet01,
  'gift-sets-2': giftSet02,
  'gift-sets-3': giftSet03,
  'gift-sets-4': giftSet04,
  'gift-sets-5': giftSet05,
  // Backup keys
  'curated-gift-1': giftSet01,
  'curated-gift-sets-1': giftSet01,

  // Executive Folios 
  'executive-folios-1': folio01,
  'executive-folios-2': folio02,
  // Backup keys
  'EF-1': folio01,
  'executive-folio-1': folio01,

  // Key Fobs
  'key-fobs-1': keyFob01,
  'key-fobs-2': keyFob02,
  'key-fobs-3': keyFob03,
  'key-fobs-4': keyFob04,

  // Laptop Bags 
  'laptop-bags-1': laptop01,
  'laptop-bags-2': laptop02,
  'laptop-bags-3': laptop03,
  'laptop-bags-4': laptop04,
  'laptop-bags-5': laptop05,
  'laptop-bags-6': laptop06,
  'laptop-bags-7': laptop07, // Maps to "laptop bag 1.jpg"
  'laptop-bags-8': laptop08, // Maps to "laptop bag 2.jpg"
  'laptop-bags-9': laptop09, // Maps to "laptop bag 3.jpg"
  // Backup keys
  'ELBS-1': laptop01,
  'executive-laptop-bags-sleeves-1': laptop01,

  // Womens Clutch
  'womens-clutch-1': womensclutch01,
  'womens-clutch-2': womensclutch02,
  // Backup keys
  'wc-1': womensclutch01,

  // --- Non-Leather ---
  'business-card-holders-1': businessCardHolder01,
  'business-card-holders-2': businessCardHolder02,
  'business-card-holders-3': businessCardHolder03,

  // Backpack & Travel 
  'backpack-carriers-1': nlBackpack01,
  'backpack-carriers-2': nlBackpack02,
  // Backup keys
  'nl-pack-1': nlBackpack01,
  'backpack-travel-carriers-1': nlBackpack01,

  // Hydration
  'hydration-1': bottle01,
  'hydration-2': bottle02,
  'hydration-3': bottle03,
  'hydration-4': bottle04,
  'hydration-5': bottle05,
  // Backup keys
  'bottle-1': bottle01,
  'hydration-bottles-flasks-1': bottle01,

  // Journals 
  'journals-1': journal01,
  'journals-2': journal02,
  'journals-3': journal03,
  'journals-4': journal04,
  'journals-5': journal05,
  // Backup keys
  'journals-pens-1': journal01,
  'journals-pens-2': journal02,
  'journals-pens-3': journal03,
  'journals-pens-4': journal04,
  'journals-pens-5': journal05,

  // Laptop Sleeves 
  'laptop-sleeves-1': nlSleeve01,
  'laptop-sleeves-2': nlSleeve02,
  'laptop-sleeves-3': nlSleeve03,
  'laptop-sleeves-4': nlSleeve04,
  // Backup keys
  'sleeve-1': nlSleeve01,

  // T-Shirts
  't-shirts-1': tshirt01,
  'shirt-1': tshirt01,

};

// ==========================================
// 5. PRODUCT GRID COMPONENT
// ==========================================

export function ProductGrid({ products, title, collections = [] }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<ProductGridProps['products'][number] | null>(null);
  const [icons, setIcons] = useState(getSiteContent().icons);
  const CloseIcon = getIconComponent(icons.productModalCloseIcon, X);

  useEffect(() => {
    const handler = () => setIcons(getSiteContent().icons);
    window.addEventListener('admin-content-updated', handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('admin-content-updated', handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  return (
    <>
      <div className="mb-12">
        <h3 
          className="text-4xl text-center mb-12"
          style={{
            fontFamily: 'Georgia, serif',
            background: 'linear-gradient(135deg, #ffffff 0%, #D4AF37 50%, #F6E27A 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          {title}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const actualImage = product.id.startsWith('collection-')
              ? getFeaturedProductImage(product)
              : product.image || productImageMap[product.id];
            const productTitle = product.title || product.name || product.id;
            
            return (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="group cursor-pointer relative rounded-[35px] overflow-hidden backdrop-blur-xl transition-all duration-500 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                  aspectRatio: '4/3'
                }}
              >
                {actualImage ? (
                  <img 
                    src={actualImage} 
                    alt={productTitle}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#0A0A0A] flex items-center justify-center">
                    <div className="text-center text-white/30 p-8">
                      <p className="text-sm tracking-wider">Image Not Found</p>
                      <p className="text-xs mt-2 break-all opacity-50">ID: {product.id}</p>
                    </div>
                  </div>
                )}

                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.15) 0%, transparent 70%)'
                  }}
                />
                <div className="absolute left-0 bottom-0 w-full p-4 bg-black/25 text-white text-sm backdrop-blur-sm">
                  {productTitle}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {selectedProduct && (() => {
        const actualImage = selectedProduct.id.startsWith('collection-')
          ? getFeaturedProductImage(selectedProduct)
          : selectedProduct.image || productImageMap[selectedProduct.id];

        return (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-xl animate-fadeIn overflow-y-auto"
            style={{ background: 'rgba(0, 0, 0, 0.85)' }}
            onClick={() => setSelectedProduct(null)}
          >
            <div
              className="relative w-full max-w-4xl overflow-hidden animate-scaleIn my-8"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
                borderRadius: '50px'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 z-10 p-3 rounded-full backdrop-blur-xl transition-all duration-300 hover:scale-110"
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)'
                }}
              >
                <CloseIcon className="w-6 h-6 text-white" />
              </button>

              <div className="p-2 flex items-center justify-center">
                {actualImage ? (
                  <img 
                    src={actualImage} 
                    alt={`Product ${selectedProduct.id}`}
                    className="w-full h-full object-contain"
                    style={{ background: '#000', maxHeight: '75vh', borderRadius: '45px' }}
                  />
                ) : (
                  <div className="w-full aspect-[4/3] bg-gradient-to-br from-[#1a1a1a] to-[#0A0A0A] flex items-center justify-center rounded-md">
                    <div className="text-center text-white/40 p-8">
                      <p className="text-lg tracking-wider mb-2">Image Not Found</p>
                      <p className="text-sm break-all opacity-50">ID: {selectedProduct.id}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.9);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
