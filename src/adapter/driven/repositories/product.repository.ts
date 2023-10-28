import { Injectable } from '@nestjs/common';
import { $Enums, PrismaClient, ProductCategory } from '@prisma/client';
import { CreateProductDto, UpdateProductDto } from 'src/core/application/dtos/product.dto';
import { Product } from 'src/core/domain/entities/product';
import { ProductImage } from 'src/core/domain/entities/product-image';
import { IProductRepository } from 'src/core/domain/repositories/product-repository.interface';

@Injectable()
export class ProductRepository implements IProductRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(): Promise<Product[]> {
    const result = this.prisma.product.findMany();

    return null
  }

  async findById(id: string): Promise<Product | null> {
    throw new Error('Method not implemented.');
    //return this.prisma.product.findUnique({ where: { id } });
  }

  async create(createProductDTO: CreateProductDto): Promise<Product> {
    const product = this.prisma.product.create({ data: createProductDTO });
    
    console.log(product)
    return null;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    throw new Error('Method not implemented.');
    // return this.prisma.product.update({
    //   where: { id: id },
    //   data: updateProductDto,
    // });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }

  findByCategory(productCategory: $Enums.ProductCategory): Promise<Product> {
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
