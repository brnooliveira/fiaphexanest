import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../../core/domain/entities/user';
import { IUserRepository } from '../../../core/domain/repositories/user-repository.interface';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

@Injectable()
export class UserUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: IUserRepository,
  ) { }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
  
  async create(createUserDTO: CreateUserDto): Promise<User> {
    return this.userRepository.create(createUserDTO);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userRepository.update(id, updateUserDto);
  }

  async delete(id: string): Promise<void> {
    return this.userRepository.delete(id);
  }
}
