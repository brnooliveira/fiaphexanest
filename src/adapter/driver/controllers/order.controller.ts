import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateOrderDto, UpdateOrderDto } from 'src/core/application/dtos/order.dto';
import { OrderUseCase } from 'src/core/application/use-cases/order-use-case';
import { Order } from 'src/core/domain/entities/order';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderUseCase: OrderUseCase,
    private jwtService: JwtService
  ) { }

  @Get()
  findAll(): Promise<Order[]> {
    return this.orderUseCase.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Order | null> {
    return this.orderUseCase.findById(id);
  }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto, @Request() req): Promise<Order> {
    
    const token: string = req.headers.authorization;
    if(token){
      const decodedToken = this.jwtService.decode(token.split(' ')[1]);
      createOrderDto.userId = decodedToken['id'];
    }

    return await this.orderUseCase.create(createOrderDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto): Promise<Order> {
    return this.orderUseCase.update(updateOrderDto);
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

