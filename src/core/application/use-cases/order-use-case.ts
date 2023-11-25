import { Inject } from '@nestjs/common';
import { DeleteResult, In } from 'typeorm';
import { Order } from '../../domain/entities/order';
import { Product } from '../../domain/entities/product';
import { User } from '../../domain/entities/user';
import { IOrderRepository } from '../../domain/repositories/order-repository.interface';
import { IProductRepository } from '../../domain/repositories/product-repository.interface';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';
import { OrderStatus } from '../../domain/value-objects/order-status';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { DomainHelper } from '../helpers/domain.helper';
import { IOrderUseCase } from './order-use-case.interface';
import { ORDER_REPOSITORY, PRODUCT_REPOSITORY, USER_REPOSITORY } from '../constants/tokens';

export class OrderUseCase implements IOrderUseCase {
  constructor(
    @Inject(ORDER_REPOSITORY) private readonly orderRepository: IOrderRepository,
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    @Inject(PRODUCT_REPOSITORY) private readonly productRepository: IProductRepository,
  ) { }

  findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  findById(id: string): Promise<Order | null> {
    return this.orderRepository.findOneBy({ id });
  }

  findByUserCpf(cpf: string): Promise<Order[]> {
    return this.orderRepository.findBy({ user: { cpf } });
  }

  findOrderByStatus(orderStatus: OrderStatus): Promise<Order[]> {
    return this.orderRepository.findBy({ orderStatus });
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {

    const user: User = await this.userRepository.findOneBy({ id: createOrderDto.userId });
    const products: Product[] = await this.productRepository.findBy({ id: In(createOrderDto.productIds) })

    if (user && products) {
      const order: Order = new Order(
        user,
        products
      );
      return this.orderRepository.save(order);
    }
    return null;
  }

  async update(updateOrderDto: UpdateOrderDto): Promise<Order> {

    const order: Order = await this.orderRepository.findOneBy({ id: updateOrderDto.id });

    if (order) {
      DomainHelper.updateEntity(order, updateOrderDto);
      return this.userRepository.save(order);
    }
    return null;
  }

  delete(id: string): Promise<DeleteResult> {
    return this.orderRepository.delete(id);
  }

  async pay(orderId: string): Promise<Order> {

    const order: Order = await this.orderRepository.findOneBy({ id: orderId });

    if (order) {
      order.pay();
      return this.orderRepository.save(order);
    }

    return null;
  }
}

