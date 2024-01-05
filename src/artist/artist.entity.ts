import { v4 as uuidv4 } from 'uuid';

export class Artist {
  id = uuidv4();
  name: string;
  grammy: boolean;

  constructor(name: string, grammy: boolean) {
    this.name = name;
    this.grammy = grammy;
  }
}
