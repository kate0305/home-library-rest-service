import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return users.map((user) => {
      const createTime = new Date(user.createdAt).getTime();
      const updatedTime = new Date(user.updatedAt).getTime();
      return { ...user, createdAt: createTime, updatedAt: updatedTime };
    });
  }

  async getOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) throw new NotFoundException('User is not found');
    const createTime = new Date(user.createdAt).getTime();
    const updatedTime = new Date(user.updatedAt).getTime();
    return { ...user, createdAt: createTime, updatedAt: updatedTime };
  }

  async create({ login, password }: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        login,
        password,
      },
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    const createTime = new Date(user.createdAt).getTime();
    const updatedTime = new Date(user.updatedAt).getTime();
    return { ...user, createdAt: createTime, updatedAt: updatedTime };
  }

  async update(id: string, { oldPassword, newPassword }: UpdatePasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    if (!user) throw new NotFoundException('User is not found');
    if (user.password !== oldPassword)
      throw new ForbiddenException('Incorrect password');
    const userUpdate = await this.prisma.user.update({
      where: { id: id },
      data: { password: newPassword, version: ++user.version },
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    const createTime = new Date(userUpdate.createdAt).getTime();
    const updatedTime = new Date(userUpdate.updatedAt).getTime();
    return { ...userUpdate, createdAt: createTime, updatedAt: updatedTime };
  }

  async delete(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    if (!user) throw new NotFoundException('User is not found');
    return await this.prisma.user.delete({
      where: { id: id },
    });
  }
}
