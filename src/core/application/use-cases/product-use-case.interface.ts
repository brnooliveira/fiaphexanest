import { Product } from 'src/core/domain/entities/product';
import { ProductImage } from 'src/core/domain/entities/product-image';
import { ProductCategory } from 'src/core/domain/value-objects/product-category';

export interface IProductUseCase {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  findByCategory(productCategory: ProductCategory): Promise<Product>;
  create(product: Product): Promise<Product>;
  update(id: string, product: Product): Promise<Product>;
  delete(id: string): Promise<void>;
  listImages(): Promise<ProductImage[]>;
  addImage(productImage: ProductImage): Promise<Product>;
  removeImage(id: string): Promise<Product>;
}
