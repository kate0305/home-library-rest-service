import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PrismaService } from '../database/prisma.service';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { SALT } from 'src/utils/constants';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => {
      const createTime = new Date(user.createdAt).getTime();
      const updatedTime = new Date(user.updatedAt).getTime();
      return { ...user, createdAt: createTime, updatedAt: updatedTime };
    });
  }

  async getOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) throw new NotFoundException('User is not found');
    const createTime = new Date(user.createdAt).getTime();
    const updatedTime = new Date(user.updatedAt).getTime();
    return { ...user, createdAt: createTime, updatedAt: updatedTime };
  }

  async getOneByLogin(login: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        login,
      },
    });
    if (!user) throw new ForbiddenException('User is not found');
    const createTime = new Date(user.createdAt).getTime();
    const updatedTime = new Date(user.updatedAt).getTime();
    return { ...user, createdAt: createTime, updatedAt: updatedTime };
  }

  async create({ login, password }: CreateUserDto): Promise<User> {
    const hash = await bcrypt.hash(password, +SALT);
    const user = await this.prisma.user.create({
      data: {
        login,
        password: hash,
      },
    });
    const createTime = user.createdAt.getTime();
    const updatedTime = user.updatedAt.getTime();
    return { ...user, createdAt: createTime, updatedAt: updatedTime };
  }

  async update(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    if (!user) throw new NotFoundException('User is not found');
    const isMatchPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isMatchPassword) throw new ForbiddenException('Incorrect password');
    const hash = await bcrypt.hash(newPassword, +SALT);
    const userUpdate = await this.prisma.user.update({
      where: { id: id },
      data: { password: hash, version: ++user.version },
    });
    const createTime = userUpdate.createdAt.getTime();
    const updatedTime = userUpdate.updatedAt.getTime();
    return { ...userUpdate, createdAt: createTime, updatedAt: updatedTime };
  }

  async delete(id: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    if (!user) throw new NotFoundException('User is not found');
    await this.prisma.user.delete({
      where: { id: id },
    });
  }
}
