import { Repository } from 'typeorm';
import { User } from '../entities/user';

export interface IUserRepository extends Repository<User> {

}
