import type { Order, CreateOrderDTO, UpdateOrderDTO, OrderStatus } from '../../domain/entities';

/**
 * Interface for Order Service (Interface Segregation Principle)
 * Defines business operations for orders
 */
export interface IOrderService {
  getAllOrders(): Promise<Order[]>;
  getOrderById(id: string): Promise<Order | null>;
  getOrdersByClient(clientId: string): Promise<Order[]>;
  createOrder(dto: CreateOrderDTO): Promise<Order>;
  updateOrder(id: string, dto: UpdateOrderDTO): Promise<Order | null>;
  updateOrderStatus(id: string, status: OrderStatus): Promise<Order | null>;
  cancelOrder(id: string): Promise<Order | null>;
  deleteOrder(id: string): Promise<boolean>;
  getOrdersSummary(): Promise<OrdersSummary>;
}

export interface OrdersSummary {
  totalOrders: number;
  pendingOrders: number;
  confirmedOrders: number;
  totalAmount: number;
  todayOrders: number;
}
