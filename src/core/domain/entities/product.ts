import { ProductCategory } from "../value-objects/product-category";
import { ProductImage } from "./product-image";

export class Product {
  private id: string;
  private name: string;
  private productCategory: ProductCategory;
  private price: number;
  private description: string;
  private images: ProductImage[];

  constructor($id: string, $name: string, $productCategory: ProductCategory, $price: number, $description: string, $images: ProductImage[]) {
    this.id = $id;
    this.name = $name;
    this.productCategory = $productCategory;
    this.price = $price;
    this.description = $description;
    this.images = $images;
  }
}