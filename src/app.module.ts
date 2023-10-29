import { Module } from '@nestjs/common';
import { UserController } from './adapter/driver/controllers/user.controller';
import { UserUseCase } from './core/application/use-cases/user-use-case';
import { UserRepository } from './adapter/driven/repositories/user.repository';
import { ProductController } from './adapter/driver/controllers/product.controller';
import { ProductRepository } from './adapter/driven/repositories/product.repository';
import { ProductUseCase } from './core/application/use-cases/product-use-case';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthenticationController } from './adapter/driver/controllers/authentication.controller';
import { OrderController } from './adapter/driver/controllers/order.controller';
import { OrderUseCase } from './core/application/use-cases/order-use-case';
import { OrderRepository } from './adapter/driven/repositories/order.repository';

/*
JwtModule.register({
      global: true,
      signOptions: { expiresIn: '24h' },
      secre
    }),
*/
@Module({
  controllers: [OrderController, UserController, ProductController, AuthenticationController],
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    UserUseCase,
    ProductUseCase,
    OrderUseCase,
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'ProductRepository',
      useClass: ProductRepository,
    },
    {
      provide: 'OrderRepository',
      useClass: OrderRepository,
    },
  ],
})
export class AppModule {}

