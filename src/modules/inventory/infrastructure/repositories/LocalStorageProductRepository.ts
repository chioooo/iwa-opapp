import type { IProductRepository } from '../../domain/repositories';
import type { Product, CreateProductDTO, UpdateProductDTO, InventoryLocation } from '../../domain/entities';

const STORAGE_KEY = 'iwa_products_v3';

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
      // Bebidas
      { id: 'product_1', name: 'Agua Mineral 500ml', code: 'SKU-001', stockWarehouse: 500, stockRoute: 48, price: 12.00, category: 'Bebidas', unitType: 'pack', unitQuantity: 24, createdAt: now, updatedAt: now },
      { id: 'product_2', name: 'Refresco Cola 2L', code: 'SKU-002', stockWarehouse: 320, stockRoute: 24, price: 28.50, category: 'Bebidas', unitType: 'pack', unitQuantity: 6, createdAt: now, updatedAt: now },
      { id: 'product_3', name: 'Jugo de Naranja 1L', code: 'SKU-003', stockWarehouse: 180, stockRoute: 0, price: 22.00, category: 'Bebidas', unitType: 'lt', createdAt: now, updatedAt: now },
      // Snacks
      { id: 'product_4', name: 'Galletas Surtidas', code: 'SKU-004', stockWarehouse: 250, stockRoute: 36, price: 15.75, category: 'Snacks', unitType: 'pza', createdAt: now, updatedAt: now },
      { id: 'product_5', name: 'Papas Fritas 150g', code: 'SKU-005', stockWarehouse: 400, stockRoute: 60, price: 22.00, category: 'Snacks', unitType: 'bolsa', createdAt: now, updatedAt: now },
      { id: 'product_6', name: 'Chocolates Surtidos', code: 'SKU-006', stockWarehouse: 150, stockRoute: 0, price: 35.00, category: 'Snacks', unitType: 'caja', createdAt: now, updatedAt: now },
      // Limpieza
      { id: 'product_7', name: 'Jabón Líquido 1L', code: 'SKU-007', stockWarehouse: 120, stockRoute: 18, price: 45.00, category: 'Limpieza', unitType: 'lt', createdAt: now, updatedAt: now },
      { id: 'product_8', name: 'Detergente 3kg', code: 'SKU-008', stockWarehouse: 80, stockRoute: 0, price: 85.00, category: 'Limpieza', unitType: 'kg', createdAt: now, updatedAt: now },
      { id: 'product_9', name: 'Cloro 1L', code: 'SKU-009', stockWarehouse: 200, stockRoute: 0, price: 18.50, category: 'Limpieza', unitType: 'lt', createdAt: now, updatedAt: now },
      // Abarrotes
      { id: 'product_10', name: 'Arroz 1kg', code: 'SKU-010', stockWarehouse: 300, stockRoute: 30, price: 25.00, category: 'Abarrotes', unitType: 'kg', createdAt: now, updatedAt: now },
      { id: 'product_11', name: 'Frijol 1kg', code: 'SKU-011', stockWarehouse: 250, stockRoute: 0, price: 32.00, category: 'Abarrotes', unitType: 'kg', createdAt: now, updatedAt: now },
      { id: 'product_12', name: 'Aceite Vegetal 1L', code: 'SKU-012', stockWarehouse: 180, stockRoute: 12, price: 42.00, category: 'Abarrotes', unitType: 'lt', createdAt: now, updatedAt: now },
      { id: 'product_13', name: 'Azúcar 1kg', code: 'SKU-013', stockWarehouse: 220, stockRoute: 0, price: 28.00, category: 'Abarrotes', unitType: 'kg', createdAt: now, updatedAt: now },
      { id: 'product_14', name: 'Sal 1kg', code: 'SKU-014', stockWarehouse: 150, stockRoute: 0, price: 12.00, category: 'Abarrotes', unitType: 'kg', createdAt: now, updatedAt: now },
      // Lácteos
      { id: 'product_15', name: 'Leche 1L', code: 'SKU-015', stockWarehouse: 0, stockRoute: 0, price: 24.00, category: 'Lácteos', unitType: 'lt', createdAt: now, updatedAt: now },
      { id: 'product_16', name: 'Yogurt 1L', code: 'SKU-016', stockWarehouse: 15, stockRoute: 0, price: 35.00, category: 'Lácteos', unitType: 'lt', createdAt: now, updatedAt: now },
      { id: 'product_17', name: 'Queso Fresco 500g', code: 'SKU-017', stockWarehouse: 45, stockRoute: 0, price: 55.00, category: 'Lácteos', unitType: 'kg', createdAt: now, updatedAt: now },
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
    // Filtrar productos que tienen stock en la ubicación especificada
    if (location === 'route') {
      return products.filter(product => product.stockRoute > 0);
    }
    return products.filter(product => product.stockWarehouse > 0);
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
      stockWarehouse: dto.stockWarehouse,
      stockRoute: dto.stockRoute,
      price: dto.price,
      category: dto.category,
      unitType: dto.unitType,
      unitQuantity: dto.unitQuantity,
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
