import React from 'react';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
import type { Order, OrderStatus } from '../../domain/entities';

interface OrderCardProps {
  order: Order;
  onStatusChange?: (id: string, status: OrderStatus) => void;
  onViewDetails?: (order: Order) => void;
}

const STATUS_CONFIG: Record<OrderStatus, { label: string; bgColor: string; textColor: string }> = {
  pending: { label: 'Pendiente', bgColor: 'bg-yellow-100', textColor: 'text-yellow-700' },
  confirmed: { label: 'Confirmado', bgColor: 'bg-blue-100', textColor: 'text-blue-700' },
  delivered: { label: 'Entregado', bgColor: 'bg-green-100', textColor: 'text-green-700' },
  cancelled: { label: 'Cancelado', bgColor: 'bg-red-100', textColor: 'text-red-700' },
};

export const OrderCard: React.FC<OrderCardProps> = ({ order, onStatusChange, onViewDetails }) => {
  const statusConfig = STATUS_CONFIG[order.status];
  const formattedDate = new Date(order.scheduledDate).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const handleNextStatus = () => {
    if (!onStatusChange) return;
    
    const statusFlow: Record<OrderStatus, OrderStatus | null> = {
      pending: 'confirmed',
      confirmed: 'delivered',
      delivered: null,
      cancelled: null,
    };
    
    const nextStatus = statusFlow[order.status];
    if (nextStatus) {
      onStatusChange(order.id, nextStatus);
    }
  };

  const canAdvanceStatus = order.status === 'pending' || order.status === 'confirmed';

  return (
    <div className="bg-white rounded-2xl landscape:rounded-xl shadow-md p-4 landscape:p-3 transition-transform active:scale-[0.98]">
      <div className="flex items-start justify-between mb-2 landscape:mb-1">
        <div className="flex-1 min-w-0">
          <h3 className="text-gray-800 font-semibold truncate text-sm landscape:text-xs">{order.clientName}</h3>
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
            <Calendar className="w-3 h-3" />
            <span>{formattedDate}</span>
          </div>
        </div>
        <span className={`px-2 py-0.5 rounded-full text-[10px] landscape:text-[9px] font-semibold ${statusConfig.bgColor} ${statusConfig.textColor}`}>
          {statusConfig.label}
        </span>
      </div>

      <div className="flex items-center gap-1 text-xs text-gray-500 mb-2 landscape:mb-1">
        <Clock className="w-3 h-3" />
        <span>{order.items.length} producto{order.items.length !== 1 ? 's' : ''}</span>
      </div>

      <div className="landscape:hidden">
        {order.items.slice(0, 2).map(item => (
          <div key={item.productId} className="flex justify-between text-xs text-gray-600 mb-0.5">
            <span>{item.quantity}x {item.productName}</span>
            <span>${(item.quantity * item.unitPrice).toFixed(2)}</span>
          </div>
        ))}
        {order.items.length > 2 && (
          <p className="text-xs text-gray-400">+{order.items.length - 2} más...</p>
        )}
      </div>

      <div className="flex items-center justify-between pt-2 landscape:pt-1 mt-2 landscape:mt-1 border-t border-gray-100">
        <span className="text-lg landscape:text-base font-bold text-gray-800">${order.totalAmount.toFixed(2)}</span>
        <div className="flex gap-1">
          {canAdvanceStatus && onStatusChange && (
            <button
              onClick={handleNextStatus}
              className="px-3 landscape:px-2 py-1.5 landscape:py-1 bg-[var(--color-primary)] text-white rounded-lg text-xs font-semibold transition-transform active:scale-95"
            >
              {order.status === 'pending' ? 'Confirmar' : 'Entregar'}
            </button>
          )}
          {onViewDetails && (
            <button
              onClick={() => onViewDetails(order)}
              className="p-1.5 landscape:p-1 bg-gray-100 text-gray-600 rounded-lg transition-transform active:scale-95"
            >
              <ChevronRight className="w-4 h-4 landscape:w-3 landscape:h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
