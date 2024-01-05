import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsDefined({ message: 'Login field is required' })
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsDefined({ message: 'Password field is required' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
