import { Repository } from 'typeorm';
import { Order } from '../entities/order';

export interface IOrderRepository extends Repository<Order> {

}

