import { Cpf } from "../value-objects/cpf";
import { Email } from "../value-objects/email";

export class User {
  id: string;
  name: string;
  cpf: Cpf;
  email: Email;

  constructor(id: string, name: string, cpf: Cpf, email: Email) {
    this.id = id;
    this.name = name;
    this.cpf = cpf;
    this.email = email;
  }
}
