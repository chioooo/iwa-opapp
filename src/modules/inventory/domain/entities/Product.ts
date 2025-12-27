export type StockStatus = 'available' | 'low' | 'out_of_stock';
export type InventoryLocation = 'route' | 'warehouse';

export interface Product {
  id: string;
  name: string;
  code: string;
  stockWarehouse: number;
  stockRoute: number;
  price: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductDTO {
  name: string;
  code: string;
  stockWarehouse: number;
  stockRoute: number;
  price: number;
  category: string;
}

export interface UpdateProductDTO {
  name?: string;
  code?: string;
  stockWarehouse?: number;
  stockRoute?: number;
  price?: number;
  category?: string;
}
