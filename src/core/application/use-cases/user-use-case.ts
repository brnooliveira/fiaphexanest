import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DeleteResult } from 'typeorm';
import { User } from '../../../core/domain/entities/user';
import { IUserRepository } from '../../../core/domain/repositories/user-repository.interface';
import { USER_REPOSITORY } from '../constants/tokens';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { DomainHelper } from '../helpers/domain.helper';
import { IUserUseCase } from './user-use-case.interface';

@Injectable()
export class UserUseCase implements IUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    private jwtService: JwtService
  ) { }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id: id });
  }

  async findByCpf(cpf: string): Promise<User | null> {
    return this.userRepository.findOneBy({ cpf });
  }

  async create(createUserDTO: CreateUserDto): Promise<User> {
    const user: User = new User(
      createUserDTO.name,
      createUserDTO.cpf,
      createUserDTO.email
    );
    return this.userRepository.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = await this.userRepository.findOneBy({ id });

    if (user) {
      DomainHelper.updateEntity(user, updateUserDto);
      return this.userRepository.save(user);
    }
    return null;
  }

  async delete(id: string): Promise<DeleteResult> {
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
