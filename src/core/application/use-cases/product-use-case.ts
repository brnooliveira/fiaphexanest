import { Product } from 'src/core/domain/entities/product';
import { ProductImage } from 'src/core/domain/entities/product-image';
import { ProductCategory } from 'src/core/domain/value-objects/product-category';
import { IProductUseCase } from './product-use-case.interface';
import { AddProductImageDto, CreateProductDto, UpdateProductDto } from '../dtos/product.dto';
import { IProductRepository } from 'src/core/domain/repositories/product-repository.interface';
import { Inject } from '@nestjs/common';
import { FileUploadHelper } from '../helpers/file-upload.helper';
import { join } from 'path';

export class ProductUseCase implements IProductUseCase {

  constructor(
    @Inject('ProductRepository') private readonly productRepository: IProductRepository,
  ) { }

  findAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  create(createProductDTO: CreateProductDto): Promise<Product> {
    return this.productRepository.create(createProductDTO);
  }

  findById(id: string): Promise<Product> {
    return this.productRepository.findById(id);
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
  addImages(productImages: ProductImage[]): Promise<boolean> {
    const addProductImageDtos: AddProductImageDto[] = productImages.map(productImage => ({
      path: productImage.path,
      productId: productImage.productId
    }));
    return this.productRepository.addImages(addProductImageDtos);
  }

  async removeImages(ids: string[]): Promise<void> {

    const productImages: ProductImage[] = await this.productRepository.removeImages(ids);
    const imagesFolderPath = join(process.cwd(), 'uploads');
    const imagePaths: string[] = [];

    productImages.forEach(productImage => {
      imagePaths.push(join(imagesFolderPath + '/' + productImage.path));
    });
    
    FileUploadHelper.removeFiles(imagePaths);
  }

}
