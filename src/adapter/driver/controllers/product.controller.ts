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
  UseInterceptors,
} from '@nestjs/common';

import { FilesInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { CreateProductDto, UpdateProductDto } from 'src/core/application/dtos/product.dto';
import { FileUploadHelper } from 'src/core/application/helpers/file-upload.helper';
import { ProductUseCase } from 'src/core/application/use-cases/product-use-case';
import { Product } from 'src/core/domain/entities/product';
import { ProductImage } from 'src/core/domain/entities/product-image';
import { User } from '../../../core/domain/entities/user';
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productUseCase: ProductUseCase) {}

  @Get()
  @ApiOperation({ summary: 'Obter todos os produtos' })
  @ApiResponse({ status: 200, description: 'Lista de produtos', type: [Product] })
  findAll(): Promise<Product[]> {
    return this.productUseCase.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um produto pelo ID' })
  @ApiResponse({ status: 200, description: 'Detalhes do produto', type: Product })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  findById(@Param('id') id: string): Promise<Product | null> {
    return this.productUseCase.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo produto' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, description: 'Produto criado com sucesso', type: Product })
  @ApiResponse({ status: 400, description: 'Requisição inválida' })
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productUseCase.create(createProductDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um produto pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do produto' })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({ status: 200, description: 'Produto atualizado com sucesso', type: Product })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<User> {
    throw new Error('Not implemented yet');
    //return this.productUseCase.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um produto pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do produto' })
  @ApiResponse({ status: 200, description: 'Produto deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  delete(@Param('id') id: string): Promise<void> {
    return this.productUseCase.delete(id);
  }

  @Post(':id/images')
  @UseInterceptors(FilesInterceptor('files', 6, FileUploadHelper.saveFileToStorage()))
  async addImages(@Param('id') productId: string, @UploadedFile('files') files: Array<Express.Multer.File>) {
    const productImages: ProductImage[] = [];
    const imagePaths: string[] = [];

    try {
      files.forEach((file) => {
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
  deleteImages(@Param('id') id: string): Promise<void> {
    return this.productUseCase.removeImages([id]);
  }

  @Get('by-category/:category')
  async findByCategory(@Param('category') category: any): Promise<Product[]> {
    return await this.productUseCase.findByCategory(category);
  }
}

