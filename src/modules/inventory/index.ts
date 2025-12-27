// Domain
export type { Product, CreateProductDTO, UpdateProductDTO, StockStatus, InventoryLocation, UnitType, PendingDelivery } from './domain/entities';
export type { IProductRepository } from './domain/repositories';

// Application
export type { IProductService, InventorySummary } from './application/services';
export { ProductService } from './application/services';

// Infrastructure
export { LocalStorageProductRepository } from './infrastructure/repositories';
export { InventoryContainer } from './infrastructure/container';

// Presentation
export { useProducts } from './presentation/hooks';
export { ProductCard, InventoryTabs } from './presentation/components';
