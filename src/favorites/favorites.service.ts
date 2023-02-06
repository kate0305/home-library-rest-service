import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Album } from 'src/album/album.entity';
import { Artist } from 'src/artist/artist.entity';
import { Database } from 'src/db/db';
import { Track } from 'src/track/track.entity';
import { FavsResponse } from './interfaces/favsResponse.interface';

@Injectable()
export class FavoritesService {
  constructor(private db: Database) {}

  getAll(): FavsResponse {
    const artists: Artist[] = this.db.artists.filter((artist) =>
      this.db.favorites.artists.includes(artist.id),
    );
    const albums: Album[] = this.db.albums.filter((artist) =>
      this.db.favorites.albums.includes(artist.id),
    );
    const tracks: Track[] = this.db.tracks.filter((artist) =>
      this.db.favorites.tracks.includes(artist.id),
    );
    return {
      artists: artists,
      albums: albums,
      tracks: tracks,
    };
  }

  get() {
    return this.db.favorites;
  }

  addTrack(id: string): Track {
    const track = this.db.tracks.find((track) => track.id === id);
    if (!track) throw new UnprocessableEntityException('Track is not found');
    this.db.favorites.tracks.push(id);
    return track;
  }

  deleteTrack(id: string) {
    const index = this.db.favorites.tracks.findIndex(
      (trackId) => trackId === id,
    );
    if (index === -1) throw new NotFoundException('Track is not favorites');
    this.db.favorites.tracks.splice(index, 1);
  }

  addAlbum(id: string): Album {
    const album = this.db.albums.find((album) => album.id === id);
    if (!album) throw new UnprocessableEntityException('Track is not found');
    this.db.favorites.albums.push(id);
    return album;
  }

  deleteAlbum(id: string) {
    const index = this.db.favorites.albums.findIndex(
      (albumId) => albumId === id,
    );
    if (index === -1) throw new NotFoundException('Track is not favorites');
    this.db.favorites.albums.splice(index, 1);
  }

  addArtist(id: string): Artist {
    const artist = this.db.artists.find((artist) => artist.id === id);
    if (!artist) throw new UnprocessableEntityException('Track is not found');
    this.db.favorites.artists.push(id);
    return artist;
  }

  deleteArtist(id: string) {
    const index = this.db.favorites.artists.findIndex(
      (artistId) => artistId === id,
    );
    if (index === -1) throw new NotFoundException('Track is not favorites');
    this.db.favorites.artists.splice(index, 1);
  }
}
