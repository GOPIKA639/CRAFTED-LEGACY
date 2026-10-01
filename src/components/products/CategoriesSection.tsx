import React, { useState, useEffect } from 'react';
import { getSiteContent, productCatalog, productCatalogGroups } from '../../admin/adminStore';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { getIconComponent } from '../../admin/iconOptions';
import { ProductGrid } from './ProductGrid';

export function CategoriesSection() {
  const [sectionHeaders, setSectionHeaders] = useState(getSiteContent().sectionHeaders);
  const [collections, setCollections] = useState(getSiteContent().collections);
  const [icons, setIcons] = useState(getSiteContent().icons);
  const [productDescriptions] = useState(getSiteContent().productDescriptions);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const CollapsedIcon = getIconComponent(icons.productCategoryCollapsedIcon, ChevronDown);
  const ExpandedIcon = getIconComponent(icons.productCategoryExpandedIcon, ChevronUp);

  const buildAdminProducts = (adminCollections: typeof collections) =>
    adminCollections
      .filter((item) => item.isVisible !== false)
      .map((item) => ({
        id: `collection-${item.id}`,
        image: item.image || '',
        imageId: item.imageId,
        title: item.title,
      }));

  const buildAllProducts = (adminCollections: typeof collections) => [
    ...buildAdminProducts(adminCollections),
    ...productCatalog.map((product) => ({ id: product.id, image: '', name: product.name })),
  ];

  const [selectedProducts, setSelectedProducts] = useState<{category: string; items: any[]; title: string} | null>(() => ({
    category: 'all',
    items: buildAllProducts(getSiteContent().collections),
    title: 'All Products',
  }));

  const categoryCounts = productCatalogGroups.reduce((acc, group) => {
    const adminCount = collections.filter((item) =>
      item.isVisible !== false &&
      item.category === group.category &&
      (item.subcategories || []).includes(group.id),
    ).length;

    acc[group.id] = group.count + adminCount;
    return acc;
  }, {} as Record<string, number>);

  const leatherProducts = productCatalogGroups
    .filter((group) => group.category === 'Leather')
    .map((group) => ({ ...group, count: categoryCounts[group.id] || group.count }));

  const nonLeatherProducts = productCatalogGroups
    .filter((group) => group.category === 'Non Leather')
    .map((group) => ({ ...group, count: categoryCounts[group.id] || group.count }));

  useEffect(() => {
    const handler = () => {
      setSectionHeaders(getSiteContent().sectionHeaders);
      setCollections(getSiteContent().collections);
      setIcons(getSiteContent().icons);
    };
    window.addEventListener('admin-content-updated', handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('admin-content-updated', handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  const handleCategoryClick = (category: string) => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
      setSelectedProducts(null);
    }
  };

  const normalizeCategory = (category: string) => category === 'NonLeather' ? 'Non Leather' : category;

  const handleSubCategoryClick = (subCategory: any, parentCategory: string) => {
    const categoryName = normalizeCategory(parentCategory);

    const adminProducts = collections
      .filter((item) => item.isVisible !== false && item.category === categoryName && (item.subcategories || []).includes(subCategory.id))
      .map((item) => ({
        id: `collection-${item.id}`,
        image: item.image || '',
        imageId: item.imageId,
        title: item.title,
      }));

    const filteredProducts = productCatalog
      .filter((product) => product.category === categoryName && product.id.startsWith(`${subCategory.id}-`))
      .map((product) => ({ id: product.id, image: '', name: product.name }));

    const items = [...adminProducts, ...filteredProducts];

    setSelectedProducts({
      category: subCategory.id,
      items: items.length > 0
        ? items
        : Array.from({ length: subCategory.count }, (_, i) => ({
            id: `${subCategory.id}-${i + 1}`,
            image: ''
          })),
      title: subCategory.name,
    });
    
    // Scroll to product grid
    setTimeout(() => {
      const productGridElement = document.getElementById('product-grid');
      if (productGridElement) {
        productGridElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleAllProductsClick = () => {
    setSelectedProducts({
      category: 'all',
      items: buildAllProducts(collections),
      title: 'All Products',
    });
    setExpandedCategory(null);
  };

  return (
    <section 
      className="py-32 px-6 relative"
      style={{
        background: 'linear-gradient(180deg, #0f0f0f 0%, #0A0A0A 100%)',
        backgroundImage: `
          repeating-linear-gradient(
            45deg,
            rgba(139, 69, 19, 0.03) 0px,
            rgba(139, 69, 19, 0.03) 2px,
            transparent 2px,
            transparent 4px
          ),
          repeating-linear-gradient(
            -45deg,
            rgba(139, 69, 19, 0.03) 0px,
            rgba(139, 69, 19, 0.03) 2px,
            transparent 2px,
            transparent 4px
          )
        `
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 
          className="text-center mb-16 text-2xl tracking-widest uppercase"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #D4AF37 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '0.3em'
          }}
        >
          {sectionHeaders.categoriesSectionTitle}
        </h2>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* All Products Card */}
          <div
            onClick={handleAllProductsClick}
            className="group cursor-pointer relative p-10 rounded-[40px] backdrop-blur-xl transition-all duration-500 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              minHeight: '200px'
            }}
          >
            <h3 
              className="text-3xl text-center mb-4"
              style={{
                fontFamily: 'Georgia, serif',
                background: 'linear-gradient(135deg, #ffffff 0%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              All Products
            </h3>
            <p className="text-center text-white/60 text-sm tracking-wide">
              View entire collection
            </p>

            {/* Hover Glow */}
            <div 
              className="absolute inset-0 rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.1) 0%, transparent 70%)'
              }}
            />
          </div>

          {/* Leather Products Card */}
          <div
            className="relative p-10 rounded-[40px] backdrop-blur-xl transition-all duration-500"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            <div 
              onClick={() => handleCategoryClick('leather')}
              className="cursor-pointer flex items-center justify-between mb-6"
            >
              <h3 
                className="text-3xl"
                style={{
                  fontFamily: 'Georgia, serif',
                  background: 'linear-gradient(135deg, #ffffff 0%, #D4AF37 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Leather Products
              </h3>
              {expandedCategory === 'leather' ? (
                <ExpandedIcon className="w-6 h-6 text-[#D4AF37]" />
              ) : (
                <CollapsedIcon className="w-6 h-6 text-[#D4AF37]" />
              )}
            </div>

            {/* Expandable List */}
            <div 
              className="overflow-hidden transition-all duration-500"
              style={{
                maxHeight: expandedCategory === 'leather' ? '600px' : '0'
              }}
            >
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
                {leatherProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSubCategoryClick(product, 'Leather')}
                    className="group cursor-pointer p-4 rounded-2xl transition-all duration-300 hover:bg-white/5"
                    style={{
                      border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 group-hover:text-[#D4AF37] transition-colors duration-300">
                        {product.name}
                      </span>
                      <span 
                        className="text-xs px-3 py-1 rounded-full"
                        style={{
                          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(246, 226, 122, 0.2) 100%)',
                          border: '1px solid rgba(212, 175, 55, 0.3)',
                          color: '#D4AF37'
                        }}
                      >
                        {product.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Non-Leather Products Card */}
          <div
            className="relative p-10 rounded-[40px] backdrop-blur-xl transition-all duration-500"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            <div 
              onClick={() => handleCategoryClick('nonleather')}
              className="cursor-pointer flex items-center justify-between mb-6"
            >
              <h3 
                className="text-3xl"
                style={{
                  fontFamily: 'Georgia, serif',
                  background: 'linear-gradient(135deg, #ffffff 0%, #D4AF37 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Non Leather Products
              </h3>
              {expandedCategory === 'nonleather' ? (
                <ChevronUp className="w-6 h-6 text-[#D4AF37]" />
              ) : (
                <ChevronDown className="w-6 h-6 text-[#D4AF37]" />
              )}
            </div>

            {/* Expandable List */}
            <div 
              className="overflow-hidden transition-all duration-500"
              style={{
                maxHeight: expandedCategory === 'nonleather' ? '400px' : '0'
              }}
            >
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
                {nonLeatherProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSubCategoryClick(product, 'NonLeather')}
                    className="group cursor-pointer p-4 rounded-2xl transition-all duration-300 hover:bg-white/5"
                    style={{
                      border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 group-hover:text-[#D4AF37] transition-colors duration-300">
                        {product.name}
                      </span>
                      <span 
                        className="text-xs px-3 py-1 rounded-full"
                        style={{
                          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(246, 226, 122, 0.2) 100%)',
                          border: '1px solid rgba(212, 175, 55, 0.3)',
                          color: '#D4AF37'
                        }}
                      >
                        {product.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {selectedProducts && (
          <div id="product-grid">
            <ProductGrid 
              products={selectedProducts.items} 
              title={selectedProducts.title}
              collections={collections}
            />
          </div>
        )}
      </div>
    </section>
  );
}
