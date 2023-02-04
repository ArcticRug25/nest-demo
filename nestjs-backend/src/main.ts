import { Logger, ValidationPipe } from '@nestjs/common'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { AppModule } from './app.module'
import { AllExceptionFilter } from './filters/all-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger,
  })
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))

  const logger = new Logger()
  const httpAdapter = app.get(HttpAdapterHost)
  app.useGlobalFilters(new AllExceptionFilter(logger, httpAdapter))
  app.useGlobalPipes(
    new ValidationPipe({
      // 去除在类上不存在的内容
      // whitelist: true
    }),
  )

  await app.listen(3000)
}
bootstrap()
