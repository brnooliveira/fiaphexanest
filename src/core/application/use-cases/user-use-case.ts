import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../../core/domain/entities/user';
import { IUserRepository } from '../../../core/domain/repositories/user-repository.interface';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { JwtService } from '@nestjs/jwt';
import { IUserUseCase } from './user-use-case.interface';

@Injectable()
export class UserUseCase implements IUserUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: IUserRepository,
    private jwtService: JwtService
  ) { }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async findByCpf(cpf: string): Promise<User | null> {
    return this.userRepository.findByCpf(cpf);
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

  async login(cpf: string): Promise<string> {
    const user = await this.findByCpf(cpf);
    if (user) {
      const payload = { id: user.id, cpf }
      return await this.jwtService.signAsync(payload)
    }
    return null;
  }
}
