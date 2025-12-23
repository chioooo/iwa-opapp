import React, { useState } from 'react';
import { ScreenContainer } from '../components/ScreenContainer';
import type { NavScreen } from '../components/BottomNav';
import { ClipboardList, TrendingUp, Calendar, Clock, Plus } from 'lucide-react';
import { useOrders, useClients } from '../../modules/orders/presentation/hooks';
import { OrderCard } from '../../modules/orders/presentation/components/OrderCard';
import { NewOrderModal } from '../../modules/orders/presentation/components/NewOrderModal';
import type { OrderStatus } from '../../modules/orders/domain/entities';

interface OrdersScreenProps {
  onNavigate: (screen: NavScreen | 'profile') => void;
}

export const OrdersScreen: React.FC<OrdersScreenProps> = ({ onNavigate }) => {
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const { orders, summary, loading, createOrder, updateOrderStatus } = useOrders();
  const { clients } = useClients();

  const handleStatusChange = async (id: string, status: OrderStatus) => {
    try {
      await updateOrderStatus(id, status);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <ScreenContainer
      title="Pedidos"
      activeScreen="orders"
      onNavigate={onNavigate}
    >
      <div className="p-6">
        <div className="max-w-[390px] mx-auto">
          {/* Resumen */}
          <div className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-2xl shadow-lg p-6 mb-6 text-white">
            <div className="flex items-center gap-2 mb-4">
              <ClipboardList className="w-6 h-6" />
              <h2 style={{ fontSize: '16px', fontWeight: '600' }}>Resumen de pedidos</h2>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span style={{ fontSize: '36px', fontWeight: '700' }}>
                {summary?.totalOrders || 0}
              </span>
              <span className="text-white/80 text-sm">pedidos totales</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-white/90">
              <TrendingUp className="w-4 h-4" />
              <span>${(summary?.totalAmount || 0).toFixed(2)} en ventas</span>
            </div>
          </div>

          {/* Métricas rápidas */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-yellow-500" />
                <span className="text-sm text-gray-500">Pendientes</span>
              </div>
              <p className="text-gray-800" style={{ fontSize: '24px', fontWeight: '700' }}>
                {summary?.pendingOrders || 0}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-[var(--color-secondary)]" />
                <span className="text-sm text-gray-500">Confirmados</span>
              </div>
              <p className="text-gray-800" style={{ fontSize: '24px', fontWeight: '700' }}>
                {summary?.confirmedOrders || 0}
              </p>
            </div>
          </div>

          {/* Lista de pedidos */}
          <div className="mb-4">
            <h3 className="text-gray-800 mb-4" style={{ fontSize: '18px', fontWeight: '600' }}>
              Pedidos recientes
            </h3>
            
            {loading ? (
              <div className="text-center py-8 text-gray-500">Cargando...</div>
            ) : orders.length === 0 ? (
              <div className="text-center py-8">
                <ClipboardList className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No hay pedidos registrados</p>
                <p className="text-sm text-gray-400">Crea tu primer pedido</p>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Botón nuevo pedido */}
          <button
            onClick={() => setShowNewOrderModal(true)}
            className="w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white py-4 rounded-xl shadow-lg transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
            style={{ fontSize: '16px', fontWeight: '600' }}
          >
            <Plus className="w-5 h-5" />
            Nuevo pedido
          </button>
        </div>
      </div>

      <NewOrderModal
        isOpen={showNewOrderModal}
        onClose={() => setShowNewOrderModal(false)}
        onSubmit={createOrder}
        clients={clients}
      />
    </ScreenContainer>
  );
};
