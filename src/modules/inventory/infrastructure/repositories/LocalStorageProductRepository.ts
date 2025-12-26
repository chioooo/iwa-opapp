import type { IProductRepository } from '../../domain/repositories';
import type { Product, CreateProductDTO, UpdateProductDTO } from '../../domain/entities';

const STORAGE_KEY = 'iwa_products';

/**
 * LocalStorage implementation of IProductRepository
 * Single Responsibility: Only handles product persistence
 */
export class LocalStorageProductRepository implements IProductRepository {
  private generateId(): string {
    return `product_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  }

  private getProducts(): Product[] {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      this.initializeDefaultProducts();
      const newData = localStorage.getItem(STORAGE_KEY);
      return newData ? JSON.parse(newData) : [];
    }
    return JSON.parse(data);
  }

  private saveProducts(products: Product[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }

  private initializeDefaultProducts(): void {
    const now = new Date().toISOString();
    const defaultProducts: Product[] = [
      { id: 'product_1', name: 'Producto A', code: 'SKU-001', stock: 150, price: 25.50, category: 'Categoría 1', createdAt: now, updatedAt: now },
      { id: 'product_2', name: 'Producto B', code: 'SKU-002', stock: 85, price: 42.00, category: 'Categoría 2', createdAt: now, updatedAt: now },
      { id: 'product_3', name: 'Producto C', code: 'SKU-003', stock: 220, price: 18.75, category: 'Categoría 1', createdAt: now, updatedAt: now },
      { id: 'product_4', name: 'Producto D', code: 'SKU-004', stock: 12, price: 95.00, category: 'Categoría 3', createdAt: now, updatedAt: now },
      { id: 'product_5', name: 'Producto E', code: 'SKU-005', stock: 0, price: 33.25, category: 'Categoría 2', createdAt: now, updatedAt: now },
    ];
    this.saveProducts(defaultProducts);
  }

  async getAll(): Promise<Product[]> {
    return this.getProducts();
  }

  async getById(id: string): Promise<Product | null> {
    const products = this.getProducts();
    return products.find(product => product.id === id) || null;
  }

  async getByCode(code: string): Promise<Product | null> {
    const products = this.getProducts();
    return products.find(product => product.code === code) || null;
  }

  async getByCategory(category: string): Promise<Product[]> {
    const products = this.getProducts();
    return products.filter(product => product.category === category);
  }

  async search(query: string): Promise<Product[]> {
    const products = this.getProducts();
    const lowerQuery = query.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.code.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery)
    );
  }

  async create(dto: CreateProductDTO): Promise<Product> {
    const products = this.getProducts();
    const now = new Date().toISOString();

    const newProduct: Product = {
      id: this.generateId(),
      name: dto.name,
      code: dto.code,
      stock: dto.stock,
      price: dto.price,
      category: dto.category,
      createdAt: now,
      updatedAt: now,
    };

    products.push(newProduct);
    this.saveProducts(products);
    return newProduct;
  }

  async update(id: string, dto: UpdateProductDTO): Promise<Product | null> {
    const products = this.getProducts();
    const index = products.findIndex(product => product.id === id);

    if (index === -1) return null;

    const updatedProduct: Product = {
      ...products[index],
      ...dto,
      updatedAt: new Date().toISOString(),
    };

    products[index] = updatedProduct;
    this.saveProducts(products);
    return updatedProduct;
  }

  async delete(id: string): Promise<boolean> {
    const products = this.getProducts();
    const index = products.findIndex(product => product.id === id);

    if (index === -1) return false;

    products.splice(index, 1);
    this.saveProducts(products);
    return true;
  }
}
