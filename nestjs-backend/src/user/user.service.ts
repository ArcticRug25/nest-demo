import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { User } from './user.entity'
import { Logs } from '../logs/logs.entity'
import { UserQuery } from './dto/get-user.dto'
// import { Logger } from 'nestjs-pino'
import { conditionUtils } from '../utils/db.helper'
import { Roles } from '../roles/role.entity'
import { CreateUserDto } from './dto/create-user.dto'
import argon2 from 'argon2'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Logs) private readonly logsRepo: Repository<Logs>, // private logger: Logger,
    @InjectRepository(Roles) private readonly rolesRepo: Repository<Roles>,
  ) {}

  find(username: string) {
    return this.userRepo.findOne({ where: { username }, relations: ['roles', 'roles.menus'] })
  }

  findOne(id: number) {
    return this.userRepo.findOne({ where: { id } })
  }

  findAll(query: UserQuery) {
    const { limit, page, gender, role, username } = query
    const take = limit || 10
    const skip = ((page || 1) - 1) * take
    // return this.userRepo.find({
    //   select: {
    //     id: true,
    //     username: true,
    //     profile: {
    //       gender: true,
    //     },
    //   },
    //   relations: {
    //     profile: true,
    //     roles: true,
    //   },
    //   // join: {
    //   //   alias: 'user',
    //   //   leftJoinAndSelect: {
    //   //     profile: 'user.profile',
    //   //     roles: 'user.roles',
    //   //   },
    //   // },
    //   take,
    //   skip,
    //   where: {
    //     username,
    //     profile: {
    //       gender,
    //     },
    //     roles: {
    //       id: role,
    //     },
    //   },
    // })

    const obj = {
      'user.username': username,
      'profile.gender': gender,
      'roles.id': role,
    }

    const queryBuilder = this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('user.roles', 'roles')

    const newQueryBuilder = conditionUtils<User>(queryBuilder, obj)

    return newQueryBuilder.take(take).skip(skip).getMany()
  }

  findProfile(id: number) {
    return this.userRepo.findOne({
      where: {
        id,
      },
      relations: {
        profile: true,
      },
    })
  }

  async create(user: Partial<CreateUserDto>) {
    if (!user.roles) {
      const role = await this.rolesRepo.findOne({ where: { id: 2 } })
      user.roles = [role]
    }
    if (Array.isArray(user.roles) && typeof user.roles[0] === 'number') {
      // 查询所有用户角色
      user.roles = await this.rolesRepo.find({
        where: {
          id: In(user.roles as number[]),
        },
      })
    }

    const userTmp = await this.userRepo.create(user as User)
    userTmp.password = await argon2.hash(userTmp.password)
    const res = await this.userRepo.save(userTmp)
    return res
  }

  async findUserLogs(id: number) {
    const user = await this.findOne(id)
    return this.logsRepo.find({
      where: {
        user: user.logs,
      },
      relations: {
        user: true,
      },
    })
  }

  async remove(id: number) {
    const user = await this.findOne(id)
    return this.userRepo.remove(user)
  }

  async update(id: any, userDto: Partial<User>) {
    const userTemp = await this.findProfile(id)
    const newUser = this.userRepo.merge(userTemp, userDto)
    // 联合模型更新，需要使用 save 方法或者 queryBuilder
    return this.userRepo.save(newUser)
    // 下面的 update 方法，只适合单模型的更新，不适合有关系的模型更新
    return this.userRepo.update(id, userDto)
  }

  findLogsByGroup(id: number) {
    this.logsRepo.query('SELECT * FROM logs')
    return this.logsRepo
      .createQueryBuilder('logs')
      .select('logs.result')
      .addSelect('COUNT("logs.result")', 'count')
      .leftJoinAndSelect('logs.user', 'user')
      .where('user.id = :id', { id })
      .groupBy('logs.result')
      .orderBy('count', 'DESC')
      .addOrderBy('result', 'DESC')
      .getRawMany()
  }
}
