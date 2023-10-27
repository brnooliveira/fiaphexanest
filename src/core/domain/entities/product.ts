import { ProductCategory } from "../value-objects/product-category";
import { ProductImage } from "./product-image";

export class Product {
  public readonly id: string;
  public readonly name: string;
  public readonly productCategory: ProductCategory;
  public readonly price: number;
  public readonly description: string;
  public readonly images: ProductImage[];

  constructor($id: string, $name: string, $productCategory: ProductCategory, $price: number, $description: string, $images: ProductImage[]) {
    this.id = $id;
    this.name = $name;
    this.productCategory = $productCategory;
    this.price = $price;
    this.description = $description;
    this.images = $images;
  }
}