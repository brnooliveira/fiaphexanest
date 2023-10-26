export class User {
  id?: string;
  name: string;
  cpf: string;

  constructor(id: string, name: string, cpf: string) {
    this.id = id;
    this.name = name;
    this.cpf = cpf;
  }
}
