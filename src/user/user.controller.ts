import { Controller, Get, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private configService: ConfigService, private userService: UserService, private logger: Logger) {
    this.logger.log('UserController init')
  }

  @Get()
  async getUser() {
    this.logger.log('请求getUser成功')
    this.logger.warn('请求getUser成功')
    this.logger.error('请求getUser成功')
    this.logger.debug('请求getUser成功')
    this.logger.verbose('请求getUser成功')
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
