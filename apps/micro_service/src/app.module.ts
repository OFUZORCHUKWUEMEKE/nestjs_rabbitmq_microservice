import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
// import {Config}
import configuration from '../config/config';
import { AuthModule } from 'apps/auth/src/auth.module';
import { SharedModule } from 'y/shared';

const config = configuration()
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    // envFilePath: './.env',
    load: [configuration]
  }), AuthModule, SharedModule.registerRmq('AUTH_SERVICE', config.RABBITMQ_AUTH_QUEUE), SharedModule.registerRmq('PRESENCE_SERVICE', config.RABBITMQ_PRESENCE_QUEUE),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} 
