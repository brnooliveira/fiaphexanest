import { Body, Controller, Delete, Get, Param, Patch, Post, Request } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateOrderDto, UpdateOrderDto } from 'src/core/application/dtos/order.dto';
import { OrderUseCase } from 'src/core/application/use-cases/order-use-case';
import { Order } from 'src/core/domain/entities/order';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderUseCase: OrderUseCase,
    private jwtService: JwtService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obter todas as ordens' })
  @ApiResponse({ status: 200, description: 'Lista de ordens', type: [Order] })
  findAll(): Promise<Order[]> {
    return this.orderUseCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter uma ordem pelo ID' })
  @ApiResponse({ status: 200, description: 'Detalhes da ordem', type: Order })
  @ApiResponse({ status: 404, description: 'Ordem não encontrada' })
  findById(@Param('id') id: string): Promise<Order | null> {
    return this.orderUseCase.findById(id);
  }

  @Get('cpf/:cpf')
  findByUserCpf(@Param('cpf') cpf: string): Promise<Order[]> {
    return this.orderUseCase.findByUserCpf(cpf);
  }

  @Post()
  @ApiOperation({ summary: 'Criar uma nova ordem' })
  @ApiResponse({ status: 201, description: 'Ordem criada com sucesso', type: Order })
  @ApiResponse({ status: 400, description: 'Requisição inválida' })
  async create(@Body() createOrderDto: CreateOrderDto, @Request() req): Promise<Order> {
    const token: string = req.headers.authorization;
    if (token) {
      const decodedToken = this.jwtService.decode(token.split(' ')[1]);
      createOrderDto.userId = decodedToken['id'];
    }

    return await this.orderUseCase.create(createOrderDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma ordem pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da ordem' })
  @ApiBody({ type: UpdateOrderDto, description: 'Dados para atualizar a ordem' })
  @ApiResponse({ status: 200, description: 'Ordem atualizada com sucesso', type: Order })
  @ApiResponse({ status: 404, description: 'Ordem não encontrada' })
  @ApiResponse({ status: 400, description: 'Requisição inválida' })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto): Promise<Order> {
    return this.orderUseCase.update(updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar uma ordem pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da ordem' })
  @ApiResponse({ status: 200, description: 'Ordem deletada com sucesso' })
  @ApiResponse({ status: 404, description: 'Ordem não encontrada' })
  @ApiResponse({ status: 400, description: 'Requisição inválida' })
  delete(@Param('id') id: string): Promise<void> {
    return this.orderUseCase.delete(id);
  }

  @Post(':id/pay')
  pay(@Param('id') orderId: string, @Body() paymentDetails: any): Promise<Order> {
    return this.orderUseCase.pay(orderId);
  }
}

