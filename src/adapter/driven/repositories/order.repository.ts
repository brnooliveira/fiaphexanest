import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateOrderDto, UpdateOrderDto } from 'src/core/application/dtos/order.dto';
import { Order } from 'src/core/domain/entities/order';
import { Product } from 'src/core/domain/entities/product';
import { IOrderRepository } from 'src/core/domain/repositories/order-repository.interface';
import { OrderStatus } from 'src/core/domain/value-objects/order-status';

@Injectable()
export class OrderRepository implements IOrderRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(): Promise<Order[]> {
    const res = await this.prisma.order.findMany({
      include: {
        products: true,
        orderPayment: true,
      },
    });
    return this.mapToOrders(res);
  }

  async findById(id: string): Promise<Order | null> {
    const res = await this.prisma.order.findUnique({
      where: { id },
      include: {
        products: true,
        orderPayment: true,
      },
    });
    return this.mapToOrder(res);
  }

  async findOrderByStatus(orderStatus: OrderStatus): Promise<Order[]> {
    const res = await this.prisma.order.findMany({
      where: { orderStatus },
      include: {
        products: true,
        orderPayment: true,
      },
    });
    return this.mapToOrders(res);
  }

  async findByUserCpf(cpf: string): Promise<Order[]> {
    const res = await this.prisma.order.findMany({
      where: { user: { cpf } },
      include: {
        products: true,
        orderPayment: true,
      },
    });
    return this.mapToOrders(res);
  }

  async findByUserId(userId: string): Promise<Order[]> {
    const res = await this.prisma.order.findMany({
      where: { userId: userId },
      include: {
        products: true,
        orderPayment: true,
      },
    });
    return this.mapToOrders(res);
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {

    const productIds = createOrderDto.productIds.map((id) => ({ id }));
    const data = {
      products: { connect: productIds },
      orderPayment: { create: {} }
    };

    if (createOrderDto.userId) {
      data['user'] = { connect: { id: createOrderDto.userId } };
    }

    const res = await this.prisma.order.create({
      data,
      include: {
        products: true
      }
    });

    return this.mapToOrder(res);
  }

  async update(updateOrderDto: UpdateOrderDto): Promise<Order> {

    const res = await this.prisma.order.update({
      where: { id: updateOrderDto.id },
      data: {
        orderStatus: updateOrderDto.orderStatus,
        products: {
          set: updateOrderDto.products.map((product) => ({ id: product.id })),
        },
      },
      include: {
        products: true,
        orderPayment: true,
      },
    });

    return this.mapToOrder(res);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.order.delete({ where: { id } });
  }

  private mapToOrder(res) {
    if (res) {
      const products = res.products.map(res => new Product(res.id, res.name, res.productCategory, res.price.toNumber(), res.description));
      return new Order(res.userId, products, res.orderStatus, res.date, res.id);
    }
    return null;
  }

  private mapToOrders(res) {
    if (Array.isArray(res)) {
      const orders: Order[] = res.map(res => {
        const products = res.products.map(res => new Product(res.id, res.name, res.productCategory, res.price.toNumber(), res.description));
        return new Order(res.userId, products, res.orderStatus, res.date, res.id, res.orderPayment);
      });
      return orders;
    }
    return null;
  }
}

