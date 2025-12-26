// Domain
export type { Product, CreateProductDTO, UpdateProductDTO, StockStatus } from './domain/entities';
export type { IProductRepository } from './domain/repositories';

// Application
export type { IProductService, InventorySummary } from './application/services';
export { ProductService } from './application/services';

// Infrastructure
export { LocalStorageProductRepository } from './infrastructure/repositories';
export { InventoryContainer } from './infrastructure/container';

// Presentation
export { useProducts } from './presentation/hooks';
export { ProductCard } from './presentation/components';
