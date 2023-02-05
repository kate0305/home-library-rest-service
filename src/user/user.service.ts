import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Database } from 'src/db/db';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private db: Database) {}

  getAll(): User[] {
    return this.db.users;
  }

  getOne(id: string): User {
    const user = this.db.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User is not found');
    return user;
  }

  create({ login, password }: CreateUserDto) {
    const newUser = new User(login, password);
    this.db.users.push(newUser);
    return newUser;
  }

  update(id: string, { oldPassword, newPassword }: UpdatePasswordDto) {
    const user = this.getOne(id);
    if (user.password !== oldPassword)
      throw new ForbiddenException('Incorrect password');
    user.password = newPassword;
    user.version = ++user.version;
    user.updatedAt = Date.now();
    return user;
  }

  delete(id: string) {
    const index = this.db.users.findIndex((user) => user.id === id);
    if (index === -1) throw new NotFoundException('User is not found');
    this.db.users.splice(index, 1);
  }
}
