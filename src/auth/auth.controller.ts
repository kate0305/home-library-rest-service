import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/user.entity';
import { Public } from './decorators/custom-public.decorator';
import { RefreshDto } from './dto/refresh.dto';
import { BodyWithRefresh } from './decorators/custom-refresh.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.signUp(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signIn(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(
    @BodyWithRefresh(
      new ValidationPipe({
        validateCustomDecorators: true,
        whitelist: true,
        errorHttpStatusCode: HttpStatus.UNAUTHORIZED,
        exceptionFactory: () =>
          new UnauthorizedException('Refresh token does not exist'),
      }),
    )
    refresh: RefreshDto,
  ) {
    return await this.authService.refresh(refresh);
  }
}
