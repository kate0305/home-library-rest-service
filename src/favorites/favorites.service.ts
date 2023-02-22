import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { FavsResponse } from './interfaces/favsResponse.interface';
import { Album, Artist, Track } from '@prisma/client';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<FavsResponse> {
    const favorites = await this.prisma.favorites.findMany({
      select: {
        albums: {
          select: { id: true, name: true, year: true, artistId: true },
        },
        artists: {
          select: {
            id: true,
            name: true,
            grammy: true,
          },
        },
        tracks: {
          select: {
            id: true,
            name: true,
            artistId: true,
            albumId: true,
            duration: true,
          },
        },
      },
    });
    if (!favorites.length) return { albums: [], artists: [], tracks: [] };
    return favorites[0];
  }

  async deleteAll(): Promise<void> {
    this.prisma.favorites.deleteMany();
  }

  async addTrack(id: string): Promise<Track> {
    const track = await this.prisma.track.findUnique({
      where: {
        id: id,
      },
    });
    if (!track)
      throw new UnprocessableEntityException(
        'Track with this ID does not exist',
      );

    const favorites = await this.prisma.favorites.findMany();
    if (!favorites.length) {
      const createFavs = await this.prisma.favorites.create({ data: {} });

      await this.prisma.track.update({
        where: { id },
        data: { favoritesId: createFavs.id },
      });
    } else {
      await this.prisma.track.update({
        where: { id },
        data: { favoritesId: favorites[0].id },
      });
    }
    return track;
  }

  async deleteTrack(id: string): Promise<void> {
    const track = await this.prisma.track.findUnique({
      where: {
        id: id,
      },
    });
    if (!track)
      throw new NotFoundException(
        'This track is not on the list of favourites',
      );
    await this.prisma.track.update({
      where: { id },
      data: { favoritesId: null },
    });
  }

  async addAlbum(id: string): Promise<Album> {
    const album = await this.prisma.album.findUnique({
      where: {
        id: id,
      },
    });
    if (!album)
      throw new UnprocessableEntityException(
        'Album with this ID does not exist',
      );

    const favorites = await this.prisma.favorites.findMany();
    if (!favorites.length) {
      const createFavs = await this.prisma.favorites.create({ data: {} });

      await this.prisma.album.update({
        where: { id },
        data: { favoritesId: createFavs.id },
      });
    } else {
      await this.prisma.album.update({
        where: { id },
        data: { favoritesId: favorites[0].id },
      });
    }
    return album;
  }

  async deleteAlbum(id: string): Promise<void> {
    const album = await this.prisma.album.findUnique({
      where: {
        id: id,
      },
    });
    if (!album)
      throw new NotFoundException(
        'This album is not on the list of favourites',
      );
    await this.prisma.album.update({
      where: { id },
      data: { favoritesId: null },
    });
  }

  async addArtist(id: string): Promise<Artist> {
    const artist = await this.prisma.artist.findUnique({
      where: {
        id: id,
      },
    });
    if (!artist)
      throw new UnprocessableEntityException(
        'Artist with this ID does not exist',
      );

    const favorites = await this.prisma.favorites.findMany();
    if (!favorites.length) {
      const createFavs = await this.prisma.favorites.create({ data: {} });

      await this.prisma.artist.update({
        where: { id },
        data: { favoritesId: createFavs.id },
      });
    } else {
      await this.prisma.artist.update({
        where: { id },
        data: { favoritesId: favorites[0].id },
      });
    }
    return artist;
  }

  async deleteArtist(id: string): Promise<void> {
    const artist = await this.prisma.artist.findUnique({
      where: {
        id: id,
      },
    });
    if (!artist)
      throw new NotFoundException(
        'This artist is not on the list of favourites',
      );
    await this.prisma.artist.update({
      where: { id },
      data: { favoritesId: null },
    });
  }
}
