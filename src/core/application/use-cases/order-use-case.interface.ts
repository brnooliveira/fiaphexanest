import { Order } from 'src/core/domain/entities/order';
import { OrderStatus } from 'src/core/domain/value-objects/order-status';

export interface IOrderUseCase {
  findAll(): Promise<Order[]>;
  findById(id: string): Promise<Order | null>;
  findOrderByStatus(orderStatus: OrderStatus): Promise<Order[]>;
  create(order: Order): Promise<Order>;
  update(id: string, product: Order): Promise<Order>;
  delete(id: string): Promise<void>;
  pay(): Promise<Order>;
}
