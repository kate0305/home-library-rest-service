import { Exclude } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';

export class User {
  id = uuidv4();
  login: string;

  @Exclude()
  password: string;

  version = 1;
  createdAt = Date.now();
  updatedAt = Date.now();

  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
  }
}
