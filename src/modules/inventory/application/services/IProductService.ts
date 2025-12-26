import type { Product, CreateProductDTO, UpdateProductDTO, StockStatus, InventoryLocation } from '../../domain/entities';

export interface InventorySummary {
  totalProducts: number;
  lowStockProducts: number;
  outOfStockProducts: number;
  totalValue: number;
  categories: string[];
}

/**
 * Product Service Interface
 * Interface Segregation Principle: Specific interface for product business logic
 */
export interface IProductService {
  getAllProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | null>;
  getProductByCode(code: string): Promise<Product | null>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getProductsByLocation(location: InventoryLocation): Promise<Product[]>;
  searchProducts(query: string, location?: InventoryLocation): Promise<Product[]>;
  createProduct(dto: CreateProductDTO): Promise<Product>;
  updateProduct(id: string, dto: UpdateProductDTO): Promise<Product | null>;
  updateStock(id: string, quantity: number): Promise<Product | null>;
  deleteProduct(id: string): Promise<boolean>;
  getInventorySummary(): Promise<InventorySummary>;
  getStockStatus(stock: number): StockStatus;
}
