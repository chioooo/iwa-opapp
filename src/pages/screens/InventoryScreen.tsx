import React, { useState, useEffect } from 'react';
import { ScreenContainer } from '../components/ScreenContainer';
import type { NavScreen } from '../components/BottomNav';
import { Search } from 'lucide-react';
import { useProducts, ProductCard } from '../../modules/inventory';
import type { Product } from '../../modules/inventory';

interface InventoryScreenProps {
  onNavigate: (screen: NavScreen | 'profile') => void;
}

export const InventoryScreen: React.FC<InventoryScreenProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { products, loading, error, searchProducts, getStockStatus } = useProducts();

  useEffect(() => {
    const performSearch = async () => {
      if (searchQuery.trim()) {
        const results = await searchProducts(searchQuery);
        setFilteredProducts(results);
      } else {
        setFilteredProducts(products);
      }
    };
    performSearch();
  }, [searchQuery, products, searchProducts]);

  return (
    <ScreenContainer
      title="Inventario"
      activeScreen="inventory"
      onNavigate={onNavigate}
    >
      <div className="p-6">
        <div className="max-w-[390px] sm:max-w-full mx-auto">
          {/* Búsqueda */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar producto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
              />
            </div>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="text-center py-8 text-gray-500">
              Cargando productos...
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="text-center py-8 text-red-500">
              {error}
            </div>
          )}

          {/* Lista de productos */}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  stockStatus={getStockStatus(product.stock)}
                />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && filteredProducts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No se encontraron productos
            </div>
          )}
        </div>
      </div>
    </ScreenContainer>
  );
};
