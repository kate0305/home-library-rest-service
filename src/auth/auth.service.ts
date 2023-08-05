import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import {
  EXPIRE_TIME,
  REFRESH_EXPIRE_TIME,
  SECRET,
  SECRET_REFRESH,
} from 'src/utils/constants';
import { AuthDto } from './dto/auth.dto';
import { RefreshDto } from './dto/refresh.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';
import { ResponseBody } from './response.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp({ login, password }: AuthDto): Promise<User> {
    const user = await this.userService.create({ login, password });
    return user;
  }

  async signIn({ login, password }: AuthDto): Promise<ResponseBody> {
    const user = await this.userService.getOneByLogin(login);
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!user || !isMatchPassword) {
      throw new ForbiddenException('Authentication failed');
    }
    const payload = { sub: user.id, login: user.login };
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: SECRET,
        expiresIn: EXPIRE_TIME,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        secret: SECRET_REFRESH,
        expiresIn: REFRESH_EXPIRE_TIME,
      }),
    };
  }
  async refresh({ refreshToken }: RefreshDto): Promise<ResponseBody> {
    const verifyToken = await this.jwtService.verifyAsync(refreshToken, {
      secret: SECRET_REFRESH,
    });
    if (!verifyToken) {
      throw new ForbiddenException('Authentication failed');
    }
    return {
      accessToken: await this.jwtService.signAsync(verifyToken, {
        secret: SECRET,
        expiresIn: EXPIRE_TIME,
      }),
      refreshToken: await this.jwtService.signAsync(verifyToken, {
        secret: SECRET_REFRESH,
        expiresIn: REFRESH_EXPIRE_TIME,
      }),
    };
  }
}
