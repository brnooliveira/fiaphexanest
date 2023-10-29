import { Product } from 'src/core/domain/entities/product';
import { ProductImage } from 'src/core/domain/entities/product-image';
import { ProductCategory } from 'src/core/domain/value-objects/product-category';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';

export interface IProductUseCase {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  findByCategory(productCategory: ProductCategory): Promise<Product>;
  create(createProductDTO: CreateProductDto): Promise<Product>;
  update(id: string, updateProductDto: UpdateProductDto): Promise<Product>;
  delete(id: string): Promise<void>;
  listImages(): Promise<ProductImage[]>;
  addImages(productImages: ProductImage[]): Promise<boolean>;
  removeImages(ids: string[]): Promise<void>;
}
