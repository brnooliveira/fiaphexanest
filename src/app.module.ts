import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { OrderRepository } from './adapter/driven/repositories/order.repository';
import { ProductRepository } from './adapter/driven/repositories/product.repository';
import { UserRepository } from './adapter/driven/repositories/user.repository';
import { AuthenticationController } from './adapter/driver/controllers/authentication.controller';
import { OrderController } from './adapter/driver/controllers/order.controller';
import { ProductController } from './adapter/driver/controllers/product.controller';
import { UserController } from './adapter/driver/controllers/user.controller';
import { ORDER_REPOSITORY, ORDER_USE_CASE, PRODUCT_REPOSITORY, PRODUCT_USE_CASE, USER_REPOSITORY, USER_USE_CASE } from './core/application/constants/tokens';
import { OrderUseCase } from './core/application/use-cases/order-use-case';
import { ProductUseCase } from './core/application/use-cases/product-use-case';
import { UserUseCase } from './core/application/use-cases/user-use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './core/domain/entities/user';
import { Product } from './core/domain/entities/product';
import { ProductImage } from './core/domain/entities/product-image';
import { Order } from './core/domain/entities/order';

const repositories = [
  {
    provide: USER_REPOSITORY,
    useClass: UserRepository
  },
  {
    provide: PRODUCT_REPOSITORY,
    useClass: ProductRepository
  },
  {
    provide: ORDER_REPOSITORY,
    useClass: OrderRepository
  },
];

const useCases = [
  {
    provide: USER_USE_CASE,
    useClass: UserUseCase
  },
  {
    provide: PRODUCT_USE_CASE,
    useClass: ProductUseCase
  },
  {
    provide: ORDER_USE_CASE,
    useClass: OrderUseCase
  },
];

@Module({
  controllers: [OrderController, UserController, ProductController, AuthenticationController],
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        synchronize: true,
        entities: [User, Product, ProductImage, Order]
      }),
      inject: [ConfigService]
    }),
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    })
  ],
  providers: [
    ...repositories,
    ...useCases,
  ],
})
export class AppModule { }

