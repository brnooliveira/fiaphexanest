import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/core/domain/entities/user';
import { IUserRepository } from 'src/core/domain/repositories/user-repository.interface';

@Injectable()
export class UserUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async create(user: User): Promise<User> {
    return this.userRepository.create(user);
  }

  async update(id: string, user: User): Promise<User> {
    return this.userRepository.update(id, user);
  }

  async delete(id: string): Promise<void> {
    return this.userRepository.delete(id);
  }
}
