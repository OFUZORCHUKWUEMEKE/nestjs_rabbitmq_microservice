import { Body, Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Ctx, RmqContext } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @MessagePattern({ cmd: 'get-users' })
  async getUser(@Ctx() context: RmqContext) {
    const channel = context.getChannelRef()
    const message = context.getMessage()     

    channel.ack(message)

    return await this.authService.getUsers()
  }

  @MessagePattern({ cmd: 'post-users' })
  async postUser(@Ctx() context: RmqContext,@Body() body) {
    const channel = context.getChannelRef()
    const message = context.getMessage()

    channel.ack(message)

    return await this.authService.postUser(body)

  }
}
