import { Order } from 'src/core/domain/entities/order';
import { OrderStatus } from 'src/core/domain/value-objects/order-status';
import { IOrderUseCase } from './order-use-case.interface';
import { IOrderRepository } from 'src/core/domain/repositories/order-repository.interface';
import { Inject } from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';

export class OrderUseCase implements IOrderUseCase {
  constructor(@Inject('OrderRepository') private readonly orderRepository: IOrderRepository) {}

  findAll(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }

  findById(id: string): Promise<Order | null> {
    return this.orderRepository.findById(id);
  }

  findOrderByStatus(orderStatus: OrderStatus): Promise<Order[]> {
    return this.orderRepository.findOrderByStatus(orderStatus);
  }

  create(createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderRepository.create(createOrderDto);
  }

  update(updateOrderDto: UpdateOrderDto): Promise<Order> {
    return this.orderRepository.update(updateOrderDto);
  }

  delete(id: string): Promise<void> {
    return this.orderRepository.delete(id);
  }

  pay(): Promise<Order> {
    throw new Error('Method not implemented.');
  }
}

