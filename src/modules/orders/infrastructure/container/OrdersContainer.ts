import { OrderService } from '../../application/services';
import { LocalStorageOrderRepository, MockClientRepository } from '../repositories';
import type { IOrderService } from '../../application/services';
import type { IClientRepository } from '../../domain/repositories';

/**
 * Dependency Injection Container
 * Open/Closed Principle: Easy to swap implementations
 */
class OrdersContainer {
  private static orderService: IOrderService | null = null;
  private static clientRepository: IClientRepository | null = null;

  static getOrderService(): IOrderService {
    if (!this.orderService) {
      const orderRepository = new LocalStorageOrderRepository();
      this.orderService = new OrderService(orderRepository);
    }
    return this.orderService;
  }

  static getClientRepository(): IClientRepository {
    if (!this.clientRepository) {
      this.clientRepository = new MockClientRepository();
    }
    return this.clientRepository;
  }

  static reset(): void {
    this.orderService = null;
    this.clientRepository = null;
  }
}

export { OrdersContainer };
