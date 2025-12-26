import { useState, useEffect, useCallback } from 'react';
import type { Product, CreateProductDTO, UpdateProductDTO, InventoryLocation } from '../../domain/entities';
import type { InventorySummary } from '../../application/services';
import { InventoryContainer } from '../../infrastructure/container';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [summary, setSummary] = useState<InventorySummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const productService = InventoryContainer.getProductService();

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [productsData, summaryData] = await Promise.all([
        productService.getAllProducts(),
        productService.getInventorySummary(),
      ]);
      setProducts(productsData);
      setSummary(summaryData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudieron cargar los productos. Verifica tu conexión o inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  }, [productService]);

  const searchProducts = useCallback(async (query: string, location?: InventoryLocation): Promise<Product[]> => {
    try {
      return await productService.searchProducts(query, location);
    } catch (err) {
      console.error(`Error searching products with query "${query}":`, err);
      return [];
    }
  }, [productService]);

  const getProductsByLocation = useCallback(async (location: InventoryLocation): Promise<Product[]> => {
    try {
      return await productService.getProductsByLocation(location);
    } catch (err) {
      console.error(`Error getting products by location "${location}":`, err);
      return [];
    }
  }, [productService]);

  const createProduct = useCallback(async (dto: CreateProductDTO): Promise<Product> => {
    const newProduct = await productService.createProduct(dto);
    await loadProducts();
    return newProduct;
  }, [productService, loadProducts]);

  const updateProduct = useCallback(async (id: string, dto: UpdateProductDTO): Promise<Product | null> => {
    const updatedProduct = await productService.updateProduct(id, dto);
    await loadProducts();
    return updatedProduct;
  }, [productService, loadProducts]);

  const updateStock = useCallback(async (id: string, quantity: number): Promise<Product | null> => {
    const updatedProduct = await productService.updateStock(id, quantity);
    await loadProducts();
    return updatedProduct;
  }, [productService, loadProducts]);

  const deleteProduct = useCallback(async (id: string): Promise<boolean> => {
    const result = await productService.deleteProduct(id);
    await loadProducts();
    return result;
  }, [productService, loadProducts]);

  const getStockStatus = useCallback((stock: number) => {
    return productService.getStockStatus(stock);
  }, [productService]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return {
    products,
    summary,
    loading,
    error,
    searchProducts,
    getProductsByLocation,
    createProduct,
    updateProduct,
    updateStock,
    deleteProduct,
    getStockStatus,
    refresh: loadProducts,
  };
}
