import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { IUserRepository } from '../../../core/domain/repositories/user-repository.interface';
import { User } from '../../../core/domain/entities/user';
import { CreateUserDto, UpdateUserDto } from '../../../core/application/dtos/user.dto';

@Injectable()
export class UserRepository implements IUserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async create(createUserDTO: CreateUserDto): Promise<User> {
    return this.prisma.user.create({ data: createUserDTO });
  }

  async update(id: string, user: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { id: id },
      data: user,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
