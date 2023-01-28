import { Module } from '@nestjs/common'
import { utilities, WinstonModule, WinstonModuleOptions } from 'nest-winston'
import { ConfigService } from '@nestjs/config'
import * as winston from 'winston'
import * as DailyRotateFile from 'winston-daily-rotate-file'
import { ConfigEnum } from '../enum/config.enum'

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
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isLogOn = configService.get(ConfigEnum.LOG).on
        return {
          transports: [consoleTransports, ...(isLogOn ? [dailyWarnTransports, dailyInfoTransports] : [])],
        } as WinstonModuleOptions
      },
    }),
  ],
})
export class LogsModule {}
