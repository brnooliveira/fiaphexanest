export class ProductImage {
  private id: string;
  private path: string;

  constructor($id: string, $path: string) {
    this.id = $id;
    this.path = $path;
  }
}