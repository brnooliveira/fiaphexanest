import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateOrderDto, UpdateOrderDto } from 'src/core/application/dtos/order.dto';
import { OrderUseCase } from 'src/core/application/use-cases/order-use-case';
import { Order } from 'src/core/domain/entities/order';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderUseCase: OrderUseCase) {}

  @Get()
  findAll(): Promise<Order[]> {
    return this.orderUseCase.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Order | null> {
    return this.orderUseCase.findById(id);
  }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderUseCase.create(createOrderDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto): Promise<Order> {
    return this.orderUseCase.update(id, updateOrderDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.orderUseCase.delete(id);
  }

  @Post(':id/pay')
  pay(@Param('id') orderId: string, @Body() paymentDetails: any): Promise<Order> {
    return this.orderUseCase.pay();
  }
}

