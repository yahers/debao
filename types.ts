
export type UserRole = 'SUPER_ADMIN' | 'VENDOR' | 'BUYER' | 'GUEST';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  points: number;
  avatar: string;
  vendorId?: string;
}

export interface Banner {
  id: string;
  title: string;
  imageUrl: string;
  link: string;
  isActive: boolean;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  type: 'NEWS' | 'SCIENCE' | 'INDUSTRY_NEWS' | 'STATIC_PAGE';
  category: string;
  publishDate: string;
  imageUrl: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  salePrice?: number;
  inventory: number;
  category: string;
  brand: string;
  imageUrl: string;
  vendorId: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'DRAFT';
  description: string;
}

export interface MallCategory {
  id: string;
  name: string;
  productCount: number;
  thumbnail: string;
  status: 'ACTIVE' | 'HIDDEN';
}

export interface PointTier {
  id: string;
  name: string;
  minSpend: number;
  maxSpend: number;
  multiplier: number;
}

export interface StandardDownload {
  id: string;
  name: string;
  code: string;
  fileUrl: string;
  fileSize: string;
  category: string;
  downloads: number;
  status: 'ACTIVE' | 'ARCHIVED';
}

export interface ProcurementScenario {
  id: string;
  name: string;
  sku: string;
  thumbnail: string;
  linkedCategories: string[];
  points: { x: number, y: number, categoryId: string }[];
}
