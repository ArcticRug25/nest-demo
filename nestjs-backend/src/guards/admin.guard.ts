import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Request } from 'express'
import { User } from 'src/user/user.entity'
import { UserService } from '../user/user.service'

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>()
    const payloadUser = req.user as User
    const user = await this.userService.find(payloadUser.username)
    console.log('🚀 ~ file: admin.guard.ts:14 ~ AdminGuard ~ canActivate ~ user', user)
    if (user.roles.filter((role) => role.id === 1).length) {
      return true
    }
    return false
  }
}
