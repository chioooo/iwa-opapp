import React, { useState, useEffect } from 'react';
import { ScreenContainer } from '../components/ScreenContainer';
import type { NavScreen } from '../components/BottomNav';
import { Search } from 'lucide-react';
import { useProducts, ProductCard, InventoryTabs } from '../../modules/inventory';
import type { Product, InventoryLocation, PendingDelivery } from '../../modules/inventory';

const MOCK_PENDING_DELIVERIES: Record<string, PendingDelivery[]> = {
  'product_1': [
    { clientName: 'La Esquina', quantity: 12 },
    { clientName: 'Central', quantity: 24 },
    { clientName: 'Don Pepe', quantity: 12 },
  ],
  'product_2': [
    { clientName: 'Abarrotes Mary', quantity: 6 },
    { clientName: 'La Esquina', quantity: 12 },
  ],
  'product_4': [
    { clientName: 'Central', quantity: 20 },
    { clientName: 'Tienda Lupita', quantity: 16 },
  ],
  'product_5': [
    { clientName: 'Don Pepe', quantity: 30 },
    { clientName: 'La Esquina', quantity: 20 },
    { clientName: 'Central', quantity: 10 },
  ],
  'product_7': [
    { clientName: 'Abarrotes Mary', quantity: 10 },
    { clientName: 'Tienda Lupita', quantity: 8 },
  ],
  'product_10': [
    { clientName: 'Central', quantity: 15 },
    { clientName: 'Don Pepe', quantity: 15 },
  ],
  'product_12': [
    { clientName: 'La Esquina', quantity: 6 },
    { clientName: 'Abarrotes Mary', quantity: 6 },
  ],
};

interface InventoryScreenProps {
  onNavigate: (screen: NavScreen | 'profile') => void;
}

export const InventoryScreen: React.FC<InventoryScreenProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<InventoryLocation>('route');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { products, loading, error, searchProducts, getStockStatus } = useProducts();

  useEffect(() => {
    const performSearch = async () => {
      const results = await searchProducts(searchQuery, activeTab);
      setFilteredProducts(results);
    };
    performSearch();
  }, [searchQuery, activeTab, products, searchProducts]);

  return (
    <ScreenContainer
      title="Inventario"
      activeScreen="inventory"
      onNavigate={onNavigate}
    >
      <div className="p-6">
        <div className="max-w-[390px] sm:max-w-full mx-auto">
          {/* Pestañas */}
          <InventoryTabs activeTab={activeTab} onTabChange={setActiveTab} />

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
                  stockStatus={getStockStatus(product, activeTab)}
                  location={activeTab}
                  pendingDeliveries={MOCK_PENDING_DELIVERIES[product.id]}
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
