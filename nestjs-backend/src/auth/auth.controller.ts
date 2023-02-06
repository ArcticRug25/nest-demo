import { Body, ClassSerializerInterceptor, Controller, Post, UseFilters, UseInterceptors } from '@nestjs/common'
import { TypeormFilter } from 'src/filters/typeorm.filter'
import { AuthService } from './auth.service'
import { SigninUserDto } from './dto/signin-user.dto'

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
  @UseInterceptors(ClassSerializerInterceptor)
  signup(@Body() dto: SigninUserDto) {
    const { username, password } = dto
    return this.authService.signup(username, password)
  }
}
