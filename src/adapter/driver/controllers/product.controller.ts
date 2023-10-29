import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';

import { FilesInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { CreateProductDto, UpdateProductDto } from 'src/core/application/dtos/product.dto';
import { FileUploadHelper } from 'src/core/application/helpers/file-upload.helper';
import { ProductUseCase } from 'src/core/application/use-cases/product-use-case';
import { Product } from 'src/core/domain/entities/product';
import { ProductImage } from 'src/core/domain/entities/product-image';
import { User } from '../../../core/domain/entities/user';

@Controller('products')
export class ProductController {
  constructor(private readonly productUseCase: ProductUseCase) { }

  @Get()
  findAll(): Promise<Product[]> {
    return this.productUseCase.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Product | null> {
    return this.productUseCase.findById(id);
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productUseCase.create(createProductDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<User> {
    throw new Error("Not implemented yet")
    //return this.productUseCase.update(id, updateProductDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.productUseCase.delete(id);
  }

  @Post(':id/images')
  @UseInterceptors(
    FilesInterceptor('files', 6, FileUploadHelper.saveFileToStorage())
  )
  async addImages(
    @Param('id') productId: string,
    @UploadedFile('files') files: Array<Express.Multer.File>
  ) {

    const productImages: ProductImage[] = [];
    const imagePaths: string[] = [];

    try {
      files.forEach(file => {
        const imagesFolderPath = join(process.cwd(), 'uploads');
        const fullImagePath = join(imagesFolderPath + '/' + file.filename);

        imagePaths.push(fullImagePath);
        productImages.push(new ProductImage(file.filename, productId));
      });
    } catch {
      throw new InternalServerErrorException();
    }

    const createSuccess = await this.productUseCase.addImages(productImages);

    if (!createSuccess) {
      FileUploadHelper.removeFiles(imagePaths);
      throw new BadRequestException();
    }

  }

  @Delete('image/:id')
  deleteImages(@Param('id') id: string,): Promise<void> {
    return this.productUseCase.removeImages([id]);
  }

}