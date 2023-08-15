import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import configuration from './config/config';

const config = configuration()

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  // await app.listen(3000);

  const configService = app.get(ConfigService)
  const USER = config.RABBITMQ_USER       
  const PASSWORD = config.RABBITMQ_PASS
  const HOST = config.RABBITMQ_HOST
  const QUEUE = config.RABBITMQ_AUTH_QUEUE


  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
      noAck: false,
      queue: QUEUE,
      queueOptions: {
        durable: true
      }
    }
  })

  app.startAllMicroservices()
}
bootstrap();
