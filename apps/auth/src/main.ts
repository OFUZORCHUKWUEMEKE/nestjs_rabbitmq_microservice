import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import configuration from './config/config';
import { SharedService } from 'y/shared';

const config = configuration()

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  // await app.listen(3000);
  const queue = config.RABBITMQ_AUTH_QUEUE



  const sharedService = app.get(SharedService)

  app.connectMicroservice(sharedService.getRmqOptions(queue))

  app.startAllMicroservices()
}
bootstrap();
