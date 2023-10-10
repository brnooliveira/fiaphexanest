export class Course {
  public id?: string;
  public name: string;
  public description: string;

  constructor(data: { id?: string; name: string; description: string }) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
  }
}
