import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { UserService } from 'src/user/user.service'
import { ROLES_KEY } from '../decorators/roles.decorator'
import { Role } from '../enum/roles.enum'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector, private readonly userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requireRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()])
    if (!requireRoles) {
      return true
    }
    const req = context.switchToHttp().getRequest()
    const user = await this.userService.find(req.user.username)
    const roleIds = user.roles.map((role) => role.id)
    const flag = requireRoles.some((role) => roleIds.includes(role))
    return flag
  }
}
