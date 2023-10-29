import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AddProductImageDto, CreateProductDto, UpdateProductDto } from 'src/core/application/dtos/product.dto';
import { Product } from 'src/core/domain/entities/product';
import { ProductImage } from 'src/core/domain/entities/product-image';
import { IProductRepository } from 'src/core/domain/repositories/product-repository.interface';
import { ProductCategory } from 'src/core/domain/value-objects/product-category';

@Injectable()
export class ProductRepository implements IProductRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(): Promise<Product[]> {
    const res = await this.prisma.product.findMany({ include: { productImages: true } });

    return res.map(res => new Product(res.id, res.name, res.productCategory, res.price.toNumber(), res.description, res.productImages));
  }

  async findById(id: string): Promise<Product | null> {
    const res = await this.prisma.product.findUnique({ where: { id }, include: { productImages: true } });

    return new Product(res.id, res.name, res.productCategory, res.price.toNumber(), res.description, res.productImages);
  }

  async create(createProductDTO: CreateProductDto): Promise<Product> {
    const res = await this.prisma.product.create({ data: createProductDTO });

    return new Product(res.id, res.name, res.productCategory, res.price.toNumber(), res.description, []);
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const res = await this.prisma.product.update({
      where: { id: id },
      data: updateProductDto,
    });

    return new Product(res.id, res.name, res.productCategory, res.price.toNumber(), res.description, []);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }

  async findByCategory(productCategory: ProductCategory): Promise<Product[]> {
    const res = await this.prisma.product.findMany({ where: { productCategory: productCategory }, include: { productImages: true } });

    return res.map(res => new Product(res.id, res.name, res.productCategory, res.price.toNumber(), res.description, res.productImages));
  }

  async addImages(addProductImageDtos: AddProductImageDto[]): Promise<boolean> {
    try {
      await this.prisma.productImage.createMany({ data: addProductImageDtos });
      return true;
    } catch {
      return false;
    }
  }

  async removeImages(ids: string[]): Promise<ProductImage[]> {

    const res = await this.prisma.productImage.findMany({ where: { id: { in: ids } } });
    await this.prisma.productImage.deleteMany({ where: { id: { in: ids } } });
    
    return res.map(res => new ProductImage(res.path, res.productId, res.id));
  }
}
