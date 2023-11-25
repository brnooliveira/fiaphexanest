import { Inject } from '@nestjs/common';
import { join } from 'path';
import { DeleteResult } from 'typeorm';
import { Product } from '../../domain/entities/product';
import { ProductImage } from '../../domain/entities/product-image';
import { IProductRepository } from '../../domain/repositories/product-repository.interface';
import { ProductCategory } from '../../domain/value-objects/product-category';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';
import { FileUploadHelper } from '../helpers/file-upload.helper';
import { IProductUseCase } from './product-use-case.interface';
import { DomainHelper } from '../helpers/domain.helper';
import { PRODUCT_REPOSITORY } from '../constants/tokens';

export class ProductUseCase implements IProductUseCase {

  constructor(
    @Inject(PRODUCT_REPOSITORY) private readonly productRepository: IProductRepository,
  ) { }

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  create(createProductDTO: CreateProductDto): Promise<Product> {
    const product: Product = new Product(
      createProductDTO.name,
      createProductDTO.productCategory,
      createProductDTO.price,
      createProductDTO.description
    );
    return this.productRepository.save(product);
  }

  findById(id: string): Promise<Product> {
    return this.productRepository.findOneBy({ id });
  }

  findByCategory(productCategory: ProductCategory): Promise<Product[]> {
    return this.productRepository.findBy({ productCategory });
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const user: Product = await this.productRepository.findOneBy({ id });

    if (user) {
      DomainHelper.updateEntity(user, updateProductDto);
      return this.productRepository.save(user);
    }
    return null;
  }

  delete(id: string): Promise<DeleteResult> {
    return this.delete(id);
  }

  async addImages(productId: string, filePaths: string[]): Promise<Product> {

    const product: Product = await this.productRepository.findOneBy({ id: productId });

    if (product) {
      const productImages: ProductImage[] = filePaths.map(filePath => new ProductImage(filePath, product));
      return this.productRepository.addImages(productId, productImages);
    }

    return null;
  }

  async removeImages(productId: string, imageIds: string[]): Promise<void> {

    const imagePaths = await this.productRepository.removeImages(productId, imageIds);
    const imagesFolderPath = join(process.cwd(), 'uploads');
    const fullFilePaths = imagePaths.map(imagePath => join(imagesFolderPath + '/' + imagePath));

    FileUploadHelper.removeFiles(fullFilePaths);
  }

}
