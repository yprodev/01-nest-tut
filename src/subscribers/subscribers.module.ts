import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";

import { SERVICE as S } from './subscribers.constants'
import { SubscribersController } from "./subscribers.controller";

@Module({
  imports: [ConfigModule],
  controllers: [SubscribersController],
  providers: [
    {
      provide: S.NAME,
      useFactory: (configService: ConfigService) => (
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get(S.HOST),
            port: configService.get(S.PORT)
          }
        })
      ),
      inject: [ConfigService]
    }
  ]
})
export class SubscribersModule {}

