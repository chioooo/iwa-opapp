import React from 'react';
import { Package } from 'lucide-react';
import type { Product, StockStatus, InventoryLocation } from '../../domain/entities';

interface ProductCardProps {
  product: Product;
  stockStatus: StockStatus;
  location: InventoryLocation;
  onEdit?: (product: Product) => void;
  onDelete?: (id: string) => void;
}

const STOCK_STATUS_CONFIG: Record<StockStatus, { label: string; color: string }> = {
  available: { label: 'Disponible', color: 'bg-green-100 text-green-700' },
  low: { label: 'Bajo', color: 'bg-yellow-100 text-yellow-700' },
  out_of_stock: { label: 'Agotado', color: 'bg-red-100 text-red-700' },
};

/**
 * ProductCard Component
 * Single Responsibility: Only handles product display
 */
export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  stockStatus,
  location,
  onEdit,
  onDelete,
}) => {
  const statusConfig = STOCK_STATUS_CONFIG[stockStatus];
  const currentStock = location === 'route' ? product.stockRoute : product.stockWarehouse;
  const stockLabel = location === 'route' ? 'En Ruta' : 'En Bodega';

  return (
    <div className="bg-white rounded-2xl shadow-md p-4">
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
          className={`px-3 py-1 rounded-full text-xs ${statusConfig.color} flex-shrink-0`}
          style={{ fontWeight: '600' }}
        >
          {statusConfig.label}
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
          <p className="text-xs text-gray-500 mb-1">{stockLabel}</p>
          <p className="text-gray-800" style={{ fontSize: '18px', fontWeight: '700' }}>
            {currentStock}
          </p>
        </div>
      </div>
    </div>
  );
};
