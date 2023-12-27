import { Repository } from 'typeorm';
import { Product } from '../entities/product';
import { ProductImage } from '../entities/product-image';

export interface IProductRepository extends Repository<Product> {
  addImages(productId: string, productImages: ProductImage[]): Promise<Product>;
  removeImages(productId: string, ids: string[]): Promise<string[]>;
}
