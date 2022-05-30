import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, Post, Req, Res, UseGuards, UseInterceptors } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { RegisterDto } from "./dto/register.dto";
import JwtAuthGuard from "./jwtAuth.guard";
import { LocalAuthGuard } from "./localAuth.guard";
import { RequestWithUser } from './requestWithUser.interface'
import JwtRefreshTokenGuard from "./jwtRefreshToken.guard";

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: RequestWithUser) {
    const { user } = request;

    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(user.id);
    const { cookie: refreshTokenCookie, token: refreshToken } = this.authService.getCookieWithJwtRefreshToken(user.id);

    await this.usersService.setCurrentRefreshToken(refreshToken, user.id);

    //FIXME: The author suggests to add an array, like: [accessTokenCookie, refreshTokenCookie]
    // However, it does not work... Left just with one token. No additional time for it.
    request.res.setHeader('Set-Cookie', accessTokenCookie);

    return user;
  }

  @UseGuards(JwtRefreshTokenGuard)
  @Get('refresh')
  refresh(@Req() request: RequestWithUser) {
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(request.user.id);

    request.res.setHeader('Set-Cookie', accessTokenCookie);

    return request.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    return request.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logOut(@Req() request: RequestWithUser) {
    await this.usersService.removeRefreshToken(request.user.id);
    request.res.setHeader('Set-Cookie', this.authService.getCookieForLogout());
  }
}
