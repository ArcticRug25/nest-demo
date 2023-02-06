import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'
import { Serialize } from 'src/decorators/serialize.decorator'
import { AdminGuard } from '../guards/admin.guard'
import { JwtGuard } from '../guards/jwt.guard'

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
@UseGuards(JwtGuard, AdminGuard)
export class LogsController {
  @Get()
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
