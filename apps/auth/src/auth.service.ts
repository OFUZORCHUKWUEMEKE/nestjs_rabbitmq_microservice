import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) { }

  async getUsers() {
    return await this.userRepository.find({})
  }

  async postUser(body){   
    try {
      return await this.userRepository.create(body)
    } catch (error) {
      throw new HttpException(error,403)
    } 
  }

} 
