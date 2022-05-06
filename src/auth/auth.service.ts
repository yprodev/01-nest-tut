import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UsersService } from "../users/users.service";
import { PostgresErrorCode } from '../database/postgresErrorCodes.enum'
import { RegisterDto } from '../auth/dto/register.dto'
import { TokenPayload } from './tokenPayload.interface';

const ROUNDS_NUMBER = 12;
const USER_EMAIL_EXISTS_MSG = 'User with this email already exists';
const SOMETHING_WRONG_MSG = 'User with this email already exists';
const CREDS_WRONG_MSG = 'Wrong credentials provided';

export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  public async register(registerationData: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerationData.password, ROUNDS_NUMBER);
    try {
      const createdUser = await this.usersService.create({
        ...registerationData,
        password: hashedPassword
      })

      //FIXME: We do it to hide in the response. We will fix it later.
      createdUser.password = undefined;
      return createdUser;
    } catch (err) {
      if (err?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(USER_EMAIL_EXISTS_MSG, HttpStatus.BAD_REQUEST);
      }

      throw new HttpException(SOMETHING_WRONG_MSG, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);

      //FIXME: We do it to hide in the response. We will fix it later.
      user.password = undefined
      return user;
    } catch (err) {
      throw new HttpException(CREDS_WRONG_MSG, HttpStatus.BAD_REQUEST);
    }
  }

  public getCookieWithJwtToken(userId: string) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);

    return `
      Authentication=${token};
      HttpOnly;
      Path=/;
      Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}
    `;
  }

  public getCookieForLogout() {
    return `
      Authentication=;
      HttpOnly;
      Path=/;
      Max-Age=0
    `;
  }

  private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(plainTextPassword, hashedPassword);

    if (!isPasswordMatching) {
      throw new HttpException(CREDS_WRONG_MSG, HttpStatus.BAD_REQUEST);
    }
  }
}