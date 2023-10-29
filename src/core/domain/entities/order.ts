import { OrderStatus } from '../value-objects/order-status';
import { OrderPayment } from './payment';
import { Product } from './product';

export class Order {
  public readonly id: string;
  public orderStatus: OrderStatus;
  public readonly products: Product[];
  public orderPayment: OrderPayment;
  public readonly date: Date;
  public readonly userId: string;

  constructor(
    userId: string,
    products: Product[],
    orderStatus?: OrderStatus,
    date?: Date,
    id?: string,
    orderPayment?: OrderPayment,
  ) {
    // if (!id || !orderStatus || !products || !orderPayment || !date || !userId) {
    //   throw new Error('Todos os campos são obrigatórios');
    // }
    this.id = id;
    this.orderStatus = orderStatus;
    this.products = products;
    this.orderPayment = orderPayment;
    this.date = date;
    this.userId = userId;
  }
}

