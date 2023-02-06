import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavsResponse } from './interfaces/favsResponse.interface';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favsService: FavoritesService) {}

  @Get()
  getAll(): FavsResponse {
    return this.favsService.getAll();
  }

  @Post('track/:id')
  addTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  deleteTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): void {
    return this.favsService.deleteTrack(id);
  }

  @Post('album/:id')
  addAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  deleteAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): void {
    return this.favsService.deleteAlbum(id);
  }

  @Post('artist/:id')
  addArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  deleteArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): void {
    return this.favsService.deleteArtist(id);
  }
}
