import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { PrismaService } from 'src/database/prisma.service';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TrackService } from 'src/track/track.service';
import { ArtistDto } from './dto/artist.dto';

@Injectable()
export class ArtistService {
  constructor(
    private prisma: PrismaService,
    private albumService: AlbumService,
    private trackService: TrackService,
    private favsService: FavoritesService,
  ) {}

  async getAll() {
    return await this.prisma.artist.findMany();
  }

  async getOne(id: string) {
    try {
      return await this.prisma.artist.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new NotFoundException('Artist is not found');
    }
  }

  async create({ name, grammy }: ArtistDto) {
    return await this.prisma.artist.create({
      data: {
        name,
        grammy,
      },
    });
  }

  async update(id: string, artistDto: ArtistDto) {
    await this.getOne(id);
    return await this.prisma.artist.update({
      where: { id: id },
      data: { ...artistDto },
    });
  }

  async delete(id: string) {
    await this.getOne(id);
    return await this.prisma.artist.delete({
      where: { id: id },
    });
  }
}
