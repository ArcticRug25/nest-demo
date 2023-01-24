import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import configuration from './common/configuration'
import { UserModule } from './user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user/user.entity'
import { Profile } from './user/profile.entity'
import { Logs } from './logs/logs.entity'
import { Roles } from './roles/roles.entity'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: 'localhost',
        username: 'root',
        password: 'wyw123456',
        database: 'test',
        entities: [User, Profile, Logs, Roles],
        synchronize: true,
        logging: true,
        // logging: ['error'],
      }),
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
