import { OrderStatus } from 'src/core/domain/value-objects/order-status';
import { OrderPayment } from '../../domain/entities/payment';
import { Product } from 'src/core/domain/entities/product';
export class CreateOrderDto {
  userId: string;
  productIds: string[];
}

export class UpdateOrderDto {
  id: string | null;
  userId: string | null;
  orderStatus: OrderStatus | null;
  orderPayment: OrderPayment | null;
  products: Product[] | null;
  date: Date | null;
}

export class AddOrderProductDto {
  productId: string;
  orderId: string;
}
