import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Database } from 'src/db/db';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TrackService } from 'src/track/track.service';
import { Album } from './album.entity';
import { AlbumDto } from './dto/album.dto';

@Injectable()
export class AlbumService {
  constructor(
    private prisma: PrismaService,
    private trackService: TrackService,
    private favsService: FavoritesService,
  ) {}

  async getAll() {
    return this.prisma.album.findMany();
  }

  async getOne(id: string) {
    const album = await this.prisma.album.findUnique({
      where: {
        id: id,
      },
    });
    if (!album) throw new NotFoundException('Album is not found');
    return album;
  }

  async create({ name, year, artistId }: AlbumDto) {
    return await this.prisma.album.create({
      data: {
        name,
        year,
        artistId,
      },
    });
  }

  async update(id: string, albumDto: AlbumDto) {
    await this.getOne(id);
    return await this.prisma.album.update({
      where: { id: id },
      data: { ...albumDto },
    });
  }

  async delete(id: string) {
    await this.getOne(id);
    return await this.prisma.album.delete({
      where: { id: id },
    });
    // const index = this.prisma.album.findIndex((album) => album.id === id);
    // if (index === -1) throw new NotFoundException('Album is not found');
    // this.prisma.album.splice(index, 1);

    this.trackService.updateAlbumId(id);
    // if (this.prisma.favorite.albums.includes(id)) this.favsService.deleteAlbum(id);
  }

  async updateArtistId(id: string) {
    const tracks = await this.prisma.album.findMany();
    tracks.forEach((artist) => {
      if (artist.artistId === id) artist.artistId = null;
    });
  }
}
