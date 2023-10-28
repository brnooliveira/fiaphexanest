import { Product } from 'src/core/domain/entities/product';
import { ProductImage } from 'src/core/domain/entities/product-image';
import { ProductCategory } from 'src/core/domain/value-objects/product-category';
import { IProductUseCase } from './product-use-case.interface';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';
import { IProductRepository } from 'src/core/domain/repositories/product-repository.interface';
import { Inject } from '@nestjs/common';

export class ProductUseCase implements IProductUseCase {

  constructor(
    @Inject('ProductRepository') private readonly productRepository: IProductRepository,
  ) { }

  findAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  create(createProductDTO: CreateProductDto): Promise<Product> {

    return this.productRepository.create(createProductDTO);
    throw new Error('Method not implemented.');
  }

  findById(id: string): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  findByCategory(productCategory: ProductCategory): Promise<Product> {
    throw new Error('Method not implemented.');
  }

  update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  listImages(): Promise<ProductImage[]> {
    throw new Error('Method not implemented.');
  }
  addImage(productImage: ProductImage): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  removeImage(id: string): Promise<Product> {
    throw new Error('Method not implemented.');
  }

}
