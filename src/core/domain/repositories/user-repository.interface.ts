import { CreateUserDto, UpdateUserDto } from 'src/core/application/dtos/user.dto';
import { User } from '../entities/user';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  create(user: CreateUserDto): Promise<User>;
  update(id: string, user: UpdateUserDto): Promise<User>;
  delete(id: string): Promise<void>;
}
