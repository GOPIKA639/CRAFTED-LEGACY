import product01 from 'figma:asset/c6ec1a134c39604cfff52edbe4a998ec4b70ab72.png';
import product02 from 'figma:asset/61822f370cc6e06eecab4b75e4919edd9ed5ac06.png';
import product03 from 'figma:asset/b4028c8570a789f1a093ab2adadbe21482d9e04f.png';
import product04 from 'figma:asset/ae537843747299d591215f4e3456ec8f797fd2fe.png';
import product05 from 'figma:asset/937c65f8c2ed9f674701455086257cf5da8b0b2d.png';
import product06 from 'figma:asset/43e3eec20871ab8e0bb8028bbc543af1924e1e44.png';

type FeaturedProductImageInput = {
  id?: number | string;
  title?: string;
  image?: string;
  imageId?: string;
};

export const featuredProductImageMap: Record<string, string> = {
  product01,
  product02,
  product03,
  product04,
  product05,
  product06,
};

const featuredProductTitleMap: Record<string, string> = {
  'premium textured wallet': product01,
  'leather passport holder': product02,
  'executive leather belt': product03,
  'luxury crocodile handbag': product04,
  'corporate gift collection': product05,
  'professional laptop portfolio': product06,
};

export const getFeaturedProductImageId = (id?: number | string) => {
  if (id === undefined || id === null || id === '') return undefined;
  const numericId = Number(String(id).replace(/^collection-/, ''));
  if (!Number.isInteger(numericId) || numericId < 1 || numericId > 6) return undefined;
  return `product${String(numericId).padStart(2, '0')}`;
};

export const getFeaturedProductImage = (product: FeaturedProductImageInput) => {
  if (product.image) return product.image;

  if (product.imageId && featuredProductImageMap[product.imageId]) {
    return featuredProductImageMap[product.imageId];
  }

  const imageId = getFeaturedProductImageId(product.id);
  if (imageId && featuredProductImageMap[imageId]) {
    return featuredProductImageMap[imageId];
  }

  const titleKey = product.title?.trim().toLowerCase();
  if (titleKey && featuredProductTitleMap[titleKey]) {
    return featuredProductTitleMap[titleKey];
  }

  return undefined;
};

