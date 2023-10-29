import { User } from 'src/core/domain/entities/user';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

export interface IUserUseCase {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByCpf(cpf: string): Promise<User | null>;
  create(user: CreateUserDto): Promise<User>;
  update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
  delete(id: string): Promise<void>;
  login(cpf: string): Promise<string>;
}
