import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [FavoritesModule, PrismaModule],
  providers: [TrackService],
  controllers: [TrackController],
  exports: [TrackService],
})
export class TrackModule {}
