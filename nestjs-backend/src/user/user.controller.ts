import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Inject,
  LoggerService,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseFilters,
  UseGuards,
} from '@nestjs/common'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { TypeormFilter } from '../filters/typeorm.filter'
import { UserQuery } from './dto/get-user.dto'
import { User } from './user.entity'
import { UserService } from './user.service'
import { CreateUserPipe } from './pipes/create-user.pipe'
import { CreateUserDto } from './dto/create-user.dto'
import { AuthGuard } from '@nestjs/passport'
import { AdminGuard } from '../guards/admin.guard'
import { JwtGuard } from '../guards/jwt.guard'

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
  async addUser(@Body(CreateUserPipe) userDto: CreateUserDto) {
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
    return this.userService.remove(id)
  }

  @Get('/profile')
  @UseGuards(AdminGuard)
  @UseGuards(JwtGuard)
  getUserProfile(@Query('id', ParseIntPipe) id: any, @Req() req) {
    console.log('🚀 ~ file: user.controller.ts:78 ~ UserController ~ getUserProfile ~ req', req.user)
    return this.userService.findProfile(id)
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
