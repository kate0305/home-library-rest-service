import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DBModule } from './db/db.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavoritesModule } from './favorites/favorites.module';
import { PrismaModule } from './database/prisma.module';

@Module({
  imports: [
    UserModule,
    DBModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavoritesModule,
    PrismaModule,
  ],
})
export class AppModule {}
