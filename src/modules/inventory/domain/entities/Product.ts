export type StockStatus = 'available' | 'low' | 'out_of_stock';
export type InventoryLocation = 'route' | 'warehouse';

export interface Product {
  id: string;
  name: string;
  code: string;
  stock: number;
  price: number;
  category: string;
  location: InventoryLocation;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductDTO {
  name: string;
  code: string;
  stock: number;
  price: number;
  category: string;
  location: InventoryLocation;
}

export interface UpdateProductDTO {
  name?: string;
  code?: string;
  stock?: number;
  price?: number;
  category?: string;
  location?: InventoryLocation;
}
