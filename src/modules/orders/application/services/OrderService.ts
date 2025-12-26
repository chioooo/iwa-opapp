import type { IOrderService, OrdersSummary } from './IOrderService';
import type { IOrderRepository } from '../../domain/repositories';
import type { Order, CreateOrderDTO, UpdateOrderDTO, OrderStatus } from '../../domain/entities';

/**
 * Order Service Implementation
 * Single Responsibility: Business logic for orders
 * Dependency Inversion: Depends on IOrderRepository abstraction
 */
export class OrderService implements IOrderService {
  private orderRepository: IOrderRepository;

  constructor(orderRepository: IOrderRepository) {
    this.orderRepository = orderRepository;
  }

  async getAllOrders(): Promise<Order[]> {
    const orders = await this.orderRepository.getAll();
    return orders.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getOrderById(id: string): Promise<Order | null> {
    return this.orderRepository.getById(id);
  }

  async getOrdersByClient(clientId: string): Promise<Order[]> {
    return this.orderRepository.getByClientId(clientId);
  }

  async createOrder(dto: CreateOrderDTO): Promise<Order> {
    const itemCount = dto.items ? dto.items.length : 0;
    if (itemCount === 0) {
      throw new Error(`El pedido debe tener al menos un producto (recibido: ${itemCount})`);
    }
    if (!dto.clientId) {
      throw new Error('Debe seleccionar un cliente');
    }
    if (!dto.scheduledDate) {
      throw new Error('Debe seleccionar una fecha de entrega');
    }
    return this.orderRepository.create(dto);
  }

  async updateOrder(id: string, dto: UpdateOrderDTO): Promise<Order | null> {
    const existingOrder = await this.orderRepository.getById(id);
    if (!existingOrder) {
      throw new Error('Pedido no encontrado');
    }
    if (existingOrder.status === 'cancelled' || existingOrder.status === 'delivered') {
      throw new Error('No se puede modificar un pedido cancelado o entregado');
    }
    return this.orderRepository.update(id, dto);
  }

  async updateOrderStatus(id: string, status: OrderStatus): Promise<Order | null> {
    const existingOrder = await this.orderRepository.getById(id);
    if (!existingOrder) {
      throw new Error('Pedido no encontrado');
    }
    return this.orderRepository.update(id, { status });
  }

  async cancelOrder(id: string): Promise<Order | null> {
    return this.updateOrderStatus(id, 'cancelled');
  }

  async deleteOrder(id: string): Promise<boolean> {
    return this.orderRepository.delete(id);
  }

  async getOrdersSummary(): Promise<OrdersSummary> {
    const orders = await this.orderRepository.getAll();
    const today = new Date().toISOString().split('T')[0];

    return {
      totalOrders: orders.length,
      pendingOrders: orders.filter(o => o.status === 'pending').length,
      confirmedOrders: orders.filter(o => o.status === 'confirmed').length,
      totalAmount: orders.reduce((sum, o) => sum + o.totalAmount, 0),
      todayOrders: orders.filter(o => o.createdAt.startsWith(today)).length,
    };
  }
}
