import { Injectable, NotFoundException } from '@nestjs/common';
import { Database } from 'src/db/db';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TrackService } from 'src/track/track.service';
import { Album } from './album.entity';
import { AlbumDto } from './dto/album.dto';

@Injectable()
export class AlbumService {
  constructor(
    private db: Database,
    private trackService: TrackService,
    private favsService: FavoritesService,
  ) {}

  getAll(): Album[] {
    return this.db.albums;
  }

  getOne(id: string): Album {
    const album = this.db.albums.find((album) => album.id === id);
    if (!album) throw new NotFoundException('Album is not found');
    return album;
  }

  create({ name, year, artistId }: AlbumDto) {
    const newAlbum = new Album(name, year, artistId);
    this.db.albums.push(newAlbum);
    return newAlbum;
  }

  update(id: string, albumDto: AlbumDto) {
    const index = this.db.albums.findIndex((album) => album.id === id);
    if (index === -1) throw new NotFoundException('Artist is not found');
    this.db.albums[index] = { id, ...albumDto };
    return this.db.albums[index];
  }

  delete(id: string) {
    const index = this.db.albums.findIndex((album) => album.id === id);
    if (index === -1) throw new NotFoundException('Album is not found');
    this.db.albums.splice(index, 1);
    this.trackService.updateAlbumId(id);
    if (this.db.favorites.albums.includes(id)) this.favsService.deleteAlbum(id);
  }

  updateArtistId(id: string) {
    this.db.albums.forEach((artist) => {
      if (artist.artistId === id) artist.artistId = null;
    });
  }
}
