import { Injectable } from '@nestjs/common';
import { RmqOptions, Transport } from '@nestjs/microservices';
import configuration from 'apps/micro_service/config/config';


const config = configuration()

@Injectable()
export class SharedService {
    constructor() { }

    getRmqOptions(queue: string): RmqOptions {
        const USER = config.RABBITMQ_USER
        const PASSWORD = config.RABBITMQ_PASS
        const HOST = config.RABBITMQ_HOST
        const QUEUE = config.RABBITMQ_AUTH_QUEUE
        return {
            transport: Transport.RMQ,
            options: {
                urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
                noAck: false,
                queue,
                queueOptions: {
                    durable: true
                }
            }
        }
    }
}
