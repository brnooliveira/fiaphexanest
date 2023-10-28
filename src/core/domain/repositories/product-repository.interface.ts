import { Product } from '../entities/product';
import { ProductCategory } from '@prisma/client';
import { ProductImage } from '../entities/product-image';
import { CreateProductDto, UpdateProductDto } from 'src/core/application/dtos/product.dto';

export interface IProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  findByCategory(productCategory: ProductCategory): Promise<Product>;
  create(createProductDto: CreateProductDto): Promise<Product>;
  update(id: string, updateProductDto: UpdateProductDto): Promise<Product>;
  delete(id: string): Promise<void>;
  listImages(): Promise<ProductImage[]>;
  addImage(productImage: ProductImage): Promise<Product>;
  removeImage(id: string): Promise<Product>;
}
