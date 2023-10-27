import { OrderStatus } from "../value-objects/order-status";
import { OrderPayment } from "./payment";
import { Product } from "./product";

export class Order {
  private id: string;
  private orderStatus: OrderStatus;
  private products: Product[];
  private orderPayment: OrderPayment;
  private date: String;

  constructor($id: string, $orderStatus: OrderStatus, $products: Product[], $orderPayment: OrderPayment, $date: String) {
    this.id = $id;
    this.orderStatus = $orderStatus;
    this.products = $products;
    this.orderPayment = $orderPayment;
    this.date = $date;
  }
}
