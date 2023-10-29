import { OrderStatus } from "../value-objects/order-status";
import { OrderPayment } from "./payment";
import { Product } from "./product";

export class Order {
  public readonly id: string;
  public readonly orderStatus: OrderStatus;
  public readonly products: Product[];
  public readonly orderPayment: OrderPayment;
  public readonly date: String;

  constructor(id: string, orderStatus: OrderStatus, products: Product[], orderPayment: OrderPayment, date: String) {
    this.id = id;
    this.orderStatus = orderStatus;
    this.products = products;
    this.orderPayment = orderPayment;
    this.date = date;
  }
}
