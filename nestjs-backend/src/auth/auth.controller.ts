import { SigninUserDto } from './dto/signin-user.dto'
import { Body, Controller, Post, UseFilters } from '@nestjs/common'
import { TypeormFilter } from 'src/filters/typeorm.filter'
import { AuthService } from './auth.service'

@Controller('auth')
@UseFilters(new TypeormFilter())
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  async signin(@Body() dto: SigninUserDto) {
    const { username, password } = dto
    const token = await this.authService.signin(username, password)
    return {
      access_token: token,
    }
  }

  @Post('/signup')
  signup(@Body() dto: SigninUserDto) {
    const { username, password } = dto
    return this.authService.signup(username, password)
  }
}
