import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../../../core/domain/entities/user';

@Injectable()
export class UserRepository extends Repository<User> {

  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }


}