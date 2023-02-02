import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Inject,
  LoggerService,
  Param,
  Patch,
  Post,
  Query,
  UnauthorizedException,
  UseFilters,
} from '@nestjs/common'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { TypeormFilter } from '../filters/typeorm.filter'
import { UserQuery } from './dto/get-user.dto'
import { User } from './user.entity'
import { UserService } from './user.service'

@Controller('user')
@UseFilters(new TypeormFilter())
export class UserController {
  constructor(
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
  async addUser(@Body() userDto: any) {
    return await this.userService.create(userDto)
  }

  @Patch('/:id')
  updateUser(@Body() dto: any, @Param('idsxxx') id: number, @Headers('Authorization') headers: any) {
    console.log('🚀 ~ file: user.controller.ts:50 ~ UserController ~ updateUser ~ headers', headers)
    // TODO
    // 权限1：判断用户是否是自己
    // 权限2：判断用户是否有更新user的权限
    // 返回数据：不能包含敏感的password等信息
    if (headers === id) {
      const user = dto as User
      return this.userService.update(id, user)
    } else {
      throw new UnauthorizedException()
    }
  }

  @Delete('/:id')
  removeUser(@Param('id') id: number) {
    this.userService.remove(id)
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
