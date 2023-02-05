import { IsBoolean, IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class ArtistDto {
  @IsDefined({ message: 'Name field is required' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDefined({ message: 'Grammy field is required' })
  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
