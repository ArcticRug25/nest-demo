import { SigninUserDto } from './dto/signin-user.dto'
import { Body, Controller, Post, UseFilters } from '@nestjs/common'
import { TypeormFilter } from 'src/filters/typeorm.filter'
import { AuthService } from './auth.service'

@Controller('auth')
@UseFilters(new TypeormFilter())
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  signin(@Body() dto: SigninUserDto) {
    const { username, password } = dto
    return this.authService.signin(username, password)
  }

  @Post('/signup')
  signup(@Body() dto: SigninUserDto) {
    const { username, password } = dto
    return this.authService.signup(username, password)
  }
}
