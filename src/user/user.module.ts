import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { Logs } from '../logs/logs.entity'
import { Roles } from '../roles/roles.entity'
import { User } from './user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, Logs, Roles])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
