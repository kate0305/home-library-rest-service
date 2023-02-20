import { Module } from '@nestjs/common';
import { AlbumModule } from 'src/album/album.module';
import { PrismaModule } from 'src/database/prisma.module';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TrackModule } from 'src/track/track.module';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  imports: [AlbumModule, TrackModule, FavoritesModule, PrismaModule],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
