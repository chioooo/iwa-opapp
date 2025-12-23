import { useState, useEffect, useCallback } from 'react';
import type { Order, CreateOrderDTO, OrderStatus } from '../../domain/entities';
import type { OrdersSummary } from '../../application/services';
import { OrdersContainer } from '../../infrastructure/container/OrdersContainer';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [summary, setSummary] = useState<OrdersSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const orderService = OrdersContainer.getOrderService();

  const loadOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [ordersData, summaryData] = await Promise.all([
        orderService.getAllOrders(),
        orderService.getOrdersSummary(),
      ]);
      setOrders(ordersData);
      setSummary(summaryData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar pedidos');
    } finally {
      setLoading(false);
    }
  }, [orderService]);

  const createOrder = useCallback(async (dto: CreateOrderDTO): Promise<Order> => {
    const newOrder = await orderService.createOrder(dto);
    await loadOrders();
    return newOrder;
  }, [orderService, loadOrders]);

  const updateOrderStatus = useCallback(async (id: string, status: OrderStatus): Promise<void> => {
    await orderService.updateOrderStatus(id, status);
    await loadOrders();
  }, [orderService, loadOrders]);

  const cancelOrder = useCallback(async (id: string): Promise<void> => {
    await orderService.cancelOrder(id);
    await loadOrders();
  }, [orderService, loadOrders]);

  const deleteOrder = useCallback(async (id: string): Promise<void> => {
    await orderService.deleteOrder(id);
    await loadOrders();
  }, [orderService, loadOrders]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return {
    orders,
    summary,
    loading,
    error,
    createOrder,
    updateOrderStatus,
    cancelOrder,
    deleteOrder,
    refresh: loadOrders,
  };
}
