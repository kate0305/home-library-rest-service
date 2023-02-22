import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { AlbumDto } from './dto/album.dto';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Album[]> {
    return this.prisma.album.findMany();
  }

  async getOne(id: string): Promise<Album> {
    const album = await this.prisma.album.findUnique({
      where: {
        id: id,
      },
    });
    if (!album) throw new NotFoundException('Album is not found');
    return album;
  }

  async create({ name, year, artistId }: AlbumDto): Promise<Album> {
    return await this.prisma.album.create({
      data: {
        name,
        year,
        artistId,
      },
    });
  }

  async update(id: string, albumDto: AlbumDto): Promise<Album> {
    await this.getOne(id);
    return await this.prisma.album.update({
      where: { id: id },
      data: { ...albumDto },
    });
  }

  async delete(id: string): Promise<void> {
    await this.getOne(id);
    await this.prisma.album.delete({
      where: { id: id },
    });
  }
}
