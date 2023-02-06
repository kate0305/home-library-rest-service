import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { Database } from 'src/db/db';
import { TrackService } from 'src/track/track.service';
import { Artist } from './artist.entity';
import { ArtistDto } from './dto/artist.dto';

@Injectable()
export class ArtistService {
  constructor(
    private db: Database,
    private albumService: AlbumService,
    private trackService: TrackService,
  ) {}

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

  update(id: string, artistDto: ArtistDto) {
    const index = this.db.artists.findIndex((artist) => artist.id === id);
    if (index === -1) throw new NotFoundException('Artist is not found');
    this.db.artists[index] = { id, ...artistDto };
    return this.db.artists[index];
  }

  delete(id: string) {
    const index = this.db.artists.findIndex((artist) => artist.id === id);
    if (index === -1) throw new NotFoundException('Artist is not found');
    //await Promise.all(this.db.artists.splice(index, 1));
    this.db.artists.splice(index, 1);
    this.albumService.updateArtistId(id);
    this.trackService.updateArtistId(id);
  }
}
