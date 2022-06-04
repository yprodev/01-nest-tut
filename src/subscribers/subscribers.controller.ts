import { Body, ClassSerializerInterceptor, Controller, Get, Inject, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import JwtAuthGuard from "../auth/jwtAuth.guard";

import { SERVICE as S, SERVICE_COMMANDS as S_CMD } from './subscribers.constants';
import { CreateSubscriberDto } from "./dto/createSubscriberdto";


@Controller('subscribers')
@UseInterceptors(ClassSerializerInterceptor)
export class SubscribersController {
  constructor(
    @Inject(S.NAME) private readonly subscribersService: ClientProxy
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getSubscribers() {
    return await this.subscribersService.send({
      cmd: S_CMD.GET_ALL_SUBSCRIBERS
    }, '')
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createPost(@Body() subscriber: CreateSubscriberDto) {
    return await this.subscribersService.send({
      cmd: S_CMD.ADD_SUBSCRIBER
    }, subscriber)
  }
}
