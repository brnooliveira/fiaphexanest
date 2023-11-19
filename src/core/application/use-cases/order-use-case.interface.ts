import { DeleteResult } from 'typeorm';
import { Order } from '../../domain/entities/order';
import { OrderStatus } from '../../domain/value-objects/order-status';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';

export interface IOrderUseCase {
  findAll(): Promise<Order[]>;
  findById(id: string): Promise<Order | null>;
  findByUserCpf(cpf: string): Promise<Order[]>;
  findOrderByStatus(orderStatus: OrderStatus): Promise<Order[]>;
  create(createOrderDto: CreateOrderDto): Promise<Order>;
  update(updateOrderDto: UpdateOrderDto): Promise<Order>;
  delete(id: string): Promise<DeleteResult>;
  pay(orderId: string): Promise<Order>;
}
