import { Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices'

@Controller("auth")
export class AppController {
  constructor(private readonly appService: AppService, @Inject('AUTH_SERVICE') private authService: ClientProxy) { }

  @Get("")
  async getUser() {
    return this.authService.send({
      cmd: 'get-users'
    }, {})
  }

  @Post("/")
  async PostUser() {
    return this.authService.send({
      cmd: 'post-users'
    }, {})
  }

}

