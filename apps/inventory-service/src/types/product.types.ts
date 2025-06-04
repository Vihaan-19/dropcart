import { Vendor } from './vendor.types';

export interface Product {
  id: string;
  vendorId: string;
  name: string;
  price: number;
  stockQty: number;
  description: string;
  category: string | null;
  images: any; // Assuming Json type is flexible
  createdAt: Date;
  updatedAt: Date;
  vendor?: Vendor; // Depending on whether vendor is embedded in Product response
}

export interface ProductList {
  products: Product[];
  page: number;
  limit: number;
  total: number; // Assuming pagination details are returned
}

export interface CreateProductBody {
  vendorId: string;
  name: string;
  price: number;
  stockQty: number;
  description: string;
  category?: string | null; // Allow undefined or null
  images?: any; // Assuming Json type
}

export interface UpdateProductBody {
  name?: string;
  price?: number;
  stockQty?: number;
  description?: string;
  category?: string | null; // Allow undefined or null
  images?: any; // Assuming Json type
} 