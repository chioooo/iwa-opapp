export type StockStatus = 'available' | 'low' | 'out_of_stock';
export type InventoryLocation = 'route' | 'warehouse';
export type UnitType = 'pza' | 'pack' | 'kg' | 'lt' | 'caja' | 'bolsa';

export interface PendingDelivery {
  clientName: string;
  quantity: number;
}

export interface Product {
  id: string;
  name: string;
  code: string;
  stockWarehouse: number;
  stockRoute: number;
  price: number;
  category: string;
  unitType: UnitType;
  unitQuantity?: number; // e.g., 12 for "pack 12 pzs"
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
  unitType: UnitType;
  unitQuantity?: number;
}

export interface UpdateProductDTO {
  name?: string;
  code?: string;
  stockWarehouse?: number;
  stockRoute?: number;
  price?: number;
  category?: string;
  unitType?: UnitType;
  unitQuantity?: number;
}
