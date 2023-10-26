import { Module } from '@nestjs/common';
import { UserController } from './adapter/driver/controllers/user.controller';
import { UserUseCase } from './core/application/use-cases/user-use-case';
import { UserRepository } from './adapter/driven/repositories/prisma-user.repository';

@Module({
  controllers: [UserController],
  providers: [
    UserUseCase,
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
  ],
})
export class AppModule { }
