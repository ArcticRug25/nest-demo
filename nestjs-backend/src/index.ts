import AppDataSource from '../ormconfig'
import { User } from './user/user.entity'

AppDataSource.initialize()
  .then(async () => {
    console.log('Loading users from the database...')
    const res = await AppDataSource.manager.find(User)
    console.log('Loaded users: ', res)
  })
  .catch((error) => console.log(error))
