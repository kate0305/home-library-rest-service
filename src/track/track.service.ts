import { Injectable, NotFoundException } from '@nestjs/common';
import { Database } from 'src/db/db';
import { TrackDto } from './dto/track.dto';
import { Track } from './track.entity';

@Injectable()
export class TrackService {
  constructor(private db: Database) {}

  getAll(): Track[] {
    return this.db.albums;
  }

  getOne(id: string): Track {
    const track = this.db.tracks.find((track) => track.id === id);
    if (!track) throw new NotFoundException('track is not found');
    return track;
  }

  create({ name, artistId, albumId, duration }: TrackDto) {
    const newtrack = new Track(name, artistId, albumId, duration);
    this.db.tracks.push(newtrack);
    return newtrack;
  }

  update(id: string, trackDTO: TrackDto) {
    let track = this.getOne(id);
    track = { id, ...trackDTO };
    // track.name = name;
    // track.year = year;
    // track.artistId = artistId;
    return track;
  }

  delete(id: string) {
    const index = this.db.tracks.findIndex((track) => track.id === id);
    if (index === -1) throw new NotFoundException('track is not found');
    this.db.tracks.splice(index, 1);
  }
}
