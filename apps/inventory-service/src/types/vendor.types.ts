// Define vendor-related types/interfaces here based on API spec 

export interface Vendor {
  id: string;
  storeName: string;
  contactInfo: any; // Assuming Json type from Prisma can be represented as any for now
  createdAt: Date;
  updatedAt: Date;
  // products?: Product[]; // Depending on whether products are embedded in Vendor response
}

export interface VendorList {
  vendors: Vendor[];
  page: number;
  limit: number;
  total: number; // Assuming pagination details are returned
}

export interface CreateVendorBody {
  storeName: string;
  contactInfo: any; // Assuming Json type
}

export interface UpdateMyStoreBody {
  storeName?: string;
  contactInfo?: any; // Assuming Json type
} 