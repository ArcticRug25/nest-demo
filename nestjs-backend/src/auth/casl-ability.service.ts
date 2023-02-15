import { AbilityBuilder, createMongoAbility } from '@casl/ability'
import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { getEntities } from '../utils/common'

@Injectable()
export class CaslAbilityService {
  constructor(private userService: UserService) {}
  async forRoot(username: string) {
    const { can, build } = new AbilityBuilder(createMongoAbility)

    const user = await this.userService.find(username)

    user.roles.forEach((role) => {
      role.menus.forEach((menu) => {
        const actions = menu.acl.split(',')
        actions.forEach((action) => {
          can(action, getEntities(menu.path))
        })
      })
    })

    const ability = build({
      detectSubjectType: (object) => object.constructor,
    })

    return ability
  }
}
