import { Order } from 'src/core/domain/entities/order';

export interface IOrderPaymentRepository {
  pay(orderId: string): Promise<Order>;
}

