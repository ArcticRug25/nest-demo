import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { utilities, WinstonModule } from 'nest-winston'
import * as winston from 'winston'
import { AppModule } from './app.module'
import 'winston-daily-rotate-file'
import { HttpExceptionFilter } from './filter/http-exception.filter'
import { AllExceptionFilter } from './filter/all-exception.filter'

async function bootstrap() {
  const instance = winston.createLogger({
    transports: [
      new winston.transports.Console({
        level: 'info',
        format: winston.format.combine(winston.format.timestamp(), utilities.format.nestLike()),
      }),
      new winston.transports.DailyRotateFile({
        level: 'warn',
        dirname: 'logs',
        filename: 'application-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        format: winston.format.combine(winston.format.timestamp(), winston.format.simple()),
      }),
      new winston.transports.DailyRotateFile({
        level: 'info',
        dirname: 'logs',
        filename: 'info-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        format: winston.format.combine(winston.format.timestamp(), winston.format.simple()),
      }),
    ],
  })
  const logger = WinstonModule.createLogger({
    instance,
  })
  const app = await NestFactory.create(AppModule, {
    logger,
  })
  const httpAdapter = app.get(HttpAdapterHost)
  app.useGlobalFilters(new AllExceptionFilter(logger, httpAdapter))
  // app.setGlobalPrefix('api/v1')
  await app.listen(3000)
}
bootstrap()
