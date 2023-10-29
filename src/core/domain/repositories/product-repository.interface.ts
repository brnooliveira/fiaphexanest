import { Product } from '../entities/product';
import { AddProductImageDto, CreateProductDto, UpdateProductDto } from 'src/core/application/dtos/product.dto';
import { ProductCategory } from '../value-objects/product-category';
import { ProductImage } from '../entities/product-image';


export interface IProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  findByCategory(productCategory: ProductCategory): Promise<Product[]>;
  create(createProductDto: CreateProductDto): Promise<Product>;
  update(id: string, updateProductDto: UpdateProductDto): Promise<Product>;
  delete(id: string): Promise<void>;
  addImages(addProductImageDtos: AddProductImageDto[]): Promise<boolean>;
  removeImages(ids: string[]): Promise<ProductImage[]>;
}
