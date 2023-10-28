import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse as ApiResponseDecorator,
  ApiTags,
} from '@nestjs/swagger';

import { User } from '../../../core/domain/entities/user';
import { ProductUseCase } from 'src/core/application/use-cases/product-use-case';
import { CreateProductDto, UpdateProductDto } from 'src/core/application/dtos/product.dto';
import { Product } from 'src/core/domain/entities/product';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productUseCase: ProductUseCase) { }

  @Get()
  findAll(): Promise<Product[]> {
    return this.productUseCase.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Product | null> {
    return this.productUseCase.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cria um novo produto' })
  @ApiResponseDecorator({
    status: 201,
    description: 'O produto foi criado com sucesso.',
  })
  @ApiResponseDecorator({ status: 400, description: 'Requisição inválida.' })
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    this.productUseCase.create(createProductDto);

    return null;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<User> {
    throw new Error("Not implemented yet")
    //return this.productUseCase.update(id, updateProductDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.productUseCase.delete(id);
  }
}
