import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { Logs } from '../logs/logs.entity'
import { Roles } from '../roles/role.entity'
import { User } from './user.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Logs, Roles]),
    // LoggerModule.forRoot({
    //   pinoHttp: {
    //     transport: {
    //       targets: [
    //         {
    //           level: 'info',
    //           target: 'pino-pretty',
    //           options: {
    //             colorize: true,
    //           },
    //         },
    //         {
    //           level: 'info',
    //           target: 'pino-roll',
    //           options: {
    //             file: join('logs', 'log.txt'),
    //             frequency: 'daily',
    //             size: '10M',
    //             mkdir: true,
    //           },
    //         },
    //       ],
    //     },
    //   },
    // }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
