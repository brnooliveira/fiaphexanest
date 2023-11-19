import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Request } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiBody, ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { ORDER_USE_CASE } from '../../../core/application/constants/tokens';
import { CreateOrderDto, UpdateOrderDto } from '../../../core/application/dtos/order.dto';
import { IOrderUseCase } from '../../../core/application/use-cases/order-use-case.interface';
import { Order } from '../../../core/domain/entities/order';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(
    @Inject(ORDER_USE_CASE) private readonly orderUseCase: IOrderUseCase,
    private jwtService: JwtService,
  ) { }

  @Get()
  @ApiOperation({ summary: 'Obter todas as pedidos' })
  @ApiResponse({ status: 200, description: 'Lista de pedidos', type: [Order] })
  findAll(): Promise<Order[]> {
    return this.orderUseCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter uma pedido pelo ID' })
  @ApiResponse({ status: 200, description: 'Detalhes da pedido', type: Order })
  @ApiResponse({ status: 404, description: 'Pedido não encontrada' })
  findById(@Param('id') id: string): Promise<Order | null> {
    return this.orderUseCase.findById(id);
  }

  @Get('cpf/:cpf')
  findByUserCpf(@Param('cpf') cpf: string): Promise<Order[]> {
    return this.orderUseCase.findByUserCpf(cpf);
  }

  @Post()
  @ApiOperation({ summary: 'Cria um novo pedido' })
  @ApiResponse({ status: 201, description: 'Pedido criado com sucesso', type: Order })
  @ApiResponse({ status: 400, description: 'Requisição inválida' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Token de autenticação caso usuário deseje se identificar para realizar o pedido',
    required: false,
  })
  async create(@Body() createOrderDto: CreateOrderDto, @Request() req): Promise<Order> {
    const token: string = req.headers.authorization;
    if (token) {
      const decodedToken = this.jwtService.decode(token.split(' ')[1]);
      createOrderDto.userId = decodedToken['id'];
    }

    return await this.orderUseCase.create(createOrderDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma pedido pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da pedido' })
  @ApiBody({ type: UpdateOrderDto, description: 'Dados para atualizar a pedido' })
  @ApiResponse({ status: 200, description: 'Pedido atualizada com sucesso', type: Order })
  @ApiResponse({ status: 404, description: 'Pedido não encontrada' })
  @ApiResponse({ status: 400, description: 'Requisição inválida' })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto): Promise<Order> {
    return this.orderUseCase.update(updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar uma pedido pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da pedido' })
  @ApiResponse({ status: 200, description: 'Pedido deletada com sucesso' })
  @ApiResponse({ status: 404, description: 'Pedido não encontrada' })
  @ApiResponse({ status: 400, description: 'Requisição inválida' })
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.orderUseCase.delete(id);
  }

  @Post(':id/pay')
  pay(@Param('id') orderId: string, @Body() paymentDetails: any): Promise<Order> {
    return this.orderUseCase.pay(orderId);
  }
}

