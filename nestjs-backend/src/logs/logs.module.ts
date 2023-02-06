import { Module } from '@nestjs/common'
import { utilities, WinstonModule, WinstonModuleOptions } from 'nest-winston'
import { ConfigService } from '@nestjs/config'
import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import { ConfigEnum } from '../enum/config.enum'
import { LogsController } from './logs.controller'
import { UserModule } from 'src/user/user.module'
import { UserService } from '../user/user.service'
import { LogsService } from './logs.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/user/user.entity'
import { Logs } from './logs.entity'
import { Roles } from 'src/roles/roles.entity'

const consoleTransports = new winston.transports.Console({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), utilities.format.nestLike()),
})

const dailyWarnTransports = createDailyTransportsByLevel('warn', 'error')

const dailyInfoTransports = createDailyTransportsByLevel('info', 'application')

function createDailyTransportsByLevel(fileName: string, level: string) {
  return new DailyRotateFile({
    level,
    dirname: 'logs',
    filename: `${fileName}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(winston.format.timestamp(), winston.format.simple()),
  })
}

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Logs, Roles]),

    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isLogOn = configService.get(ConfigEnum.LOG).on
        return {
          transports: [consoleTransports, ...(isLogOn ? [dailyWarnTransports, dailyInfoTransports] : [])],
        } as WinstonModuleOptions
      },
    }),
    UserModule,
  ],
  providers: [LogsService, UserService],
  controllers: [LogsController],
})
export class LogsModule {}
