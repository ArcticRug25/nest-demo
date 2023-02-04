import { Injectable, HttpException } from '@nestjs/common'
import { UserQuery } from 'src/user/dto/get-user.dto'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signin(username: string, password: string) {
    const res = await this.userService.findAll({ username } as UserQuery)
    return res
  }

  async signup(username: string, password: string) {
    if (!username || !password) {
      throw new HttpException('用户名或密码不能为空', 400)
    }
    const res = await this.userService.create({
      username,
      password,
    })

    return res
  }
}
