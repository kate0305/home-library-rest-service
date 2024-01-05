import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { ArtistDto } from './dto/artist.dto';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Artist[]> {
    return await this.prisma.artist.findMany();
  }

  async getOne(id: string): Promise<Artist> {
    const artist = await this.prisma.artist.findUnique({
      where: {
        id: id,
      },
    });
    if (!artist) throw new NotFoundException('Artist is not found');
    return artist;
  }

  async create({ name, grammy }: ArtistDto): Promise<Artist> {
    return await this.prisma.artist.create({
      data: {
        name,
        grammy,
      },
    });
  }

  async update(id: string, artistDto: ArtistDto): Promise<Artist> {
    await this.getOne(id);
    return await this.prisma.artist.update({
      where: { id: id },
      data: { ...artistDto },
    });
  }

  async delete(id: string): Promise<void> {
    await this.getOne(id);
    await this.prisma.artist.delete({
      where: { id: id },
    });
  }
}
