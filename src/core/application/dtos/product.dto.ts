import { ProductCategory } from 'src/core/domain/value-objects/product-category';

export class CreateProductDto {
  name: string;
  description: string;
  price: number;
  productCategory: ProductCategory;
}

export class UpdateProductDto {
  name: string | null;
  description: string | null;
  price: number | null;
  productCategory: ProductCategory | null;
}

export class AddProductImageDto {
  path: string;
  productId: string;
}
