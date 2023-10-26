import { User } from '../entities/user';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  create(user: User): Promise<User>;
  update(id: string, user: User): Promise<User>;
  delete(id: string): Promise<void>;
}
