import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderStatus } from '../value-objects/order-status';
import { Product } from './product';
import { User } from './user';

@Entity()
export class Order {

  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  private _id: string;

  @Column('text', { name: 'order_status' })
  private _orderStatus: OrderStatus;

  @Column('timestamp', { name: 'date' })
  private _date: Date;

  @Column('timestamp', { name: 'payment_date' })
  private _paymentDate: Date;

  @ManyToOne(() => User, (user: User) => user.orders)
  private _user: User;

  @ManyToMany(() => Product, (product: Product) => product.orders)
  private _products: Product[];

  constructor(
    user: User,
    products: Product[],
    orderStatus?: OrderStatus,
    date?: Date,
    id?: string,
  ) {
    this.id = id;
    this.orderStatus = orderStatus;
    this.products = products;
    this.date = date;
    this.user = user;
  }

  public get id(): string {
    return this._id;
  }

  public get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  public get date(): Date {
    return this._date;
  }

  public get paymentDate(): Date {
    return this._paymentDate;
  }

  public get user(): User {
    return this._user;
  }

  public get products(): Product[] {
    return this._products;
  }

  public set id(value: string) {
    this._id = value;
  }

  public set orderStatus(value: OrderStatus) {
    this._orderStatus = value;
  }

  public set date(value: Date) {
    this._date = value;
  }

  public set paymentDate(value: Date) {
    this._paymentDate = value;
  }

  public set user(value: User) {
    this._user = value;
  }

  public set products(value: Product[]) {
    this._products = value;
  }

  public pay() {
    if (this.orderStatus !== 'WAITING_PAYMENT') {
      throw new Error('O pedido já foi pago!');
    }
    this.orderStatus = 'RECEIVED';
  }

}