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
    <div className="bg-white rounded-2xl shadow-md p-4 transition-transform active:scale-[0.98]">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-gray-800 font-semibold truncate">{order.clientName}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.bgColor} ${statusConfig.textColor}`}>
          {statusConfig.label}
        </span>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
        <Clock className="w-4 h-4" />
        <span>{order.items.length} producto{order.items.length !== 1 ? 's' : ''}</span>
      </div>

      {order.items.slice(0, 2).map(item => (
        <div key={item.productId} className="flex justify-between text-sm text-gray-600 mb-1">
          <span>{item.quantity}x {item.productName}</span>
          <span>${(item.quantity * item.unitPrice).toFixed(2)}</span>
        </div>
      ))}
      {order.items.length > 2 && (
        <p className="text-sm text-gray-400">+{order.items.length - 2} más...</p>
      )}

      <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100">
        <span className="text-xl font-bold text-gray-800">${order.totalAmount.toFixed(2)}</span>
        <div className="flex gap-2">
          {canAdvanceStatus && onStatusChange && (
            <button
              onClick={handleNextStatus}
              className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg text-sm font-semibold transition-transform active:scale-95"
            >
              {order.status === 'pending' ? 'Confirmar' : 'Entregar'}
            </button>
          )}
          {onViewDetails && (
            <button
              onClick={() => onViewDetails(order)}
              className="p-2 bg-gray-100 text-gray-600 rounded-lg transition-transform active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
