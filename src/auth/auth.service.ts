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
import { ResponseBodyWithTokens } from './interfaces/response.interface';
import { VerifyToken } from './interfaces/verify-token.interface';

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

  async createTokens(
    id: string,
    login: string,
  ): Promise<ResponseBodyWithTokens> {
    const payload = { sub: id, login: login };
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

  async signIn({ login, password }: AuthDto): Promise<ResponseBodyWithTokens> {
    const user = await this.userService.getOneByLogin(login);
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!user || !isMatchPassword) {
      throw new ForbiddenException('Authentication failed');
    }
    return this.createTokens(user.id, user.login);
  }

  async refresh({ refreshToken }: RefreshDto): Promise<ResponseBodyWithTokens> {
    let verifyTokenData: VerifyToken;
    try {
      verifyTokenData = await this.jwtService.verifyAsync(refreshToken, {
        secret: SECRET_REFRESH,
      });
      console.log(verifyTokenData);
    } catch (error) {
      throw new ForbiddenException('Authentication failed');
    }
    return this.createTokens(verifyTokenData.sub, verifyTokenData.login);
  }
}
