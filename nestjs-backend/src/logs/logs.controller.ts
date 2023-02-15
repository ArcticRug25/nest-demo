import { CaslGuard } from './../guards/casl.guard'
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'
import { Serialize } from 'src/decorators/serialize.decorator'
import { AdminGuard } from '../guards/admin.guard'
import { JwtGuard } from '../guards/jwt.guard'
import { CheckPolices, Can, Cannot } from '../decorators/casl.decorator'
import { Logs } from './logs.entity'
import { Action } from '../enum/action.enum'

class LogsDto {
  @IsString()
  @IsNotEmpty()
  msg: string

  @IsString()
  @Expose()
  id: string
}

class PublicLogsDto {
  @Expose()
  msg
}

@Controller('logs')
@UseGuards(JwtGuard, AdminGuard, CaslGuard)
// @CheckPolices((ability) => ability.can(Action.Read, Logs))
// @Can(Action.Update, Logs)
// @Can(Action.Read, Logs)
@Cannot(Action.Manage, Logs)
export class LogsController {
  @Get()
  // @Can(Action.Update, Logs)
  @CheckPolices((ability) => ability.can(Action.Read, Logs), (ability) => ability.can(Action.Update, Logs))
  getTest() {
    return '2'
  }

  @Post()
  @Serialize(PublicLogsDto)
  postTest(@Body() dto: LogsDto) {
    console.log('🚀 ~ file: logs.controller.ts:15 ~ LogsController ~ postTest ~ dto', dto)
    return dto
  }
}
