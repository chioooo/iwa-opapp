import type { IProductService, InventorySummary } from './IProductService';
import type { IProductRepository } from '../../domain/repositories';
import type { Product, CreateProductDTO, UpdateProductDTO, StockStatus, InventoryLocation } from '../../domain/entities';

/**
 * Product Service Implementation
 * Single Responsibility: Business logic for products
 * Dependency Inversion: Depends on IProductRepository abstraction
 * Open/Closed: Can be extended without modifying existing code
 */
export class ProductService implements IProductService {
  private productRepository: IProductRepository;
  private readonly LOW_STOCK_THRESHOLD = 20;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async getAllProducts(): Promise<Product[]> {
    const products = await this.productRepository.getAll();
    return products.sort((a, b) => a.name.localeCompare(b.name));
  }

  async getProductById(id: string): Promise<Product | null> {
    return this.productRepository.getById(id);
  }

  async getProductByCode(code: string): Promise<Product | null> {
    return this.productRepository.getByCode(code);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return this.productRepository.getByCategory(category);
  }

  async getProductsByLocation(location: InventoryLocation): Promise<Product[]> {
    const products = await this.productRepository.getByLocation(location);
    return products.sort((a, b) => a.name.localeCompare(b.name));
  }

  async searchProducts(query: string, location?: InventoryLocation): Promise<Product[]> {
    let products: Product[];
    if (!query.trim()) {
      products = location 
        ? await this.productRepository.getByLocation(location)
        : await this.productRepository.getAll();
    } else {
      const searchResults = await this.productRepository.search(query);
      products = location 
        ? searchResults.filter(p => p.location === location)
        : searchResults;
    }
    return products.sort((a, b) => a.name.localeCompare(b.name));
  }

  async createProduct(dto: CreateProductDTO): Promise<Product> {
    if (!dto.name?.trim()) {
      throw new Error('El nombre del producto es requerido');
    }
    if (!dto.code?.trim()) {
      throw new Error('El código del producto es requerido');
    }
    if (dto.price < 0) {
      throw new Error('El precio no puede ser negativo');
    }
    if (dto.stock < 0) {
      throw new Error('El stock no puede ser negativo');
    }

    const existingProduct = await this.productRepository.getByCode(dto.code);
    if (existingProduct) {
      throw new Error(`Ya existe un producto con el código ${dto.code}`);
    }

    return this.productRepository.create(dto);
  }

  async updateProduct(id: string, dto: UpdateProductDTO): Promise<Product | null> {
    const existingProduct = await this.productRepository.getById(id);
    if (!existingProduct) {
      throw new Error('Producto no encontrado');
    }

    if (dto.code && dto.code !== existingProduct.code) {
      const productWithCode = await this.productRepository.getByCode(dto.code);
      if (productWithCode) {
        throw new Error(`Ya existe un producto con el código ${dto.code}`);
      }
    }

    if (dto.price !== undefined && dto.price < 0) {
      throw new Error('El precio no puede ser negativo');
    }
    if (dto.stock !== undefined && dto.stock < 0) {
      throw new Error('El stock no puede ser negativo');
    }

    return this.productRepository.update(id, dto);
  }

  async updateStock(id: string, quantity: number): Promise<Product | null> {
    const product = await this.productRepository.getById(id);
    if (!product) {
      throw new Error('Producto no encontrado');
    }

    const newStock = product.stock + quantity;
    if (newStock < 0) {
      throw new Error(`Stock insuficiente. Stock actual: ${product.stock}, cantidad solicitada: ${Math.abs(quantity)}`);
    }

    return this.productRepository.update(id, { stock: newStock });
  }

  async deleteProduct(id: string): Promise<boolean> {
    const product = await this.productRepository.getById(id);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    return this.productRepository.delete(id);
  }

  async getInventorySummary(): Promise<InventorySummary> {
    const products = await this.productRepository.getAll();
    const categories = [...new Set(products.map(p => p.category))];

    return {
      totalProducts: products.length,
      lowStockProducts: products.filter(p => p.stock > 0 && p.stock < this.LOW_STOCK_THRESHOLD).length,
      outOfStockProducts: products.filter(p => p.stock === 0).length,
      totalValue: products.reduce((sum, p) => sum + (p.price * p.stock), 0),
      categories,
    };
  }

  getStockStatus(stock: number): StockStatus {
    if (stock === 0) return 'out_of_stock';
    if (stock < this.LOW_STOCK_THRESHOLD) return 'low';
    return 'available';
  }
}
