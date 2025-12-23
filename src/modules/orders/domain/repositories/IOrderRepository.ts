import type { Order, CreateOrderDTO, UpdateOrderDTO } from '../entities';

/**
 * Interface for Order Repository (Dependency Inversion Principle)
 * Defines the contract for data persistence operations
 */
export interface IOrderRepository {
  getAll(): Promise<Order[]>;
  getById(id: string): Promise<Order | null>;
  getByClientId(clientId: string): Promise<Order[]>;
  create(order: CreateOrderDTO): Promise<Order>;
  update(id: string, order: UpdateOrderDTO): Promise<Order | null>;
  delete(id: string): Promise<boolean>;
}
