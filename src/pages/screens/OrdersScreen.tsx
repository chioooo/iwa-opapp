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
      <div className="p-4 sm:p-6 landscape:py-2">
        <div className="max-w-[390px] landscape:max-w-full mx-auto landscape:flex landscape:flex-row landscape:gap-4 landscape:items-start">
          {/* Panel izquierdo en landscape: Resumen + Métricas */}
          <div className="landscape:w-1/3 landscape:flex-shrink-0">
            {/* Resumen */}
            <div className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-2xl shadow-lg p-4 sm:p-6 mb-4 landscape:mb-3 text-white">
              <div className="flex items-center gap-2 mb-2 landscape:mb-1">
                <ClipboardList className="w-5 h-5 landscape:w-4 landscape:h-4" />
                <h2 className="text-sm sm:text-base font-semibold">Resumen de pedidos</h2>
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl sm:text-4xl landscape:text-2xl font-bold">
                  {summary?.totalOrders || 0}
                </span>
                <span className="text-white/80 text-xs sm:text-sm">pedidos totales</span>
              </div>
              <div className="flex items-center gap-1 text-xs sm:text-sm text-white/90">
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>${(summary?.totalAmount || 0).toFixed(2)} en ventas</span>
              </div>
            </div>

            {/* Métricas rápidas */}
            <div className="grid grid-cols-2 gap-3 mb-4 landscape:mb-3">
              <div className="bg-white rounded-xl shadow-md p-3 sm:p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                  <span className="text-xs sm:text-sm text-gray-500">Pendientes</span>
                </div>
                <p className="text-gray-800 text-xl sm:text-2xl font-bold">
                  {summary?.pendingOrders || 0}
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-3 sm:p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-secondary)]" />
                  <span className="text-xs sm:text-sm text-gray-500">Confirmados</span>
                </div>
                <p className="text-gray-800 text-xl sm:text-2xl font-bold">
                  {summary?.confirmedOrders || 0}
                </p>
              </div>
            </div>

            {/* Botón nuevo pedido - visible en landscape en panel izquierdo */}
            <button
              onClick={() => setShowNewOrderModal(true)}
              className="hidden landscape:flex w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white py-3 rounded-xl shadow-lg transition-transform active:scale-[0.98] items-center justify-center gap-2 text-sm font-semibold"
            >
              <Plus className="w-4 h-4" />
              Nuevo pedido
            </button>
          </div>

          {/* Panel derecho en landscape: Lista de pedidos */}
          <div className="landscape:flex-1 landscape:overflow-y-auto landscape:max-h-[calc(100vh-140px)]">
            <div className="mb-4 landscape:mb-2">
              <h3 className="text-gray-800 mb-3 text-base sm:text-lg font-semibold">
                Pedidos recientes
              </h3>
              
              {loading ? (
                <div className="text-center py-6 text-gray-500">Cargando...</div>
              ) : orders.length === 0 ? (
                <div className="text-center py-6">
                  <ClipboardList className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">No hay pedidos registrados</p>
                  <p className="text-xs text-gray-400">Crea tu primer pedido</p>
                </div>
              ) : (
                <div className="space-y-3 landscape:space-y-2 landscape:grid landscape:grid-cols-2 landscape:gap-3 landscape:space-y-0">
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

            {/* Botón nuevo pedido - solo visible en portrait */}
            <button
              onClick={() => setShowNewOrderModal(true)}
              className="landscape:hidden w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white py-4 rounded-xl shadow-lg transition-transform active:scale-[0.98] flex items-center justify-center gap-2 text-base font-semibold"
            >
              <Plus className="w-5 h-5" />
              Nuevo pedido
            </button>
          </div>
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
