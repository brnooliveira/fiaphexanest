
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cpf } from "../value-objects/cpf";
import { Email } from "../value-objects/email";
import { Order } from "./order";

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  private _id: string;

  @Column({ name: 'name' })
  private _name: string;

  @Column('text', { name: 'cpf' })
  private _cpf: Cpf;

  @Column('text', { name: 'email' })
  private _email: Email;

  @OneToMany(() => Order, (order) => order.user)
  private _orders: Order[];

  constructor(name: string, cpf: Cpf, email: Email, id?: string) {
    this.id = id;
    this.name = name;
    this.cpf = cpf;
    this.email = email;
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get cpf(): Cpf {
    return this._cpf;
  }

  public get email(): Email {
    return this._email;
  }

  public get orders(): Order[] {
    return this._orders;
  }

  public set id(value: string) {
    this._id = value;
  }

  public set name(value: string) {
    this._name = value;
  }

  public set cpf(value: Cpf) {
    this._cpf = value;
  }

  public set email(value: Email) {
    this._email = value;
  }

  public set orders(value: Order[]) {
    this._orders = value;
  }
}
