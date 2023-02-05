import { v4 as uuidv4 } from 'uuid';

export class Track {
  id = uuidv4();
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number

  constructor(
    name: string,
    artistId: string,
    albumID: string,
    duration: number,
  ) {
    this.name = name;
    this.artistId = artistId;
    this.albumId = albumID;
    this.duration = duration;
  }
}
