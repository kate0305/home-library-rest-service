import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Database } from 'src/db/db';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TrackDto } from './dto/track.dto';
import { Track } from './track.entity';

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
    // const index = await this.prisma.track.findMany();.findIndex((track) => track.id === id);
    // if (index === -1) throw new NotFoundException('Artist is not found');
    // this.prisma.track.findMany();[index] = { id, ...trackDTO };
    // return this.prisma.track.findMany();[index];
  }

  async delete(id: string) {
    await this.getOne(id);
    return await this.prisma.artist.delete({
      where: { id: id },
    });
    // const index = this.prisma.track.findMany();.findIndex((track) => track.id === id);
    // if (index === -1) throw new NotFoundException('track is not found');
    // this.prisma.track.findMany();.splice(index, 1);
    // if (this.prisma.favor.findMany();tes.tracks.includes(id)) this.favsService.deleteTrack(id);
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
