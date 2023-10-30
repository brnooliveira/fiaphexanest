import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Order } from 'src/core/domain/entities/order';
import { Product } from 'src/core/domain/entities/product';
import { IOrderPaymentRepository } from 'src/core/domain/repositories/order-payment.interface';

@Injectable()
export class OrderPaymentRepository implements IOrderPaymentRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async pay(orderId: string): Promise<Order> {

    const res = await this.prisma.orderPayment.update({
      where: { orderId, orderPaymentStatus: 'PENDING' },
      data: {
        orderPaymentStatus: 'PAID',
        order: {
          update: {
            where: {
              id: orderId,
              orderStatus: 'WAITING_PAYMENT'
            },
            data: {
              orderStatus: 'RECEIVED'
            }
          }
        }
      },
      include: {
        order: { include: { products: true } },
      },
    });

    return this.mapToOrder(res);
  }

  private mapToOrder(res) {
    if (res) {
      const products = res.order.products.map(res => new Product(res.id, res.name, res.productCategory, res.price.toNumber(), res.description));
      return new Order(res.userId, products, res.orderStatus, res.date, res.id);
    }
    return null;
  }

}

