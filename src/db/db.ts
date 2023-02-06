import { Injectable } from '@nestjs/common';
import { Album } from 'src/album/album.entity';
import { Artist } from 'src/artist/artist.entity';
import { Favorites } from 'src/favorites/interfaces/favorites.interface';
import { Track } from 'src/track/track.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class Database {
  users: User[] = [];
  artists: Artist[] = [];
  tracks: Track[] = [];
  albums: Album[] = [];
  favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };
}
