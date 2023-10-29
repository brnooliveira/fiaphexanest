import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Order } from 'src/core/domain/entities/order';
import { IOrderRepository } from 'src/core/domain/repositories/order-repository.interface';
import { OrderStatus } from 'src/core/domain/value-objects/order-status';

@Injectable()
export class OrderRepository implements IOrderRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      include: {
        products: true,
        orderPayment: true,
      },
    });

    return orders.map((order) => this.mapToDomain(order));
  }

  async findById(id: string): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        products: true,
        orderPayment: true,
      },
    });

    if (!order) {
      return null;
    }

    return this.mapToDomain(order);
  }

  async findOrderByStatus(orderStatus: OrderStatus): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      where: { orderStatus },
      include: {
        products: true,
        orderPayment: true,
      },
    });

    return orders.map((order) => this.mapToDomain(order));
  }

  async create(order: Order): Promise<Order> {
    const productIds = order.products.map((product) => ({ id: product.id }));

    const createdOrder = await this.prisma.order.create({
      data: {
        orderStatus: order.orderStatus,
        products: {
          connect: productIds,
        },
        date: new Date(),
        userId: order.userId,
      },
      include: {
        products: true,
        orderPayment: true,
      },
    });

    return this.mapToDomain(createdOrder);
  }

  async update(id: string, order: Order): Promise<Order> {
    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: {
        orderStatus: order.orderStatus,
        products: {
          set: order.products.map((product) => ({ id: product.id })),
        },
        date: new Date(),
      },
      include: {
        products: true,
        orderPayment: true,
      },
    });

    return this.mapToDomain(updatedOrder);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.order.delete({ where: { id } });
  }

  private mapToDomain(order: any): Order {
    return new Order(order.id, order.orderStatus, order.products, order.orderPayment, order.date, order.userId);
  }
}

