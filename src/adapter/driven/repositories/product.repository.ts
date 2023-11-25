import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Product } from '../../../core/domain/entities/product';
import { ProductImage } from '../../../core/domain/entities/product-image';
@Injectable()
export class ProductRepository extends Repository<Product> {

  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  async addImages(productId: string, productImages: ProductImage[]): Promise<Product> {

    const product: Product = await this.findOneBy({ id: productId });

    if (product) {
      product.productImages.push(...productImages);
      return this.save(product);
    }
    return null;
  }

  async removeImages(productId: string, ids: string[]): Promise<string[]> {

    const product: Product = await this.findOneBy({ id: productId });
    let imagesToRemove: string[] = []

    if (product) {
      imagesToRemove = product.productImages
        .filter(productImage => !ids.includes(productImage.id))
        .map(productImage => productImage.path);

      const productImages = product.productImages.filter(productImage => !ids.includes(productImage.id));
      product.productImages = productImages;
      await this.save(product);
    }

    return imagesToRemove;
  }

}