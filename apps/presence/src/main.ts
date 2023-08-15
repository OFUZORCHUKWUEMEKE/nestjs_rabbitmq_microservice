import { NestFactory } from '@nestjs/core';
import { PresenceModule } from './presence.module';
import configuration from './config/config';
import { SharedService } from 'y/shared';

const config = configuration()

async function bootstrap() {
  const app = await NestFactory.create(PresenceModule);
  // await app.listen(3000);

  const queue = config.RABBITMQ_PRESENCE_QUEUE



  const sharedService = app.get(SharedService)

  app.connectMicroservice(sharedService.getRmqOptions(queue))

  app.startAllMicroservices()
}
bootstrap();
