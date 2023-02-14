import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { CaslAbilityService } from '../auth/casl-ability.service'
import { CHECK_POLICIES_KEY, CaslHandlerType, PolicyHandlerCallback } from '../decorators/casl.decorator'

@Injectable()
export class CaslGuard implements CanActivate {
  constructor(private reflactor: Reflector, private caslAbilityService: CaslAbilityService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const handlers = this.reflactor.getAllAndMerge<PolicyHandlerCallback[]>(CHECK_POLICIES_KEY.HANDLER, [
      context.getHandler(),
      context.getClass(),
    ])

    const canHandlers = this.reflactor.getAllAndMerge<any[]>(CHECK_POLICIES_KEY.CAN, [
      context.getHandler(),
      context.getClass(),
    ]) as CaslHandlerType

    const cannotHandlers = this.reflactor.getAllAndMerge<any[]>(CHECK_POLICIES_KEY.CANNOT, [
      context.getHandler(),
      context.getClass(),
    ]) as CaslHandlerType

    // 判断，如果用户未设置任何一个，则直接返回 true
    if (!handlers || !canHandlers || !cannotHandlers) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const user = request.user

    if (!user) {
      return false
    }

    const ability = await this.caslAbilityService.forRoot(user.username)
    let flag = true
    if (handlers) {
      flag = flag && handlers.every((handler) => handler(ability))
    }

    if (flag && canHandlers) {
      if (Array.isArray(canHandlers)) {
        flag = flag && canHandlers.every((handler) => handler(ability))
      } else {
        flag = flag && canHandlers(ability)
      }
    }

    if (flag && cannotHandlers) {
      if (Array.isArray(cannotHandlers)) {
        flag = flag && cannotHandlers.every((handler) => handler(ability))
      } else {
        flag = flag && cannotHandlers(ability)
      }
    }

    return flag
  }
}
