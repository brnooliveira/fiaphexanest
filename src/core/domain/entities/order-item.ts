import { OrderItemCategory } from "../value-objects/order-item-category";
import { OrderItemStatus } from "../value-objects/order-status";
import { OrderItemImage } from "./order-item-image";

export class OrderItem {
  private id: string;
  private name: string;
  private category: OrderItemCategory;
  private status: OrderItemStatus;
  private price: number;
  private description: string;
  private images: OrderItemImage[];
}