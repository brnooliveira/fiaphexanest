import { Order } from 'src/core/domain/entities/order';
import { OrderStatus } from 'src/core/domain/value-objects/order-status';

export interface IOrderRepository {
  findAll(): Promise<Order[]>;
  findById(id: string): Promise<Order | null>;
  findOrderByStatus(orderStatus: OrderStatus): Promise<Order[]>;
  create(order: Order): Promise<Order>;
  update(id: string, order: Order): Promise<Order>;
  delete(id: string): Promise<void>;
}

