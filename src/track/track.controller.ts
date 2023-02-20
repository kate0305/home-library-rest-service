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
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getAll() {
    return this.trackService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.trackService.getOne(id);
  }

  @Post()
  create(@Body() trackDto: TrackDto) {
    return this.trackService.create(trackDto);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() trackDto: TrackDto,
  ) {
    return this.trackService.update(id, trackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.trackService.delete(id);
  }
}
