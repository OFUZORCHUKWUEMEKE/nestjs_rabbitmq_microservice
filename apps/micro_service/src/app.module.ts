import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
// import {Config}
import configuration from '../config/config';
import { AuthModule } from 'apps/auth/src/auth.module';

const config = configuration()
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    // envFilePath: './.env',
    load: [configuration]
  }),AuthModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: 'AUTH_SERVICE', useFactory: async (configService: ConfigService) => {
      const USER = config.RABBITMQ_USER       
      const PASSWORD = config.RABBITMQ_PASS
      const HOST = config.RABBITMQ_HOST
      const QUEUE = config.RABBITMQ_AUTH_QUEUE

      return ClientProxyFactory.create({
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
          // noAck:false,
          queue: QUEUE,
          queueOptions: {
            durable: true
          }
        }
      })
    }
  }],
})
export class AppModule{} 
