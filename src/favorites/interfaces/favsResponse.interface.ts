import { Album } from 'src/album/album.entity';
import { Artist } from 'src/artist/artist.entity';
import { Track } from 'src/track/track.entity';

export interface FavsResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
