import { Controller, Get, Inject, LoggerService } from '@nestjs/common'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { ConfigService } from '@nestjs/config'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
  ) {
    this.logger.log('1')
  }

  @Get()
  async getUser() {
    // this.logger.log('请求getUser成功')
    // this.logger.warn('请求getUser成功')
    // this.logger.error('请求getUser成功')
    // this.logger.debug('请求getUser成功')
    // this.logger.verbose('请求getUser成功')
    return await this.userService.findAll()
  }

  @Get('/profile')
  getUserProfile() {
    return this.userService.findProfile(2)
  }

  @Get('/logs')
  getUserLogs() {
    return this.userService.findUserLogs(2)
  }

  @Get('/logsByGroup')
  getLogsByGroup() {
    return this.userService.findLogsByGroup(2)
  }
}
