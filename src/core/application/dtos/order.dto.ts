import { OrderStatus } from 'src/core/domain/value-objects/order-status';
import { OrderPayment } from '../../domain/entities/payment';
import { Product } from 'src/core/domain/entities/product';
import { ApiProperty } from '@nestjs/swagger';
export class CreateOrderDto {
  @ApiProperty({ description: 'ID do usuário' })
  userId: string;

  @ApiProperty({ description: 'IDs dos produtos', type: [String] })
  productIds: string[];
}

export class UpdateOrderDto {
  @ApiProperty({ description: 'ID do pedido', required: false })
  id: string | null;
  @ApiProperty({ description: 'ID do usuário', required: false })
  userId: string | null;
  @ApiProperty({ description: 'Status do pedido', required: false })
  orderStatus: OrderStatus | null;
  @ApiProperty({ description: 'Pagamento do pedido', required: false })
  orderPayment: OrderPayment | null;
  @ApiProperty({ description: 'Produtos do pedido', required: false, type: [Product] })
  products: Product[] | null;
  @ApiProperty({ description: 'Data do pedido', required: false })
  date: Date | null;
}

export class AddOrderProductDto {
  @ApiProperty({ description: 'ID do produto' })
  productId: string;
  @ApiProperty({ description: 'ID do pedido' })
  orderId: string;
}

