import { Module } from '@nestjs/common'
import { utilities, WinstonModule, WinstonModuleOptions } from 'nest-winston'
import { ConfigService } from '@nestjs/config'
import * as winston from 'winston'
import * as DailyRotateFile from 'winston-daily-rotate-file'

const consoleTransports = new winston.transports.Console({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), utilities.format.nestLike()),
})

const dailyWarnTransports = createDailyTransportsByLevel('warn')

const dailyInfoTransports = createDailyTransportsByLevel('info')

function createDailyTransportsByLevel(level: string) {
  return new DailyRotateFile({
    level,
    dirname: 'logs',
    filename: 'application-%DATE%.log',
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
        const isLogOn = configService.get('log').on
        return {
          transports: [consoleTransports, ...(isLogOn ? [dailyWarnTransports, dailyInfoTransports] : [])],
        } as WinstonModuleOptions
      },
    }),
  ],
})
export class LogsModule {}
