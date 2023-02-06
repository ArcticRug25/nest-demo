import { Controller, Get, UseGuards } from '@nestjs/common'
import { JwtGuard } from '../guards/jwt.guard'
import { AdminGuard } from '../guards/admin.guard'

@Controller('logs')
@UseGuards(JwtGuard, AdminGuard)
export class LogsController {
  @Get()
  getTest() {
    return '2'
  }
}
