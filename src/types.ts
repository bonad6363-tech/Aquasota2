export type CategorySlug =
  | 'perenosnye-filtry'
  | 'magistralnye-filtry'
  | 'smennye-kartridzhi'
  | 'aksessuary';

export type ProductStatus = 'in-stock' | 'out-of-stock';

export type DocumentStatus = 'pending' | 'published';

export type DocumentType = 'declaration' | 'protocol' | 'passport';

export interface Category {
  slug: CategorySlug;
  name: string;
  shortName: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  sku: string;
  name: string;
  category: CategorySlug;
  shortPurpose: string;
  description: string[];
  specs: ProductSpec[];
  keySpecs: string[];
  kit: string[];
  usage: string[];
  care: string[];
  faq: { question: string; answer: string }[];
  price: number;
  oldPrice?: number;
  inStock: boolean;
  popularity: number;
  images: { src: string; alt: string }[];
  comparable: boolean;
  installType: string;
  purpose: string;
  performance: string;
  waterTemp: string;
  lifetime: string;
  size: string;
  careSummary: string;
}

export interface NavItem {
  to: string;
  label: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  productName: string;
  productSlug?: string;
  type: DocumentType;
  number: string;
  date: string;
  validUntil: string;
  issuer: string;
  status: DocumentStatus;
}

export interface CartItem {
  slug: string;
  quantity: number;
}

export interface ConsultFormValues {
  name: string;
  phone: string;
  comment: string;
  consent: boolean;
}

export interface CheckoutFormValues {
  name: string;
  phone: string;
  email: string;
  city: string;
  receiveMethod: 'cdek' | 'pickup';
  address: string;
  paymentMethod: 'cash' | 'card' | 'invoice';
  comment: string;
  consent: boolean;
}
