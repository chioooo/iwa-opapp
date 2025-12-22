import React, { useState } from 'react';
import { ScreenContainer } from '../components/ScreenContainer';
import type {NavScreen} from '../components/BottomNav';
import { Search, Package } from 'lucide-react';

interface InventoryScreenProps {
  onNavigate: (screen: NavScreen | 'profile') => void;
}

export const InventoryScreen: React.FC<InventoryScreenProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const products = [
    { id: 1, name: 'Producto A', code: 'SKU-001', stock: 150, price: 25.50, category: 'Categoría 1' },
    { id: 2, name: 'Producto B', code: 'SKU-002', stock: 85, price: 42.00, category: 'Categoría 2' },
    { id: 3, name: 'Producto C', code: 'SKU-003', stock: 220, price: 18.75, category: 'Categoría 1' },
    { id: 4, name: 'Producto D', code: 'SKU-004', stock: 12, price: 95.00, category: 'Categoría 3' },
    { id: 5, name: 'Producto E', code: 'SKU-005', stock: 0, price: 33.25, category: 'Categoría 2' },
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: 'Agotado', color: 'bg-red-100 text-red-700' };
    if (stock < 20) return { label: 'Bajo', color: 'bg-yellow-100 text-yellow-700' };
    return { label: 'Disponible', color: 'bg-green-100 text-green-700' };
  };

  return (
    <ScreenContainer
      title="Inventario"
      activeScreen="inventory"
      onNavigate={onNavigate}
      onProfileClick={() => onNavigate('profile')}
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

          {/* Lista de productos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {filteredProducts.map((product) => {
              const stockStatus = getStockStatus(product.stock);

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-md p-4"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 bg-[#F6A01615] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Package className="w-6 h-6 text-[var(--color-tertiary)]" strokeWidth={2.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-gray-800 mb-1" style={{ fontSize: '16px', fontWeight: '600' }}>
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500">{product.code}</p>
                      <p className="text-sm text-gray-500">{product.category}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${stockStatus.color} flex-shrink-0`}
                      style={{ fontWeight: '600' }}
                    >
                      {stockStatus.label}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Precio</p>
                      <p className="text-gray-800" style={{ fontSize: '18px', fontWeight: '700' }}>
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">Stock</p>
                      <p className="text-gray-800" style={{ fontSize: '18px', fontWeight: '700' }}>
                        {product.stock}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
};
