export class ProductImage {
  public readonly id: string;
  public readonly path: string;
  public readonly productId: string;

  constructor(path: string, productId: string, id?: string, ) {
    this.path = path;
    this.productId = productId;
    this.id = id;
  }
}