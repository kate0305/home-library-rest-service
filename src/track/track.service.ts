import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TrackDto } from './dto/track.dto';

@Injectable()
export class TrackService {
  constructor(
    private prisma: PrismaService,
    private favsService: FavoritesService,
  ) {}

  async getAll() {
    return await this.prisma.track.findMany();
  }

  async getOne(id: string) {
    const track = await this.prisma.track.findUnique({
      where: {
        id: id,
      },
    });
    if (!track) throw new NotFoundException('track is not found');
    return track;
  }

  async create({ name, artistId, albumId, duration }: TrackDto) {
    const newtrack = await this.prisma.track.create({
      data: {
        name,
        artistId,
        albumId,
        duration,
      },
    });
    return newtrack;
  }

  async update(id: string, trackDTO: TrackDto) {
    await this.getOne(id);
    return await this.prisma.track.update({
      where: { id: id },
      data: { ...trackDTO },
    });
  }

  async delete(id: string) {
    await this.getOne(id);
    return await this.prisma.track.delete({
      where: { id: id },
    });
  }
  async deleteAll() {
    return await this.prisma.track.deleteMany({});
  }

  async updateArtistId(id: string) {
    const tracks = await this.prisma.track.findMany();
    tracks.forEach((track) => {
      if (track.artistId === id) track.artistId = null;
    });
  }

  async updateAlbumId(id: string) {
    const tracks = await this.prisma.track.findMany();
    tracks.forEach((track) => {
      if (track.albumId === id) track.albumId = null;
    });
  }
}
