import { DynamicModule, Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { ConfigModule } from '@nestjs/config';
import configuration from 'apps/micro_service/config/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

const config = configuration()

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,

  })],
  providers: [SharedService],
  exports: [SharedService],
})
export class SharedModule {
  static registerRmq(service: string, queue: string): DynamicModule {
    return {
      module: SharedModule,
      providers: [
        {
          provide: service,
          useFactory: () => {
            const USER = config.RABBITMQ_USER
            const PASSWORD = config.RABBITMQ_PASS
            const HOST = config.RABBITMQ_HOST
            const QUEUE = config.RABBITMQ_PRESENCE_QUEUE

            return ClientProxyFactory.create({
              transport: Transport.RMQ,
              options: {
                urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
                // noAck:false,
                queue,
                queueOptions: {
                  durable: true
                }
              }
            })

          }
        }
      ]
    }
  }
}
