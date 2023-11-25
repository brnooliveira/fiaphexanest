import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Order } from '../../../core/domain/entities/order';
@Injectable()
export class OrderRepository extends Repository<Order> {

  constructor(private dataSource: DataSource) {
    super(Order, dataSource.createEntityManager());
  }

}