import { User } from 'src/core/domain/entities/user';

export interface IUserUseCase {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findCpf(cpf: string): Promise<User | null>;
  create(user: User): Promise<User>;
  update(id: string, user: User): Promise<User>;
  delete(id: string): Promise<void>;
}
