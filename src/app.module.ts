import { Module } from '@nestjs/common';
import { UserController } from './adapter/driver/controllers/user.controller';
import { UserUseCase } from './core/application/use-cases/user-use-case';
import { UserRepository } from './adapter/driven/repositories/user.repository';
import { ProductController } from './adapter/driver/controllers/product.controller';
import { ProductRepository } from './adapter/driven/repositories/product.repository';
import { ProductUseCase } from './core/application/use-cases/product-use-case';

@Module({
  controllers: [UserController, ProductController],
  providers: [
    UserUseCase,
    ProductUseCase,
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'ProductRepository',
      useClass: ProductRepository,
    },
  ],
})
export class AppModule { }
