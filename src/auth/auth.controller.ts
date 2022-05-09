import { Body, Controller, Get, HttpCode, Post, Req, Res, SerializeOptions, UseGuards } from "@nestjs/common";
import { Response } from "express";

import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import JwtAuthGuard from "./jwtAuth.guard";
import { LocalAuthGuard } from "./localAuth.guard";
import { RequestWithUser } from './requestWithUser.interface'

@Controller('auth')
@SerializeOptions({
  strategy: 'excludeAll'
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: RequestWithUser) {
    const { user } = request;
    const cookie = this.authService.getCookieWithJwtToken(user.id);

    request.res.setHeader('Set-Cookie', cookie);

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    return request.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogout());
    
    return response.sendStatus(200); 
  }
}
