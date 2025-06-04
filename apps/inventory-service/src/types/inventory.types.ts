// Define inventory-related types/interfaces here based on API spec 

import { Product } from './product.types';

export interface InventoryDetails {
  productId: string;
  stockQty: number;
  product?: Product; // Depending on whether product is embedded in InventoryDetails response
}

export interface UpdateProductStockBody {
  changeQty: number;
  reason: string;
}

export interface InventoryLog {
  id: string;
  productId: string;
  changeQty: number;
  reason: string;
  previousQty: number | null;
  newQty: number | null;
  createdAt: Date;
  product?: Product; // Depending on whether product is embedded in InventoryLog response
}

export interface InventoryLogList {
  logs: InventoryLog[];
  page: number;
  limit: number;
  total: number; // Assuming pagination details are returned
} 