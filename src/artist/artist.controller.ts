import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistDto } from './dto/artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async getAll(): Promise<ArtistDto[]> {
    return await this.artistService.getAll();
  }

  @Get(':id')
  async getOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<ArtistDto> {
    return await this.artistService.getOne(id);
  }

  @Post()
  async create(@Body() artistDto: ArtistDto): Promise<ArtistDto> {
    return await this.artistService.create(artistDto);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() artistDto: ArtistDto,
  ): Promise<ArtistDto> {
    return await this.artistService.update(id, artistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<ArtistDto> {
    return await this.artistService.delete(id);
  }
}
