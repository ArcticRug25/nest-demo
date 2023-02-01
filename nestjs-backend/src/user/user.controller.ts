import { Body, Controller, Delete, Get, Inject, LoggerService, Param, Patch, Post, Query, Req } from '@nestjs/common'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { ConfigService } from '@nestjs/config'
import { UserService } from './user.service'
import { UserQuery } from './dto/get-user.dto'

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
  async getUsers(@Query() query: UserQuery) {
    console.log('🚀 ~ file: user.controller.ts:26 ~ UserController ~ getUsers ~ query', query)

    return await this.userService.findAll(query)
  }

  @Get('/info/:id')
  getUser(@Param('id') id: number): any {
    return 'hello'
  }

  @Post()
  addUser(@Body() dto: any, @Req() req): any {
    console.log('🚀 ~ file: user.controller.ts:28 ~ UserController ~ addUser ~ req', req)
    console.log('🚀 ~ file: user.controller.ts:28 ~ UserController ~ addUser ~ dto', dto)
  }

  @Patch('/:id')
  updateUser(@Body() dto: any, @Param('idsxxx') id: number) {
    console.log('🚀 ~ file: user.controller.ts:33 ~ UserController ~ updateUser ~ id', id)
    console.log('🚀 ~ file: user.controller.ts:33 ~ UserController ~ updateUser ~ dto', dto)
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: number) {
    console.log('🚀 ~ file: user.controller.ts:39 ~ UserController ~ deleteUser ~ id', id)
  }

  @Get('/profile')
  getUserProfile(@Query() query: any) {
    console.log('🚀 ~ file: user.controller.ts:45 ~ UserController ~ getUserProfile ~ query', query)
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
