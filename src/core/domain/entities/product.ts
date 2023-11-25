import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductCategory } from "../value-objects/product-category";
import { ProductImage } from "./product-image";
import { Order } from "./order";

@Entity()
export class Product {

  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  private _id: string;

  @Column({ name: 'name' })
  private _name: string;

  @Column('text', { name: 'product_category' })
  private _productCategory: ProductCategory;

  @Column('decimal', { name: 'price' })
  private _price: number;

  @Column('text', { name: 'description' })
  private _description: string;

  @OneToMany(() => ProductImage, (productImage: ProductImage) => productImage.product, { cascade: true })
  private _productImages: ProductImage[];

  @ManyToMany(() => Order, (order: Order) => order.products)
  private _orders: Order[];

  constructor(name: string, productCategory: ProductCategory, price: number, description: string, id?: string, productImages?: ProductImage[]) {
    this.id = id;
    this.name = name;
    this.productCategory = productCategory;
    this.price = price;
    this.description = description;
    this.productImages = productImages;
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get productCategory(): ProductCategory {
    return this._productCategory;
  }

  public get price(): number {
    return this._price;
  }

  public get description(): string {
    return this._description;
  }

  public get productImages(): ProductImage[] {
    return this._productImages;
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

  public set productCategory(value: ProductCategory) {
    this._productCategory = value;
  }

  public set price(value: number) {
    this._price = value;
  }

  public set description(value: string) {
    this._description = value;
  }

  public set productImages(value: ProductImage[]) {
    this._productImages = value;
  }

  public set orders(value: Order[]) {
    this._orders = value;
  }

}