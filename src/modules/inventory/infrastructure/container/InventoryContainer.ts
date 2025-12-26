import type { IProductRepository } from '../../domain/repositories';
import type { IProductService } from '../../application/services';
import { LocalStorageProductRepository } from '../repositories';
import { ProductService } from '../../application/services';

/**
 * Dependency Injection Container for Inventory Module
 * Single Responsibility: Manages dependency creation and injection
 * Dependency Inversion: Provides abstractions to consumers
 */
export class InventoryContainer {
  private static productRepository: IProductRepository | null = null;
  private static productService: IProductService | null = null;

  static getProductRepository(): IProductRepository {
    if (!this.productRepository) {
      this.productRepository = new LocalStorageProductRepository();
    }
    return this.productRepository;
  }

  static getProductService(): IProductService {
    if (!this.productService) {
      this.productService = new ProductService(this.getProductRepository());
    }
    return this.productService;
  }

  static reset(): void {
    this.productRepository = null;
    this.productService = null;
  }
}
