import { ApiProperty } from '@nestjs/swagger';
import { ProductCategory } from 'src/core/domain/value-objects/product-category';

export class CreateProductDto {
  @ApiProperty({ description: 'Nome do produto' })
  name: string;

  @ApiProperty({ description: 'Descrição do produto' })
  description: string;

  @ApiProperty({ description: 'Preço do produto' })
  price: number;

  @ApiProperty({ description: 'Categoria do produto', example: 'MEAL', examples: ['MEAL', 'SIDE_DISH', 'DRINK', 'DESSERT'] })
  productCategory: ProductCategory;
}

export class UpdateProductDto {
  @ApiProperty({ description: 'Nome do produto', required: false })
  name: string | null;

  @ApiProperty({ description: 'Descrição do produto', required: false })
  description: string | null;

  @ApiProperty({ description: 'Preço do produto', required: false })
  price: number | null;

  @ApiProperty({ description: 'Categoria do produto', required: false })
  productCategory: ProductCategory | null;
}

export class AddProductImageDto {
  @ApiProperty({ description: 'Caminho da imagem' })
  path: string;

  @ApiProperty({ description: 'ID do produto' })
  productId: string;
}

