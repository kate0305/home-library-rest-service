import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { TrackDto } from './dto/track.dto';
import { Track } from './track.entity';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Track[]> {
    return await this.prisma.track.findMany();
  }

  async getOne(id: string): Promise<Track> {
    const track = await this.prisma.track.findUnique({
      where: {
        id: id,
      },
    });
    if (!track) throw new NotFoundException('track is not found');
    return track;
  }

  async create({
    name,
    artistId,
    albumId,
    duration,
  }: TrackDto): Promise<Track> {
    const newtrack = await this.prisma.track.create({
      data: {
        name,
        artistId,
        albumId,
        duration,
      },
    });
    return newtrack;
  }

  async update(id: string, trackDTO: TrackDto): Promise<Track> {
    await this.getOne(id);
    return await this.prisma.track.update({
      where: { id: id },
      data: { ...trackDTO },
    });
  }

  async delete(id: string): Promise<void> {
    await this.getOne(id);
    await this.prisma.track.delete({
      where: { id: id },
    });
  }

  async deleteAll(): Promise<void> {
    await this.prisma.track.deleteMany();
  }
}
