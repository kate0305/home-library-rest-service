import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { AlbumDto } from './dto/album.dto';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<AlbumDto[]> {
    return this.prisma.album.findMany();
  }

  async getOne(id: string): Promise<AlbumDto> {
    const album = await this.prisma.album.findUnique({
      where: {
        id: id,
      },
    });
    if (!album) throw new NotFoundException('Album is not found');
    return album;
  }

  async create({ name, year, artistId }: AlbumDto): Promise<AlbumDto> {
    return await this.prisma.album.create({
      data: {
        name,
        year,
        artistId,
      },
    });
  }

  async update(id: string, albumDto: AlbumDto): Promise<AlbumDto> {
    await this.getOne(id);
    return await this.prisma.album.update({
      where: { id: id },
      data: { ...albumDto },
    });
  }

  async delete(id: string): Promise<AlbumDto> {
    await this.getOne(id);
    return await this.prisma.album.delete({
      where: { id: id },
    });
  }
}
