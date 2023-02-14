import { Injectable } from '@nestjs/common'
import { AbilityBuilder, createMongoAbility } from '@casl/ability'
import { Logs } from '../logs/logs.entity'
import { UserService } from '../user/user.service'
import { getEntities } from '../utils/common'

@Injectable()
export class CaslAbilityService {
  constructor(private userService: UserService) {}
  async forRoot(username: string) {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility)

    const user = await this.userService.find(username)

    user.roles.forEach((role) => {
      role.menus.forEach((menu) => {
        const actions = menu.acl.split(',')
        actions.forEach((action) => {
          can(action, getEntities(menu.path))
        })
      })
    })
    console.log('🚀 ~ file: casl-ability.service.ts:13 ~ CaslAbilityService ~ forRoot ~ user', user)
    // can('manage', 'all')
    // can('read', Logs)
    // cannot('update', Logs)

    const ability = build({
      detectSubjectType: (object) => object.constructor,
    })

    return ability
  }
}
