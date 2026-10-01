import React, { useState } from 'react';
import { SiteContent, fileToBase64, OrderItem, getOrders, addOrder, deleteOrder, productCatalog, productCatalogGroups } from '../adminStore';
import ImageUpload from '../ImageUpload';
import { Trash2 } from 'lucide-react';

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
const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: 'none',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  cursor: 'pointer',
  backgroundImage: 'linear-gradient(45deg, transparent 50%, #D4AF37 50%), linear-gradient(135deg, #D4AF37 50%, transparent 50%)',
  backgroundPosition: 'calc(100% - 18px) calc(50% - 3px), calc(100% - 12px) calc(50% - 3px)',
  backgroundSize: '6px 6px, 6px 6px',
  backgroundRepeat: 'no-repeat',
  paddingRight: '38px',
  backgroundColor: '#242424',
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

export default function ProductsPanel({ content, setContent, onSave, onReset, saved }: Props) {
  const [orders, setOrders] = useState<OrderItem[]>(getOrders());
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ customerName: '', customerEmail: '', customerPhone: '', productName: '', productColor: '' });
  const [descriptionFilter, setDescriptionFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Leather' | 'Non Leather'>('All');
  const [draftError, setDraftError] = useState('');

  const refreshOrders = () => setOrders(getOrders());

  const handleAddOrder = () => {
    if (!form.productName || !form.customerEmail) return;
    addOrder({
      customerEmail: form.customerEmail,
      customerPhone: form.customerPhone,
      customerAddress: '', // not requested in orders specific
      productName: form.productName,
      productColor: form.productColor,
      productImage: '',
      status: 'pending'
    });
    setForm({ customerName: '', customerEmail: '', customerPhone: '', productName: '', productColor: '' });
    setShowForm(false);
    refreshOrders();
  };

  const handleDeleteOrder = (id: string) => {
    if (confirm('Delete this entry?')) { deleteOrder(id); refreshOrders(); }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, setter: (b64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) { const b64 = await fileToBase64(file); setter(b64); }
  };

  const updateCollection = (i: number, field: string, value: string | number | string[]) =>
    setContent((p) => {
      const arr = [...p.collections];
      if (field === 'subcategories' && typeof value === 'string') {
        arr[i] = { ...arr[i], [field]: JSON.parse(value) };
      } else {
        arr[i] = { ...arr[i], [field]: value };
      }
      return { ...p, collections: arr };
    });

  const updateProductDescription = (id: string, value: string) =>
    setContent((p) => ({
      ...p,
      productDescriptions: { ...p.productDescriptions, [id]: value },
    }));

  const createDraftProduct = () => ({
    id: Date.now(),
    title: '',
    description: '',
    image: '',
    category: 'Leather' as const,
    subcategories: [] as string[],
    specifications: '',
    usageCareInstructions: '',
    isDraft: true,
    isFeaturedCollection: false,
  });

  const addProduct = () => {
    setDraftError('');
    setContent((p) => ({
      ...p,
      collections: [createDraftProduct(), ...p.collections],
    }));
  };

  const saveDraftProduct = (i: number) => {
    const item = content.collections[i];

    if (!item.title.trim()) {
      setDraftError('Product name is required.');
      return;
    }

    if (!item.category) {
      setDraftError('Please select a category.');
      return;
    }

    if (!item.image?.trim()) {
      setDraftError('Please paste an image URL or upload an image.');
      return;
    }

    setDraftError('');
    setContent((p) => {
      const next = [...p.collections];
      next[i] = { ...next[i], isDraft: false };
      return { ...p, collections: next };
    });
  };

  const cancelDraftProduct = (i: number) => {
    setDraftError('');
    setContent((p) => ({ ...p, collections: p.collections.filter((_, idx) => idx !== i) }));
  };

  const removeProduct = (i: number) =>
    setContent((p) => ({ ...p, collections: p.collections.filter((_, idx) => idx !== i) }));

  const filteredCatalog = productCatalog.filter((product) => {
    const query = descriptionFilter.trim().toLowerCase();
    const matchesQuery = !query || product.name.toLowerCase().includes(query) || product.id.toLowerCase().includes(query) || product.category.toLowerCase().includes(query);
    const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
    return matchesQuery && matchesCategory;
  });

  const draftCollectionItems = content.collections
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => item.isDraft);

  const hasActiveSearch = descriptionFilter.trim().length > 0;

  return (
    <div>
      {/* Product Collections */}
      <div style={{ ...cardStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <div>
          <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1.3rem',
            background: `linear-gradient(135deg, #fff 0%, ${gold} 100%)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', margin: 0
          }}>Product</h3>
          <p style={{ margin: '8px 0 0', color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem' }}>Organize product details with clean sections for Basic Information, Media, Descriptions, Features, and Visibility.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <input
            style={{ ...inputStyle, maxWidth: '260px', marginTop: 0 }}
            value={descriptionFilter}
            onChange={(e) => setDescriptionFilter(e.target.value)}
            placeholder="Search products"
          />
          <select className="admin-select" style={{ ...selectStyle, maxWidth: '180px', marginTop: 0 }} value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value as 'All' | 'Leather' | 'Non Leather')}>
            <option value="All">All Categories</option>
            <option value="Leather">Leather</option>
            <option value="Non Leather">Non Leather</option>
          </select>
          <button onClick={addProduct} style={{ ...btnStyle, background: `linear-gradient(135deg, ${gold} 0%, #F6E27A 100%)`, color: '#000' }}>
            + Add New Product
          </button>
        </div>
      </div>
      
      {hasActiveSearch && (
        <div style={{ marginBottom: '14px', padding: '10px 12px', borderRadius: '12px', border: '1px solid rgba(212,175,55,0.18)', background: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.78)' }}>
          Showing {filteredCatalog.length} matching product{filteredCatalog.length === 1 ? '' : 's'} from the full catalog.
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {hasActiveSearch ? (
          filteredCatalog.map((product) => {
            const matchingItem = content.collections.find((item) => item.title.toLowerCase() === product.name.toLowerCase());

            return (
              <div key={product.id} style={{ ...cardStyle, marginBottom: 0, position: 'relative' }}>
                <p style={{ ...labelStyle, color: gold, marginBottom: '8px' }}>Catalog Match</p>
                <div style={{ display: 'grid', gap: '12px' }}>
                  <div>
                    <label style={labelStyle}>Product Name</label>
                    <input style={inputStyle} value={product.name} readOnly />
                  </div>
                  <div>
                    <label style={labelStyle}>Category</label>
                    <input style={inputStyle} value={product.category} readOnly />
                  </div>
                  <div>
                    <label style={labelStyle}>Image</label>
                    <div style={{ border: '1px solid rgba(212,175,55,0.18)', borderRadius: '14px', padding: '12px', background: 'rgba(255,255,255,0.03)' }}>
                      {matchingItem?.image ? (
                        <img src={matchingItem.image} alt={product.name} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '10px', marginBottom: '10px' }} />
                      ) : (
                        <p style={{ margin: 0, color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem' }}>No image saved yet for this product.</p>
                      )}
                      <ImageUpload value={matchingItem?.image || ''} onChange={(b64) => {
                        const existingIndex = content.collections.findIndex((item) => item.title.toLowerCase() === product.name.toLowerCase());
                        if (existingIndex >= 0) {
                          updateCollection(existingIndex, 'image', b64);
                        } else {
                          setContent((p) => ({
                            ...p,
                            collections: [{
                              id: Date.now(),
                              title: product.name,
                              description: p.productDescriptions?.[product.id] || '',
                              image: b64,
                              category: product.category,
                              subcategories: [],
                              specifications: '',
                              usageCareInstructions: '',
                              isDraft: false,
                              isFeaturedCollection: false,
                              isVisible: true,
                            }, ...p.collections],
                          }));
                        }
                      }} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : draftCollectionItems.length > 0 ? (
          draftCollectionItems.map(({ item, index }) => (
            <div key={item.id ?? `draft-${index}`} style={{ ...cardStyle, marginBottom: 0, position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <p style={{ ...labelStyle, color: gold, marginBottom: '6px' }}>New Product</p>
                  <h4 style={{ margin: '0 0 4px', color: '#fff', fontSize: '1.05rem' }}>Create a new collection item</h4>
                  <p style={{ margin: 0, color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem' }}>Fill out the details below and save it to the top of the list.</p>
                </div>
                <button onClick={() => cancelDraftProduct(index)} style={{ ...btnStyle, padding: '8px 12px', background: 'rgba(220,38,38,0.12)', color: '#fca5a5', border: '1px solid rgba(220,38,38,0.2)', fontSize: '0.75rem' }}>Cancel</button>
              </div>

              <div style={{ display: 'grid', gap: '12px' }}>
                <div style={{ border: '1px solid rgba(212,175,55,0.18)', borderRadius: '18px', padding: '12px', background: 'rgba(255,255,255,0.03)' }}>
                  <p style={{ ...labelStyle, color: gold, marginBottom: '8px' }}>Basic Information</p>
                  <label style={labelStyle}>Product Name *</label>
                  <input style={inputStyle} value={item.title} onChange={(e) => updateCollection(index, 'title', e.target.value)} placeholder="Enter product name" />
                  <label style={labelStyle}>Category *</label>
                  <select className="admin-select" style={selectStyle} value={item.category || 'Leather'} onChange={(e) => updateCollection(index, 'category', e.target.value as 'Leather' | 'Non Leather')}>
                    <option value="Leather">Leather</option>
                    <option value="Non Leather">Non Leather</option>
                  </select>
                  <label style={labelStyle}>Display in Subcategories *</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px' }}>
                    {productCatalogGroups
                      .filter((sub) => sub.category === (item.category || 'Leather'))
                      .map((sub) => (
                        <div key={sub.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <input
                            type="checkbox"
                            id={`sub-${index}-${sub.id}`}
                            checked={(item.subcategories || []).includes(sub.id)}
                            onChange={(e) => {
                              const subs = item.subcategories || [];
                              if (e.target.checked) {
                                updateCollection(index, 'subcategories', JSON.stringify([...subs, sub.id]));
                              } else {
                                updateCollection(index, 'subcategories', JSON.stringify(subs.filter(s => s !== sub.id)));
                              }
                            }}
                          />
                          <label htmlFor={`sub-${index}-${sub.id}`} style={{ margin: 0, color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem', cursor: 'pointer' }}>{sub.name}</label>
                        </div>
                      ))}
                  </div>
                </div>
                <div style={{ border: '1px solid rgba(212,175,55,0.18)', borderRadius: '18px', padding: '12px', background: 'rgba(255,255,255,0.03)' }}>
                  <p style={{ ...labelStyle, color: gold, marginBottom: '8px' }}>Media</p>
                  <label style={labelStyle}>Image *</label>
                  <input style={inputStyle} type="text" value={item.image} onChange={(e) => updateCollection(index, 'image', e.target.value)} placeholder="Paste image URL here" />
                  <p style={{ margin: '6px 0 0', color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem' }}>Or upload a local image file below.</p>
                  <div style={{ marginTop: 8 }}>
                    <ImageUpload value={item.image} onChange={(b64) => updateCollection(index, 'image', b64)} />
                  </div>
                </div>
                <div style={{ border: '1px solid rgba(212,175,55,0.18)', borderRadius: '18px', padding: '12px', background: 'rgba(255,255,255,0.03)' }}>
                  <p style={{ ...labelStyle, color: gold, marginBottom: '8px' }}>Visibility</p>
                  <label style={labelStyle}>Visible in catalog</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
                    <input type="checkbox" checked={item.isVisible !== false} onChange={(e) => updateCollection(index, 'isVisible', e.target.checked)} />
                    <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem' }}>{item.isVisible !== false ? 'Visible' : 'Hidden'}</span>
                  </div>
                </div>
                {draftError && <p style={{ margin: 0, color: '#fca5a5', fontSize: '0.85rem' }}>{draftError}</p>}
                {item.image && (
                  <div style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '10px', background: 'rgba(255,255,255,0.04)' }}>
                    <p style={{ ...labelStyle, marginBottom: '8px' }}>Image Preview</p>
                    <img src={item.image} alt={item.title || 'Product preview'} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '12px' }} />
                  </div>
                )}
                <button onClick={() => saveDraftProduct(index)} style={{ ...btnStyle, background: `linear-gradient(135deg, ${gold} 0%, #F6E27A 100%)`, color: '#000' }}>Save Product</button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ ...cardStyle, gridColumn: '1 / -1', textAlign: 'center', marginBottom: 0, color: 'rgba(255,255,255,0.65)' }}>
            Search the full catalog to edit any product image and metadata.
          </div>
        )}
      </div>

      {/* Product descriptions removed from admin per request. Images remain editable above. */}

      {/* Orders / Customer Details */}
      <div style={{ ...cardStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1.3rem',
          background: `linear-gradient(135deg, #fff 0%, ${gold} 100%)`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', margin: 0
        }}>Orders & Customer Details</h3>
        <button onClick={() => setShowForm(!showForm)} style={{ ...btnStyle, background: `linear-gradient(135deg, ${gold} 0%, #F6E27A 100%)`, color: '#000' }}>
          {showForm ? 'Cancel' : '+ Add Entry'}
        </button>
      </div>

      {showForm && (
        <div style={{ ...cardStyle, border: '1px solid rgba(212,175,55,0.3)' }}>
          <p style={{ ...labelStyle, marginBottom: '16px', fontSize: '0.85rem', color: gold }}>New Entry</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={labelStyle}>Customer Name</label>
              <input style={inputStyle} value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle}>Phone Number</label>
              <input style={inputStyle} value={form.customerPhone} onChange={(e) => setForm({ ...form, customerPhone: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle}>Email</label>
              <input style={inputStyle} type="email" value={form.customerEmail} onChange={(e) => setForm({ ...form, customerEmail: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle}>Product Name *</label>
              <input style={inputStyle} value={form.productName} onChange={(e) => setForm({ ...form, productName: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle}>Product Color</label>
              <input style={inputStyle} value={form.productColor} onChange={(e) => setForm({ ...form, productColor: e.target.value })} />
            </div>
          </div>
          <button onClick={handleAddOrder} style={{ ...btnStyle, background: `linear-gradient(135deg, ${gold} 0%, #F6E27A 100%)`, color: '#000' }}>
            Save Entry
          </button>
        </div>
      )}

      {orders.map((order) => (
        <div key={order.id} style={{ ...cardStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff', marginBottom: '8px' }}>{order.productName} {order.productColor ? `(${order.productColor})` : ''}</p>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
              {order.customerEmail} | {order.customerPhone || 'No Phone'}
            </p>
          </div>
          <button onClick={() => handleDeleteOrder(order.id)} style={{
            ...btnStyle, padding: '8px 16px', background: 'rgba(220,38,38,0.1)', color: '#fca5a5',
            border: '1px solid rgba(220,38,38,0.2)', fontSize: '0.85rem',
          }}>Delete</button>
        </div>
      ))}

      {orders.length === 0 && (
        <div style={{ ...cardStyle, textAlign: 'center', padding: '48px' }}>
          <p style={{ color: 'rgba(255,255,255,0.5)' }}>No entries yet.</p>
        </div>
      )}

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
