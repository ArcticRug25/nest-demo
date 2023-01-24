import { Controller, Get } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ConfigEnum } from '../enum/config.enum'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private configService: ConfigService, private userService: UserService) {}

  @Get()
  async getUser() {
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
