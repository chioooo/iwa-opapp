export type OrderStatus = 'pending' | 'confirmed' | 'delivered' | 'cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  clientId: string;
  clientName: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  scheduledDate: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderDTO {
  clientId: string;
  clientName: string;
  items: OrderItem[];
  scheduledDate: string;
  notes?: string;
}

export interface UpdateOrderDTO {
  items?: OrderItem[];
  status?: OrderStatus;
  scheduledDate?: string;
  notes?: string;
}
