import { DeleteResult } from 'typeorm';
import { Product } from '../../domain/entities/product';
import { ProductImage } from '../../domain/entities/product-image';
import { ProductCategory } from '../../domain/value-objects/product-category';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';

export interface IProductUseCase {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product>;
  findByCategory(productCategory: ProductCategory): Promise<Product[]>;
  create(createProductDTO: CreateProductDto): Promise<Product>;
  update(id: string, updateProductDto: UpdateProductDto): Promise<Product>;
  delete(id: string): Promise<DeleteResult>;
  addImages(productId: string, fileNames: string[]): Promise<Product>;
  removeImages(productId: string, imageIds: string[]): Promise<void>;
}
