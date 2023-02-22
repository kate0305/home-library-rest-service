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
import { TrackDto } from './dto/track.dto';
import { Track } from './track.entity';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async getAll(): Promise<Track[]> {
    return await this.trackService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.trackService.getOne(id);
  }

  @Post()
  async create(@Body() trackDto: TrackDto): Promise<Track> {
    return await this.trackService.create(trackDto);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() trackDto: TrackDto,
  ): Promise<Track> {
    return await this.trackService.update(id, trackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    await this.trackService.delete(id);
  }

  @Delete()
  @HttpCode(204)
  async deleteAll(): Promise<void> {
    await this.trackService.deleteAll();
  }
}
