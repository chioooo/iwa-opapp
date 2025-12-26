import type { IOrderRepository } from '../../domain/repositories';
import type { Order, CreateOrderDTO, UpdateOrderDTO } from '../../domain/entities';

const STORAGE_KEY = 'iwa_orders';

/**
 * LocalStorage implementation of IOrderRepository
 * Single Responsibility: Only handles order persistence
 */
export class LocalStorageOrderRepository implements IOrderRepository {
  private generateId(): string {
    return `order_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  }

  private getOrders(): Order[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveOrders(orders: Order[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }

  async getAll(): Promise<Order[]> {
    return this.getOrders();
  }

  async getById(id: string): Promise<Order | null> {
    const orders = this.getOrders();
    return orders.find(order => order.id === id) || null;
  }

  async getByClientId(clientId: string): Promise<Order[]> {
    const orders = this.getOrders();
    return orders.filter(order => order.clientId === clientId);
  }

  async create(dto: CreateOrderDTO): Promise<Order> {
    const orders = this.getOrders();
    const now = new Date().toISOString();
    
    const totalAmount = dto.items.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );

    const newOrder: Order = {
      id: this.generateId(),
      clientId: dto.clientId,
      clientName: dto.clientName,
      items: dto.items,
      totalAmount,
      status: 'pending',
      scheduledDate: dto.scheduledDate,
      notes: dto.notes || '',
      createdAt: now,
      updatedAt: now,
    };

    orders.push(newOrder);
    this.saveOrders(orders);
    return newOrder;
  }

  async update(id: string, dto: UpdateOrderDTO): Promise<Order | null> {
    const orders = this.getOrders();
    const index = orders.findIndex(order => order.id === id);
    
    if (index === -1) return null;

    const updatedOrder: Order = {
      ...orders[index],
      ...dto,
      updatedAt: new Date().toISOString(),
    };

    if (dto.items) {
      updatedOrder.totalAmount = dto.items.reduce(
        (sum, item) => sum + item.quantity * item.unitPrice,
        0
      );
    }

    orders[index] = updatedOrder;
    this.saveOrders(orders);
    return updatedOrder;
  }

  async delete(id: string): Promise<boolean> {
    const orders = this.getOrders();
    const index = orders.findIndex(order => order.id === id);
    
    if (index === -1) return false;

    orders.splice(index, 1);
    this.saveOrders(orders);
    return true;
  }
}
