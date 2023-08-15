import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'
// import configuration from 'apps/micro_service/config/config';
import configuration from './config/config';
import { UserEntity } from './user.entity';
import { datasourceOptions } from './db/data-source';

const config = configuration()
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    // envFilePath: '.env',
    load: [configuration]
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: () => ({
      type: 'postgres',
      url: config.POSTGRES_URI,
      autoLoadEntities: true,
      synchronize: true,
      entities: [UserEntity]
    }),
    // useFactory: () => ({
    //    ...datasourceOptions,
    //    autoLoadEntities:true,
    // })
  }),
  TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }    
