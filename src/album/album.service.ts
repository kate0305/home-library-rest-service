import { Injectable, NotFoundException } from '@nestjs/common';
import { Database } from 'src/db/db';
import { Album } from './album.entity';
import { AlbumDto } from './dto/album.dto';

@Injectable()
export class AlbumService {
  constructor(private db: Database) {}

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

  update(id: string, { name, year, artistId }: AlbumDto) {
    const album = this.getOne(id);
    album.name = name;
    album.year = year;
    album.artistId = artistId;
    return album;
  }

  delete(id: string) {
    const index = this.db.albums.findIndex((album) => album.id === id);
    if (index === -1) throw new NotFoundException('Album is not found');
    this.db.albums.splice(index, 1);
  }
}
