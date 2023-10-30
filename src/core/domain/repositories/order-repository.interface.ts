import { CreateOrderDto, UpdateOrderDto } from 'src/core/application/dtos/order.dto';
import { Order } from 'src/core/domain/entities/order';
import { OrderStatus } from '../value-objects/order-status';

export interface IOrderRepository {
  findAll(): Promise<Order[]>;
  findById(id: string): Promise<Order | null>;
  findByUserCpf(cpf: string): Promise<Order[] | null>;
  findOrderByStatus(orderStatus: OrderStatus): Promise<Order[]>;
  create(createOrderDto: CreateOrderDto): Promise<Order>;
  update(updateOrderDto: UpdateOrderDto): Promise<Order>;
  delete(id: string): Promise<void>;
}

