import { Order } from 'src/core/domain/entities/order';
import { OrderStatus } from 'src/core/domain/value-objects/order-status';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';

export interface IOrderUseCase {
  findAll(): Promise<Order[]>;
  findById(id: string): Promise<Order | null>;
  findByUserCpf(cpf: string): Promise<Order[]>;
  findOrderByStatus(orderStatus: OrderStatus): Promise<Order[]>;
  create(createOrderDto: CreateOrderDto): Promise<Order>;
  update(updateOrderDto: UpdateOrderDto): Promise<Order>;
  delete(id: string): Promise<void>;
  pay(orderId: string): Promise<Order>;
}
