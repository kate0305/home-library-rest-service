import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class AlbumDto {
  @IsDefined({ message: 'Name field is required' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDefined({ message: 'Grammy field is required' })
  @IsNotEmpty()
  @IsInt()
  year: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  artistId: string | null; // refers to Artist
}
