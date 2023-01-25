import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { Logs } from '../logs/logs.entity'
import { Roles } from '../roles/roles.entity'
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
})
export class UserModule {}
console.log('process.env.NODE_ENV', process.env.NODE_ENV)
