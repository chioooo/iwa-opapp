import type { IProductRepository } from '../../domain/repositories';
import type { Product, CreateProductDTO, UpdateProductDTO, InventoryLocation } from '../../domain/entities';

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
    
    const products: Product[] = JSON.parse(data);
    
    // Migrar productos antiguos que no tienen el campo location
    const needsMigration = products.some(p => !p.location);
    if (needsMigration) {
      const migratedProducts = products.map(p => ({
        ...p,
        location: p.location || 'warehouse' as const,
      }));
      this.saveProducts(migratedProducts);
      return migratedProducts;
    }
    
    return products;
  }

  private saveProducts(products: Product[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }

  private initializeDefaultProducts(): void {
    const now = new Date().toISOString();
    const defaultProducts: Product[] = [
      // Productos en Bodega (inventario completo)
      { id: 'product_1', name: 'Agua Mineral 500ml', code: 'SKU-001', stock: 500, price: 12.00, category: 'Bebidas', location: 'warehouse', createdAt: now, updatedAt: now },
      { id: 'product_2', name: 'Refresco Cola 2L', code: 'SKU-002', stock: 320, price: 28.50, category: 'Bebidas', location: 'warehouse', createdAt: now, updatedAt: now },
      { id: 'product_3', name: 'Jugo de Naranja 1L', code: 'SKU-003', stock: 180, price: 22.00, category: 'Bebidas', location: 'warehouse', createdAt: now, updatedAt: now },
      { id: 'product_4', name: 'Galletas Surtidas', code: 'SKU-004', stock: 250, price: 15.75, category: 'Snacks', location: 'warehouse', createdAt: now, updatedAt: now },
      { id: 'product_5', name: 'Papas Fritas 150g', code: 'SKU-005', stock: 400, price: 22.00, category: 'Snacks', location: 'warehouse', createdAt: now, updatedAt: now },
      { id: 'product_6', name: 'Chocolates Surtidos', code: 'SKU-006', stock: 150, price: 35.00, category: 'Snacks', location: 'warehouse', createdAt: now, updatedAt: now },
      { id: 'product_7', name: 'Jabón Líquido 1L', code: 'SKU-007', stock: 120, price: 45.00, category: 'Limpieza', location: 'warehouse', createdAt: now, updatedAt: now },
      { id: 'product_8', name: 'Detergente 3kg', code: 'SKU-008', stock: 80, price: 85.00, category: 'Limpieza', location: 'warehouse', createdAt: now, updatedAt: now },
      { id: 'product_9', name: 'Cloro 1L', code: 'SKU-009', stock: 200, price: 18.50, category: 'Limpieza', location: 'warehouse', createdAt: now, updatedAt: now },
      { id: 'product_10', name: 'Arroz 1kg', code: 'SKU-010', stock: 300, price: 25.00, category: 'Abarrotes', location: 'warehouse', createdAt: now, updatedAt: now },
      { id: 'product_11', name: 'Frijol 1kg', code: 'SKU-011', stock: 250, price: 32.00, category: 'Abarrotes', location: 'warehouse', createdAt: now, updatedAt: now },
      { id: 'product_12', name: 'Aceite Vegetal 1L', code: 'SKU-012', stock: 180, price: 42.00, category: 'Abarrotes', location: 'warehouse', createdAt: now, updatedAt: now },
      { id: 'product_13', name: 'Azúcar 1kg', code: 'SKU-013', stock: 220, price: 28.00, category: 'Abarrotes', location: 'warehouse', createdAt: now, updatedAt: now },
      { id: 'product_14', name: 'Sal 1kg', code: 'SKU-014', stock: 150, price: 12.00, category: 'Abarrotes', location: 'warehouse', createdAt: now, updatedAt: now },
      { id: 'product_15', name: 'Leche 1L', code: 'SKU-015', stock: 0, price: 24.00, category: 'Lácteos', location: 'warehouse', createdAt: now, updatedAt: now },
      { id: 'product_16', name: 'Yogurt 1L', code: 'SKU-016', stock: 15, price: 35.00, category: 'Lácteos', location: 'warehouse', createdAt: now, updatedAt: now },
      { id: 'product_17', name: 'Queso Fresco 500g', code: 'SKU-017', stock: 45, price: 55.00, category: 'Lácteos', location: 'warehouse', createdAt: now, updatedAt: now },
      // Productos en Ruta (cargados en el vehículo)
      { id: 'product_18', name: 'Agua Mineral 500ml', code: 'SKU-001-R', stock: 48, price: 12.00, category: 'Bebidas', location: 'route', createdAt: now, updatedAt: now },
      { id: 'product_19', name: 'Refresco Cola 2L', code: 'SKU-002-R', stock: 24, price: 28.50, category: 'Bebidas', location: 'route', createdAt: now, updatedAt: now },
      { id: 'product_20', name: 'Galletas Surtidas', code: 'SKU-004-R', stock: 36, price: 15.75, category: 'Snacks', location: 'route', createdAt: now, updatedAt: now },
      { id: 'product_21', name: 'Papas Fritas 150g', code: 'SKU-005-R', stock: 60, price: 22.00, category: 'Snacks', location: 'route', createdAt: now, updatedAt: now },
      { id: 'product_22', name: 'Jabón Líquido 1L', code: 'SKU-007-R', stock: 18, price: 45.00, category: 'Limpieza', location: 'route', createdAt: now, updatedAt: now },
      { id: 'product_23', name: 'Arroz 1kg', code: 'SKU-010-R', stock: 30, price: 25.00, category: 'Abarrotes', location: 'route', createdAt: now, updatedAt: now },
      { id: 'product_24', name: 'Aceite Vegetal 1L', code: 'SKU-012-R', stock: 12, price: 42.00, category: 'Abarrotes', location: 'route', createdAt: now, updatedAt: now },
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

  async getByLocation(location: InventoryLocation): Promise<Product[]> {
    const products = this.getProducts();
    return products.filter(product => product.location === location);
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
      location: dto.location,
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
