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

    const orders: Order[] = res.map(res => {
      const products = res.products.map(res => new Product(res.id, res.name, res.productCategory, res.price.toNumber(), res.description))
      return new Order(res.userId, products, res.orderStatus, res.date, res.id, res.orderPayment)
    })
    return orders;
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

    return null;
  }

  async findOrderByStatus(orderStatus: OrderStatus): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      where: { orderStatus },
      include: {
        products: true,
        orderPayment: true,
      },
    });

    return null;
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {

    console.log(createOrderDto)

    const productIds = createOrderDto.productIds.map((id) => ({ id }));

    const data = {
      products: { connect: productIds },
      orderPayment: { create: {} }
    }

    if(createOrderDto.userId){
      data['user'] = { connect: { id: createOrderDto.userId } }
    }
    
    const res = await this.prisma.order.create({
      data,
      include: {
        products: true
      }
    });

    const products = res.products.map(res => new Product(res.id, res.name, res.productCategory, res.price.toNumber(), res.description))

    return new Order(res.userId, products, res.orderStatus, res.date, res.id);
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

    const products = res.products.map(res => new Product(res.id, res.name, res.productCategory, res.price.toNumber(), res.description))

    return new Order(res.userId, products, res.orderStatus, res.date, res.id);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.order.delete({ where: { id } });
  }
}

