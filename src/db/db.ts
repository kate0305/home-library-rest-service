import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';

@Injectable()
export class Database {
  users: User[] = [];
  artists = [];
  tracks = [];
  albums = [];
  favorites = [];
}
