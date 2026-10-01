// Admin Store — localStorage-based auth & content management

// ==================== AUTH ====================

export interface AdminUser {
  email: string;
  password: string; // In production, use hashing!
}

const USERS_KEY = 'crafted_legacy_admin_users';
const SESSION_KEY = 'crafted_legacy_admin_session';
const ADMIN_EMAIL = 'craftedlegacy26@gmail.com';
const ADMIN_PASSWORD = 'Craftedlegacy@2026';

function getAllowedAdminUser(): AdminUser {
  return {
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
  };
}

export function getUsers(): AdminUser[] {
  try {
    const storedUsers = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const allowedUser = getAllowedAdminUser();

    if (!Array.isArray(storedUsers) || storedUsers.length === 0) {
      localStorage.setItem(USERS_KEY, JSON.stringify([allowedUser]));
      return [allowedUser];
    }

    return [allowedUser];
  } catch {
    const allowedUser = getAllowedAdminUser();
    localStorage.setItem(USERS_KEY, JSON.stringify([allowedUser]));
    return [allowedUser];
  }
}

export function signup(email: string, password: string): { success: boolean; error?: string } {
  return {
    success: false,
    error: 'Admin account creation is disabled. Use the configured admin credentials only.',
  };
}

export function login(email: string, password: string): { success: boolean; error?: string } {
  const normalizedEmail = (email || '').trim().toLowerCase();
  const allowedUser = getAllowedAdminUser();

  if (normalizedEmail !== allowedUser.email.toLowerCase() || password !== allowedUser.password) {
    return { success: false, error: 'Invalid email or password.' };
  }

  localStorage.setItem(USERS_KEY, JSON.stringify([allowedUser]));
  localStorage.setItem(SESSION_KEY, allowedUser.email);
  return { success: true };
}

export function logout(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function isLoggedIn(): boolean {
  return !!localStorage.getItem(SESSION_KEY);
}

export function getCurrentUser(): string | null {
  return localStorage.getItem(SESSION_KEY);
}

// Update admin password
export function updatePassword(email: string, newPassword: string): { success: boolean; error?: string } {
  return {
    success: false,
    error: 'Admin credentials are fixed and cannot be changed from the app.',
  };
}

// ==================== CONTENT ====================

const CONTENT_KEY = 'crafted_legacy_admin_content';
// Remote persistence API (local file-based server)
const CONTENT_API_URL = 'http://localhost:4000/api/content';

export interface HomeContent {
  heading: string;
  subheading: string;
  buttonText: string;
  backgroundImage: string; // base64 or URL
}

export interface CommitmentItem {
  title: string;
  description: string;
}

export interface CollectionItem {
  id: number;
  title: string;
  description: string;
  image: string; // base64 or URL
  imageId?: string; // Featured collection Figma asset ID (e.g., 'product01', 'product02')
  category: 'Leather' | 'Non Leather';
  subcategories: string[]; // Array of subcategory IDs like ['billfolds', 'watch-strap']
  subtitle?: string;
  specifications: string;
  usageCareInstructions: string;
  features?: string;
  suitableFor?: string;
  isVisible?: boolean;
  isDraft?: boolean;
  isFeaturedCollection?: boolean;
}

export interface AboutContent {
  storyTitle: string;
  storyDescription: string;
  storyImage: string;
  missionTitle: string;
  missionDescription: string;
  missionImage: string;
  heritageTitle: string;
  heritageDescription: string;
  heritageImage: string;
  storyBlocks?: string[];
  missionCards?: { title: string; description: string; icon?: string }[];
  heritageBlocks?: string[];
}

export interface CustomizationContent {
  headerTitle: string;
  headerDescription: string;
  mainText: string;
  features?: { title: string; description: string; icon?: string }[];
  processSteps?: { number: string; title: string; description: string }[];
}

export interface ContactContent {
  headerTitle: string;
  headerDescription: string;
  email: string;
  phone: string;
  address: string;
  mapEmbedUrl: string;
  contactInfo: {
    address: string;
    phones: string[];
    email: string;
    businessHours: string[];
    icons?: {
      address: string;
      phone: string;
      email: string;
      businessHours: string;
    };
  };
  corporateInquiries: {
    title: string;
    description: string;
    email: string;
  };
  mapSection: {
    plusCode: string;
    directionUrl: string;
  };
}

export interface NavbarContent {
  logoText: string;
  menuItems: { name: string; path: string }[];
  socialLinks: { name: string; url: string }[];
}

export interface FooterContent {
  links: { name: string; path: string }[];
  socialLinks: { name: string; url: string }[];
  copyrightText: string;
  designerText: string;
  designerUrl: string;
}

export interface CTAContent {
  heading: string;
  description: string;
  buttonText: string;
  buttonLink?: string;
}

export interface HomeSignatureContent {
  heading: string;
  description: string;
  buttonText: string;
  buttonLink?: string;
}

export interface TestimonialItem {
  name: string;
  company?: string;
  review: string;
  rating: number;
}

export interface SectionHeaders {
  commitmentTitle: string;
  collectionsTitle: string;
  collectionsButtonText: string;
  aboutPageTitle: string;
  missionSectionTitle: string;
  craftsmanshipTitle: string;
  contactPageTitle: string;
  productsPageTitle: string;
  categoriesSectionTitle: string;
}

export interface SiteIcons {
  commitmentIcons: string[];
  navbarMenuIcon: string;
  navbarCloseIcon: string;
  footerAdminIcon: string;
  footerSocialIcons: string[];
  collectionPlaceholderIcon: string;
  collectionCloseIcon: string;
  testimonialStarIcon: string;
  scrollToTopIcon: string;
  productCategoryCollapsedIcon: string;
  productCategoryExpandedIcon: string;
  productModalCloseIcon: string;
}

export interface SiteContent {
  home: HomeContent;
  homeSignature: HomeSignatureContent;
  commitments: CommitmentItem[];
  collections: CollectionItem[];
  productDescriptions: Record<string, string>;
  about: AboutContent;
  customization: CustomizationContent;
  contact: ContactContent;
  navbar: NavbarContent;
  footer: FooterContent;
  cta: CTAContent;
  testimonials: TestimonialItem[];
  sectionHeaders: SectionHeaders;
  icons: SiteIcons;
}

export interface ProductCatalogItem {
  id: string;
  name: string;
  category: 'Leather' | 'Non Leather';
  tagline?: string;
}

const productCatalogGroups = [
  { name: 'Billfolds', count: 8, id: 'billfolds', category: 'Leather' },
  { name: 'Crafted Watch Strap', count: 4, id: 'watch-strap', category: 'Leather' },
  { name: 'Crossbody Slings', count: 4, id: 'crossbody-slings', category: 'Leather' },
  { name: 'Curated Gift Sets', count: 5, id: 'gift-sets', category: 'Leather' },
  { name: 'Executive Folios', count: 2, id: 'executive-folios', category: 'Leather' },
  { name: 'Executive Laptop Bags & Sleeves', count: 9, id: 'laptop-bags', category: 'Leather' },
  { name: 'Key Fobs', count: 4, id: 'key-fobs', category: 'Leather' },
  { name: 'Leather Card Holder', count: 5, id: 'card-holder', category: 'Leather' },
  { name: 'Signature Backpack', count: 1, id: 'signature-backpack', category: 'Leather' },
  { name: 'Signature Belts', count: 5, id: 'signature-belts', category: 'Leather' },
  { name: 'Signature Wallet & Belt Sets', count: 3, id: 'wallet-belt-sets', category: 'Leather' },
  { name: "Signature Women's Bag", count: 10, id: 'womens-bag', category: 'Leather' },
  { name: 'Travel & Passport Sleeves', count: 4, id: 'travel-sleeves', category: 'Leather' },
  { name: 'Travel Duffles & Carryalls', count: 4, id: 'travel-duffles', category: 'Leather' },
  { name: "Women's Clutch", count: 2, id: 'womens-clutch', category: 'Leather' },
  { name: 'Backpack & Travel Carriers', count: 2, id: 'backpack-carriers', category: 'Non Leather' },
  { name: 'Business & Credit Card Holders', count: 3, id: 'business-card-holders', category: 'Non Leather' },
  { name: 'Hydration Bottles & Flasks', count: 5, id: 'hydration', category: 'Non Leather' },
  { name: 'Journals & Pens', count: 5, id: 'journals-pens', category: 'Non Leather' },
  { name: 'Laptop Sleeves', count: 4, id: 'laptop-sleeves', category: 'Non Leather' },
  { name: 'T-Shirts', count: 1, id: 't-shirts', category: 'Non Leather' },
] as const;

export { productCatalogGroups };

const productNameVariants = ['Heritage', 'Signature', 'Executive', 'Luxe', 'Classic', 'Modern', 'Elite', 'Refined', 'Contour', 'Imperial'] as const;

const productKeywordMap: Record<string, string> = {
  billfolds: 'Fold',
  'watch-strap': 'Strap',
  'crossbody-slings': 'Sling',
  'gift-sets': 'Gift Set',
  'executive-folios': 'Folio',
  'laptop-bags': 'Laptop Case',
  'key-fobs': 'Key Fob',
  'card-holder': 'Card Holder',
  'signature-backpack': 'Backpack',
  'signature-belts': 'Belt',
  'wallet-belt-sets': 'Set',
  'womens-bag': 'Bag',
  'travel-sleeves': 'Sleeve',
  'travel-duffles': 'Carryall',
  'womens-clutch': 'Clutch',
  'backpack-carriers': 'Carrier',
  'business-card-holders': 'Holder',
  hydration: 'Bottle',
  'journals-pens': 'Journal',
  'laptop-sleeves': 'Sleeve',
  't-shirts': 'T-Shirt',
};

const buildProductName = (group: { name: string; count: number; id: string; category: 'Leather' | 'Non Leather' }, index: number) => {
  const variant = productNameVariants[index % productNameVariants.length];
  const keyword = productKeywordMap[group.id] || group.name;
  return `${variant} ${keyword}`;
};

const buildTagline = (group: { name: string; count: number; id: string; category: 'Leather' | 'Non Leather' }, index: number) => {
  const descriptor = ['Elegant', 'Premium', 'Refined', 'Handcrafted', 'Polished', 'Modern', 'Artisan', 'Timeless'][index % 8];
  const material = group.category === 'Leather' ? 'leather' : 'utility';
  return `${descriptor} ${material} piece with a sophisticated finish.`;
};

export const productCatalog: ProductCatalogItem[] = productCatalogGroups.flatMap((group) =>
  Array.from({ length: group.count }, (_, index) => ({
    id: `${group.id}-${index + 1}`,
    name: buildProductName(group, index),
    category: group.category,
    tagline: buildTagline(group, index),
  }))
);

const defaultProductDescriptions: Record<string, string> = Object.fromEntries(
  productCatalog.map((product, index) => {
    const mood = ['heritage', 'signature', 'executive', 'luxe', 'classic', 'modern', 'refined', 'artisan'][index % 8];
    const categoryNote = product.category === 'Leather' ? 'premium leather finish' : 'refined utility design';
    return [
      product.id,
      `${product.name} blends ${mood} craftsmanship, a polished silhouette, and ${categoryNote} for elevated gifting and everyday distinction.`,
    ];
  })
);

// Default content matching existing site
export const defaultContent: SiteContent = {
  home: {
    heading: 'Define your corporate signature',
    subheading: 'Premium leather craftsmanship that elevates your brand',
    buttonText: 'Explore collections',
    backgroundImage: '',
  },
  homeSignature: {
    heading: 'Design your corporate signature',
    description: 'Every gift is a statement. We design narratives of excellence and timeless value that leave a lasting impression.',
    buttonText: 'Start your journey',
    buttonLink: '/contact',
  },
  commitments: [
    {
      title: 'Premium Quality',
      description:
        'Every piece begins with handpicked leather, ensuring unmatched quality and timeless appeal.',
    },
    {
      title: 'Artisan Craftsmanship',
      description:
        'Expertly crafted by seasoned artisans, delivering timeless elegance in every piece.',
    },
    {
      title: 'Bespoke Customization',
      description: 'Custom-crafted branding to perfectly showcase your corporate essence.',
    },
  ],
  collections: [
    { id: 1, title: 'Premium Textured Wallet', description: 'A refined wallet with a slim silhouette, soft grain finish, and executive-ready detailing.', image: '', imageId: 'product01', category: 'Leather', subcategories: ['billfolds', 'card-holder'], subtitle: 'Elegant everyday carry', specifications: 'Material: Full-grain leather, Dimensions: 9 x 11 cm, Weight: 180 g', usageCareInstructions: 'Store in a dust bag and wipe gently with a dry cloth.', features: 'Genuine leather, polished hardware, soft-touch finish', suitableFor: 'Corporate gifting, professional use', isVisible: true, isFeaturedCollection: true },
    { id: 2, title: 'Leather Passport Holder', description: 'A polished travel companion that protects documents with a luxury leather finish and structured design.', image: '', imageId: 'product02', category: 'Leather', subcategories: ['travel-sleeves'], subtitle: 'Travel-ready sophistication', specifications: 'Material: Vegetable-tanned leather, Dimensions: 10 x 15 cm, Weight: 140 g', usageCareInstructions: 'Avoid moisture and use a soft leather conditioner occasionally.', features: 'Structured profile, secure fold, premium stitching', suitableFor: 'Travel, gifting, collectors', isVisible: true, isFeaturedCollection: true },
    { id: 3, title: 'Executive Leather Belt', description: 'A classic belt designed with clean lines, durable construction, and a sharp finish for everyday formality.', image: '', imageId: 'product03', category: 'Leather', subcategories: ['signature-belts'], subtitle: 'Tailored executive style', specifications: 'Material: Smooth leather, Dimensions: 120 cm length, Weight: 260 g', usageCareInstructions: 'Keep away from prolonged sunlight and moisture.', features: 'Strong buckle, refined edges, durable stitching', suitableFor: 'Office wear, gifting, formal dressing', isVisible: true, isFeaturedCollection: true },
    { id: 4, title: 'Luxury Crocodile Handbag', description: 'A statement handbag with rich texture, sculpted form, and a premium presence for elegant daily use.', image: '', imageId: 'product04', category: 'Leather', subcategories: ['womens-bag'], subtitle: 'Luxury statement silhouette', specifications: 'Material: Grain leather, Dimensions: 32 x 24 x 12 cm, Weight: 820 g', usageCareInstructions: 'Store upright and clean with a microfiber cloth.', features: 'Full-grain texture, structured body, polished hardware', suitableFor: 'Luxury gifting, evening wear, travel', isVisible: true, isFeaturedCollection: true },
    { id: 5, title: 'Corporate Gift Collection', description: 'A curated collection of premium leather accents designed for polished corporate presentation and memorable gifting.', image: '', imageId: 'product05', category: 'Leather', subcategories: ['gift-sets'], subtitle: 'Curated for occasions', specifications: 'Material: Leather and finishing trim, Dimensions: Varied, Weight: 1.2 kg set', usageCareInstructions: 'Keep wrapped when not in use and avoid soaking.', features: 'Coordinated pieces, refined packaging, premium finish', suitableFor: 'Corporate events, brand gifting', isVisible: true, isFeaturedCollection: true },
    { id: 6, title: 'Professional Laptop Portfolio', description: 'A sleek portfolio that balances protection, elegance, and executive organization for modern professionals.', image: '', imageId: 'product06', category: 'Leather', subcategories: ['laptop-bags', 'executive-folios'], subtitle: 'Professional polish', specifications: 'Material: Soft leather, Dimensions: 32 x 24 cm, Weight: 590 g', usageCareInstructions: 'Use a dry cloth and avoid excessive bending.', features: 'Secure compartments, slim profile, premium lining', suitableFor: 'Meetings, travel, executive gifting', isVisible: true, isFeaturedCollection: true },
  ],
  productDescriptions: defaultProductDescriptions,
  about: {
    storyTitle: 'Story Behind Crafted Legacy',
    storyDescription: 'Founded on a simple belief: corporate gifting should carry meaning, craftsmanship, and lasting value.',
    // New: allow multiple story blocks (paragraphs) editable in admin
    storyBlocks: [
      'Crafted Legacy was founded on a simple belief: corporate gifting should carry meaning, craftsmanship, and lasting value. What began as a passion for fine leather has grown into a mission to transform how brands express appreciation and build enduring relationships.',
      'From the very beginning, our vision has been clear: to create high-end leather gifts that reflect the integrity, prestige, and identity of the companies we serve. Every piece is meticulously handcrafted by skilled artisans using carefully selected premium leather, ensuring unmatched quality, elegance, and durability.',
      'At Crafted Legacy, we seamlessly blend timeless craftsmanship with modern corporate expectations—precision, personalization, and professionalism. Whether it\'s a bespoke creation for a valued client or a curated collection for your team, our goal remains the same: to deliver gifts that leave a powerful, lasting impression.',
    ],
    storyImage: '',
    missionTitle: 'What Drives Us',
    missionDescription: 'Our vision is clear: to create high-end leather gifts that reflect the integrity and prestige of our clients.',
    missionImage: '',
    heritageTitle: 'Craftsmanship Heritage',
    heritageDescription: 'Meticulously handcrafted by skilled artisans using premium leather, ensuring unmatched quality.',
    heritageImage: '',
    // Mission cards editable
    missionCards: [
      { title: 'Our Mission', description: 'To craft premium leather gifts that reflect luxury, artistry, and meaningful connections.', icon: 'target' },
      { title: 'Our Excellence', description: 'Skilled artisans, traditional techniques, and superior materials ensure every piece reflects unparalleled quality.', icon: 'award' },
      { title: 'Our Clients', description: 'We serve forward-thinking organizations and reputable brands, ensuring every detail exemplifies premium quality and sophistication.', icon: 'users' },
      { title: 'Our Passion', description: 'For us, every piece of leather is a canvas, crafted with knowledge passed down through generations.', icon: 'heart' },
    ],
  },
  customization: {
    headerTitle: 'Exquisite Personalization',
    headerDescription: 'Your brand, etched in leather.',
    mainText: 'At Crafted Legacy, we understand that every detail matters. Our customization process is designed to ensure your corporate identity is represented with the highest level of precision and elegance.',
    // Customization editable arrays
    features: [
      { title: 'Embossing & Debossing', description: 'Add a touch of sophistication with embossing and debossing, highlighting your brand with subtle elegance.', icon: 'stamp' },
      { title: 'Custom Color Selection', description: 'Select from our luxurious range of leather shades and partner with our artisans to develop a signature color for your brand.', icon: 'palette' },
      { title: 'Metallic Foil Stamping', description: 'Infuse your designs with luxury using gold, silver, or rose gold foil, reflecting refinement and prestige.', icon: 'sparkles' },
      { title: 'Premium Packaging', description: 'Our customized packaging ensures every piece makes a memorable and distinguished corporate impression.', icon: 'package' },
    ],
    processSteps: [
      { number: '01', title: 'Consultation', description: 'Share your vision with our design team as we walk you through the best customization options with expert guidance.' },
      { number: '02', title: 'Design Approval', description: 'Review detailed mockups and samples to ensure every element aligns perfectly with your brand expectations.' },
      { number: '03', title: 'Artisan Crafting', description: 'Our master artisans craft each piece with precision, bringing your approved design to life with meticulous care.' },
      { number: '04', title: 'Quality Assurance', description: 'Every item undergoes rigorous inspection, meeting our highest standards before it reaches your hands.' },
    ],
  },
  contact: {
    headerTitle: 'Let’s Create Your Legacy',
    headerDescription: 'Get in touch for bespoke orders and inquiries.',
    email: 'contact@craftedlegacy.com',
    phone: '+91 99876 54321',
    address: '12 Corporate Lane, Chennai, TN 600001',
    mapEmbedUrl: '',
    contactInfo: {
      address: 'No.33 Jega Jeevan Ram Nagar\n270 Agaram Main Road, Selaiyur\nChennai 600073',
      phones: ['+91 99526 18170', '+91 97888 88483'],
      email: 'us.craftedlegacy@gmail.com',
      businessHours: ['Monday - Friday: 10AM - 7PM', 'Saturday on appointment basis'],
      icons: {
        address: 'map-pin',
        phone: 'phone',
        email: 'mail',
        businessHours: 'clock',
      },
    },
    corporateInquiries: {
      title: 'Corporate inquiries',
      description: 'For bulk orders and customization projects, please contact our corporate sales team for personalized assistance.',
      email: 'us.craftedlegacy@gmail.com',
    },
    mapSection: {
      plusCode: 'W48V+GW Chennai, Tamil Nadu',
      directionUrl: 'https://www.google.com/maps/search/?api=1&query=W48V%2BGW+Chennai,+Tamil+Nadu',
    },
  },
  navbar: {
    logoText: 'Crafted Legacy',
    menuItems: [
      { name: 'Home', path: '#' },
      { name: 'Products', path: '#products' },
      { name: 'About', path: '#about' },
      { name: 'Customization', path: '#customization' },
      { name: 'Contact', path: '#contact' },
      { name: 'Privacy policy', path: '#privacy' },
      { name: 'Terms & conditions', path: '#terms' }
    ],
    socialLinks: [
      { name: 'Facebook', url: 'https://www.facebook.com/people/Crafted-Legacy/pfbid0bQxuByBmBourkWaSPBdGe6mXcBttV5wUyHjTgxdQnNb9auAkLJTGtyduMu8SK6Kml/' },
      { name: 'Instagram', url: 'https://www.instagram.com/us.craftedlegacy/' },
      { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sabarish-raja-92324ba8/' }
    ],
  },
  footer: {
    links: [
      { name: 'Home', path: '#' },
      { name: 'About', path: '#about' },
      { name: 'Products', path: '#products' },
      { name: 'Customization', path: '#customization' },
      { name: 'Contact', path: '#contact' },
      { name: 'Privacy policy', path: '#privacy' },
      { name: 'Terms & conditions', path: '#terms' }
    ],
    socialLinks: [
      { name: 'Facebook', url: 'https://www.facebook.com/people/Crafted-Legacy/pfbid0bQxuByBmBourkWaSPBdGe6mXcBttV5wUyHjTgxdQnNb9auAkLJTGtyduMu8SK6Kml/' },
      { name: 'Instagram', url: 'https://www.instagram.com/us.craftedlegacy/' },
      { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sabarish-raja-92324ba8/' }
    ],
    copyrightText: '© 2025 Crafted Legacy. All rights reserved.',
    designerText: 'Site designed and maintained by',
    designerUrl: 'https://www.zenith77.com',
  },
  cta: {
    heading: 'Define your corporate signature',
    description: 'Every gift is a statement. We design narratives of excellence and timeless value that leave a lasting impression.',
    buttonText: 'Start your journey',
    buttonLink: '/contact',
  },
  testimonials: [
    {
      name: 'Rajesh Kumar',
      company: 'TechCorp India',
      review: 'The quality of the leather products is exceptional. Our clients were thoroughly impressed with the craftsmanship and attention to detail.',
      rating: 5,
    },
    {
      name: 'Priya Sharma',
      company: 'Global Enterprises',
      review: 'Crafted Legacy delivered beyond our expectations. The personalized gifts made our corporate event truly memorable.',
      rating: 5,
    },
    {
      name: 'Anand Patel',
      company: 'Innovation Labs',
      review: 'Professional service, stunning products, and timely delivery. Highly recommend for corporate gifting needs.',
      rating: 5,
    },
    {
      name: 'Sunita Verma',
      company: 'Elite Solutions',
      review: 'Excellent craftsmanship and timely delivery. Our partners loved the corporate gifts.',
      rating: 5,
    },
    {
      name: 'Vikram Joshi',
      company: 'Mercury Logistics',
      review: 'High-quality products and attentive service. A reliable partner for our corporate gifting programs.',
      rating: 5,
    },
    // Extra slot for admin to add another testimonial card
    {
      name: '',
      company: '',
      review: '',
      rating: 5,
    },
  ],
  sectionHeaders: {
    commitmentTitle: 'Our commitment to craft',
    collectionsTitle: 'Our feature collections',
    collectionsButtonText: 'Explore collection',
    aboutPageTitle: 'The story behind Crafted Legacy',
    missionSectionTitle: 'What Drives Us',
    craftsmanshipTitle: 'Craftsmanship Heritage',
    contactPageTitle: "We're here to assist",
    productsPageTitle: 'Our products',
    categoriesSectionTitle: 'Explore Categories',
  },
  icons: {
    commitmentIcons: ['gem', 'award', 'sparkles'],
    navbarMenuIcon: 'menu',
    navbarCloseIcon: 'x',
    footerAdminIcon: 'home',
    footerSocialIcons: ['facebook', 'instagram', 'linkedin'],
    collectionPlaceholderIcon: 'shopping-bag',
    collectionCloseIcon: 'x',
    testimonialStarIcon: 'star',
    scrollToTopIcon: 'arrow-up',
    productCategoryCollapsedIcon: 'chevron-down',
    productCategoryExpandedIcon: 'chevron-up',
    productModalCloseIcon: 'x',
  },
};

export function getSiteContent(): SiteContent {
  try {
    console.log('📖 [GET] Retrieving site content from localStorage...');
    const stored = localStorage.getItem(CONTENT_KEY);
    if (stored) {
      console.log('📖 [GET] Content found in localStorage, parsing...');
      const parsed = JSON.parse(stored);
      console.log('📖 [GET] Parsed content, customization:', parsed.customization);
      console.log('📖 [GET] Parsed content, CTA:', parsed.cta);
      // Merge with defaults so new fields always exist
      const result = {
        ...defaultContent,
        ...parsed,
        // Ensure `home` merges with defaults so blank/partial saved values don't remove headings
        home: { ...defaultContent.home, ...(parsed.home || {}) },
        collections: (parsed.collections || defaultContent.collections).map((item: Partial<CollectionItem>, index: number) => {
          const defaultCollection =
            defaultContent.collections.find((collection) => collection.id === item.id) ||
            defaultContent.collections.find((collection) => collection.title === item.title) ||
            defaultContent.collections[index];

          return {
            ...defaultCollection,
            ...item,
            imageId: item.imageId || defaultCollection?.imageId,
            category: item.category || defaultCollection?.category || 'Leather',
            subcategories: item.subcategories || defaultCollection?.subcategories || [],
            subtitle: item.subtitle || defaultCollection?.subtitle || '',
            specifications: item.specifications || defaultCollection?.specifications || '',
            usageCareInstructions: item.usageCareInstructions || defaultCollection?.usageCareInstructions || '',
            features: item.features || defaultCollection?.features || '',
            suitableFor: item.suitableFor || defaultCollection?.suitableFor || '',
            isVisible: item.isVisible !== undefined ? item.isVisible : (defaultCollection?.isVisible ?? true),
            description: item.description || defaultCollection?.description || '',
            isDraft: Boolean(item.isDraft),
          };
        }),
        productDescriptions: { ...defaultContent.productDescriptions, ...(parsed.productDescriptions || {}) },
        about: { ...defaultContent.about, ...(parsed.about || {}) },
        homeSignature: { ...defaultContent.homeSignature, ...(parsed.homeSignature || {}) },
        customization: { ...defaultContent.customization, ...(parsed.customization || {}) },
        contact: {
          ...defaultContent.contact,
          ...(parsed.contact || {}),
          contactInfo: {
            ...defaultContent.contact.contactInfo,
            ...(parsed.contact?.contactInfo || {}),
            icons: {
              ...defaultContent.contact.contactInfo.icons,
              ...(parsed.contact?.contactInfo?.icons || {}),
            },
          },
          corporateInquiries: {
            ...defaultContent.contact.corporateInquiries,
            ...(parsed.contact?.corporateInquiries || {}),
          },
          mapSection: {
            ...defaultContent.contact.mapSection,
            ...(parsed.contact?.mapSection || {}),
          },
        },
        navbar: { ...defaultContent.navbar, ...(parsed.navbar || {}) },
        footer: { ...defaultContent.footer, ...(parsed.footer || {}) },
        cta: { ...defaultContent.cta, ...(parsed.cta || {}) },
        // Merge/pad testimonials so we always show at least 5 cards (preserve admin entries, fill from defaults)
        testimonials: (() => {
          const p = parsed.testimonials || [];
          if (p.length >= 5) return p;
          const needed = defaultContent.testimonials.filter(dt => !p.some(pt => pt.name === dt.name)).slice(0, Math.max(0, 5 - p.length));
          return [...p, ...needed];
        })(),
        sectionHeaders: { ...defaultContent.sectionHeaders, ...(parsed.sectionHeaders || {}) },
        icons: {
          ...defaultContent.icons,
          ...(parsed.icons || {}),
          commitmentIcons: parsed.icons?.commitmentIcons || defaultContent.icons.commitmentIcons,
          footerSocialIcons: parsed.icons?.footerSocialIcons || defaultContent.icons.footerSocialIcons,
        },
      };
      console.log('✅ [GET] Content merged with defaults');
      return result;
    }
    console.log('📖 [GET] No content in localStorage, using defaults');
    return defaultContent;
  } catch (e) {
    console.error('❌ [GET] Error retrieving site content:', e);
    return defaultContent;
  }
}

export function saveSiteContent(content: SiteContent): void {
  try {
    console.log('💾 [SAVE] Starting save process...');
    console.log('💾 [SAVE] Content keys:', Object.keys(content));
    console.log('💾 [SAVE] Customization:', content.customization);
    console.log('💾 [SAVE] CTA:', content.cta);
    console.log('💾 [SAVE] Collections count:', content.collections?.length);
  } catch (e) {
    console.error('Error logging save data:', e);
  }

  try {
    // 1. Save to localStorage (primary)
    console.log('📝 [SAVE] Writing to localStorage...');
    localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
    console.log('✅ [SAVE] localStorage write successful');
  } catch (e) {
    console.error('❌ [SAVE] localStorage write failed:', e);
  }

  // 2. Dispatch event for live components
  try {
    console.log('📢 [SAVE] Dispatching admin-content-updated event...');
    window.dispatchEvent(new CustomEvent('admin-content-updated'));
    console.log('✅ [SAVE] Event dispatched');
  } catch (e) {
    console.error('❌ [SAVE] Event dispatch failed:', e);
  }

  // 3. Persist to remote server (non-blocking)
  (async () => {
    try {
      console.log('🌐 [SAVE] Attempting to sync to server:', CONTENT_API_URL);
      const response = await fetch(CONTENT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });

      if (!response.ok) {
        console.warn(`⚠️ [SAVE] Server returned status ${response.status}`);
      } else {
        const result = await response.json();
        console.log('✅ [SAVE] Server sync successful:', result);
      }
    } catch (e) {
      console.warn('⚠️ [SAVE] Server sync failed (will use localStorage fallback):', e);
    }
  })();
}

// Try to load persisted content from the server on module init and merge into localStorage.
async function fetchRemoteContent(): Promise<void> {
  try {
    const res = await fetch(CONTENT_API_URL);
    if (!res.ok) return;
    const data = await res.json();
    if (data && Object.keys(data).length > 0) {
      try {
        // If local content already exists, do not overwrite it with remote data to avoid
        // clobbering recent admin edits when the remote server has stale content.
        const local = localStorage.getItem(CONTENT_KEY);
        if (local) {
          // eslint-disable-next-line no-console
          console.debug('fetchRemoteContent: local content exists, skipping overwrite');
        } else {
          localStorage.setItem(CONTENT_KEY, JSON.stringify(data));
          window.dispatchEvent(new CustomEvent('admin-content-updated'));
          // eslint-disable-next-line no-console
          console.debug('fetchRemoteContent: remote content loaded into localStorage');
        }
      } catch (e) {
        // ignore
      }
    }
  } catch (e) {
    // ignore network errors; localStorage will be used as fallback
  }
}

// Kick off a background fetch to hydrate localStorage from server (if available)
fetchRemoteContent();

export function resetSiteContent(): void {
  localStorage.removeItem(CONTENT_KEY);
  window.dispatchEvent(new CustomEvent('admin-content-updated'));
}

// Utility: convert File to base64 data URL
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ==================== ORDERS ====================

const ORDERS_KEY = 'crafted_legacy_admin_orders';

export interface OrderItem {
  id: string;
  productImage: string;
  productName: string;
  productColor: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
}

const defaultOrders: OrderItem[] = [
  {
    id: 'ORD-001',
    productImage: '',
    productName: 'Premium Textured Wallet',
    productColor: 'Black',
    customerEmail: 'azeem@tafe.com',
    customerPhone: '+91 99876 54321',
    customerAddress: '12 Corporate Lane, Chennai, TN 600001',
    status: 'delivered',
    createdAt: '2026-04-28T10:30:00Z',
  },
  {
    id: 'ORD-002',
    productImage: '',
    productName: 'Executive Leather Belt',
    productColor: 'Brown',
    customerEmail: 'ramachandran@keyem.com',
    customerPhone: '+91 98765 12345',
    customerAddress: '45 Business Park, Coimbatore, TN 641001',
    status: 'shipped',
    createdAt: '2026-05-01T14:15:00Z',
  },
  {
    id: 'ORD-003',
    productImage: '',
    productName: 'Corporate Gift Collection',
    productColor: 'Navy Blue',
    customerEmail: 'arul@freekart.in',
    customerPhone: '+91 97654 32109',
    customerAddress: '78 Tech Hub, Bangalore, KA 560001',
    status: 'processing',
    createdAt: '2026-05-03T09:00:00Z',
  },
];

export function getOrders(): OrderItem[] {
  try {
    const stored = localStorage.getItem(ORDERS_KEY);
    if (stored) return JSON.parse(stored);
    // Initialize with demo orders
    localStorage.setItem(ORDERS_KEY, JSON.stringify(defaultOrders));
    return defaultOrders;
  } catch {
    return defaultOrders;
  }
}

export function saveOrders(orders: OrderItem[]): void {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function addOrder(order: Omit<OrderItem, 'id' | 'createdAt'>): OrderItem {
  const orders = getOrders();
  const newOrder: OrderItem = {
    ...order,
    id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
    createdAt: new Date().toISOString(),
  };
  orders.push(newOrder);
  saveOrders(orders);
  return newOrder;
}

export function deleteOrder(id: string): void {
  const orders = getOrders().filter((o) => o.id !== id);
  saveOrders(orders);
}

export function updateOrderStatus(id: string, status: OrderItem['status']): void {
  const orders = getOrders().map((o) => (o.id === id ? { ...o, status } : o));
  saveOrders(orders);
}

// ==================== CONTACT ENQUIRIES ====================

const ENQUIRIES_KEY = 'crafted_legacy_contact_enquiries';

export interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  adminEmail: string;
  createdAt: string;
}

export function getEnquiries(): ContactEnquiry[] {
  try {
    return JSON.parse(localStorage.getItem(ENQUIRIES_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveEnquiries(enquiries: ContactEnquiry[]): void {
  localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(enquiries));
  window.dispatchEvent(new CustomEvent('admin-enquiries-updated'));
}

export function addEnquiry(enquiry: Omit<ContactEnquiry, 'id' | 'createdAt'>): ContactEnquiry {
  const enquiries = getEnquiries();
  const newEnquiry: ContactEnquiry = {
    ...enquiry,
    id: `ENQ-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  saveEnquiries([newEnquiry, ...enquiries]);
  return newEnquiry;
}

export function deleteEnquiry(id: string): void {
  saveEnquiries(getEnquiries().filter((enquiry) => enquiry.id !== id));
}
