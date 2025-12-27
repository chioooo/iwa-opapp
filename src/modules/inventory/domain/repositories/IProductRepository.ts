import type { Product, CreateProductDTO, UpdateProductDTO, InventoryLocation } from '../entities';

/**
 * Product Repository Interface
 * Dependency Inversion Principle: High-level modules depend on abstractions
 * Interface Segregation Principle: Specific interface for product operations
 */
export interface IProductRepository {
  getAll(): Promise<Product[]>;
  getById(id: string): Promise<Product | null>;
  getByCode(code: string): Promise<Product | null>;
  getByCategory(category: string): Promise<Product[]>;
  getByLocation(location: InventoryLocation): Promise<Product[]>;
  search(query: string): Promise<Product[]>;
  create(dto: CreateProductDTO): Promise<Product>;
  update(id: string, dto: UpdateProductDTO): Promise<Product | null>;
  delete(id: string): Promise<boolean>;
}
