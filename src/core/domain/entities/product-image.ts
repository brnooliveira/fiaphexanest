import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product";

@Entity()
export class ProductImage {

  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  private _id: string;

  @Column({ name: 'path' })
  private _path: string;

  @ManyToOne(() => Product, { cascade: true })
  private _product: Product;

  constructor(path: string, product: Product, id?: string,) {
    this.path = path;
    this.product = product;
    this.id = id;
  }

  public get id(): string {
    return this._id;
  }

  public get path(): string {
    return this._path;
  }

  public get product(): Product {
    return this._product;
  }

  public set id(value: string) {
    this._id = value;
  }

  public set path(value: string) {
    this._path = value;
  }

  public set product(value: Product) {
    this._product = value;
  }

}