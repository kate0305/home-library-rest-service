import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class TrackDto {
  @IsDefined({ message: 'Name field is required' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  artistId: string | null;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  albumId: string | null;

  @IsDefined({ message: 'Duration field is required' })
  @IsNotEmpty()
  @IsInt()
  duration: number;
}
