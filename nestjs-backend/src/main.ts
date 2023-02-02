import { Logger } from '@nestjs/common'
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

  await app.listen(3000)
}
bootstrap()
