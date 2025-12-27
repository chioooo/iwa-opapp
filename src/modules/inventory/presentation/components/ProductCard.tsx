import React, { useState } from 'react';
import { Package, ChevronDown } from 'lucide-react';
import type { Product, StockStatus, InventoryLocation, UnitType, PendingDelivery } from '../../domain/entities';

const UNIT_TYPE_LABELS: Record<UnitType, string> = {
  pza: 'Pza',
  pack: 'Pack',
  kg: 'Kg',
  lt: 'Lt',
  caja: 'Caja',
  bolsa: 'Bolsa',
};

interface ProductCardProps {
  product: Product;
  stockStatus: StockStatus;
  location: InventoryLocation;
  pendingDeliveries?: PendingDelivery[];
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
  pendingDeliveries = [],
  onEdit,
  onDelete,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const showDeliveries = location === 'route' && pendingDeliveries.length > 0;
  const statusConfig = STOCK_STATUS_CONFIG[stockStatus];
  const currentStock = location === 'route' ? product.stockRoute : product.stockWarehouse;
  const stockLabel = location === 'route' ? 'En Ruta' : 'En Bodega';
  
  const unitLabel = UNIT_TYPE_LABELS[product.unitType] || product.unitType;
  const unitDisplay = product.unitQuantity 
    ? `${unitLabel} ${product.unitQuantity} pzs` 
    : unitLabel;

  return (
    <div className="bg-white rounded-xl shadow-sm p-3">
      <div className="flex items-start gap-2 mb-2">
        <div className="w-9 h-9 bg-[#F6A01615] rounded-lg flex items-center justify-center flex-shrink-0">
          <Package className="w-4 h-4 text-[var(--color-tertiary)]" strokeWidth={2.5} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-gray-800 leading-tight" style={{ fontSize: '14px', fontWeight: '600' }}>
            {product.name}
          </h3>
          <p className="text-xs text-gray-500">{product.code} • {product.category}</p>
        </div>
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] ${statusConfig.color} flex-shrink-0`}
          style={{ fontWeight: '600' }}
        >
          {statusConfig.label}
        </span>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <div>
          <p className="text-[10px] text-gray-500">Precio</p>
          <p className="text-gray-800" style={{ fontSize: '14px', fontWeight: '700' }}>
            ${product.price.toFixed(2)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-gray-500">Unidad</p>
          <p className="text-gray-800" style={{ fontSize: '12px', fontWeight: '600' }}>
            {unitDisplay}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-gray-500">{stockLabel}</p>
          <p className="text-gray-800" style={{ fontSize: '14px', fontWeight: '700' }}>
            {currentStock}
          </p>
        </div>
      </div>

      {showDeliveries && (
        <div className="mt-2 border-t border-gray-100">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between py-2 text-xs text-gray-600 hover:text-gray-800"
          >
            <span style={{ fontWeight: '500' }}>Pedidos ({pendingDeliveries.length})</span>
            <ChevronDown 
              className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
            />
          </button>
          {isExpanded && (
            <div className="pb-2 space-y-1">
              {pendingDeliveries.map((delivery, idx) => (
                <div key={idx} className="flex justify-between text-xs">
                  <span className="text-gray-600">{delivery.clientName}</span>
                  <span className="text-gray-800" style={{ fontWeight: '600' }}>
                    {delivery.quantity} {delivery.quantity === 1 ? 'pz' : 'pzs'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
