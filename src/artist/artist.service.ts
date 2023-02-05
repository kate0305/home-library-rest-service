import { Injectable, NotFoundException } from '@nestjs/common';
import { Database } from 'src/db/db';
import { Artist } from './artist.entity';
import { ArtistDto } from './dto/artist.dto';

@Injectable()
export class ArtistService {
  constructor(private db: Database) {}

  getAll(): Artist[] {
    return this.db.artists;
  }

  getOne(id: string): Artist {
    const artist = this.db.artists.find((artist) => artist.id === id);
    if (!artist) throw new NotFoundException('Artist is not found');
    return artist;
  }

  create({ name, grammy }: ArtistDto) {
    const newArtist = new Artist(name, grammy);
    this.db.artists.push(newArtist);
    return newArtist;
  }

  update(id: string, { name, grammy }: ArtistDto) {
    const artist = this.getOne(id);
    artist.name = name;
    artist.grammy = grammy;
    return artist;
  }

  delete(id: string) {
    const index = this.db.artists.findIndex((artist) => artist.id === id);
    if (index === -1) throw new NotFoundException('Artist is not found');
    this.db.artists.splice(index, 1);
  }
}
