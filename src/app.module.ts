import { Module } from '@nestjs/common';
import { CourseController } from './infrastructure/api/controllers/course.controller';
import { CourseService } from './core/application/services/course.service';
import { PrismaCourseRepository } from './infrastructure/repositories/prisma-course.repository';
import { UsersModule } from './users/users.module';
import { UserService } from './users/core/application/services/user.service';
import { PrismaUserRepository } from './users/infrastructure/repositories/prisma-user.repository';
import { UserController } from './users/infrastructure/api/user.controller';

@Module({
  imports: [UsersModule],
  controllers: [CourseController, UserController],
  providers: [
    CourseService,
    UserService,
    {
      provide: 'CourseRepository',
      useClass: PrismaCourseRepository,
    },
    {
      provide: 'UserRepository',
      useClass: PrismaUserRepository,
    },
  ],
})
export class AppModule {}
