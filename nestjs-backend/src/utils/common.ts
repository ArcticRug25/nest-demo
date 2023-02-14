import { User } from '../user/user.entity'
import { Menus } from '../menus/menu.entity'
import { Roles } from 'src/roles/role.entity'
import { Logs } from 'src/logs/logs.entity'

export const getEntities = (path: string) => {
  const pathMap = {
    '/user': User,
    '/logs': Logs,
    '/roles': Roles,
    '/menus': Menus,
    '/auth': 'Auth',
  }

  const pathMapKeys = Object.keys(pathMap)
  for (let i = 0; i < pathMapKeys.length; i++) {
    const curKey = pathMapKeys[i]
    if (path.startsWith(curKey)) {
      return pathMap[curKey]
    }
  }
}
