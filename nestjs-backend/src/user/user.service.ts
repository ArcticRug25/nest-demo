import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'
import { Logs } from '../logs/logs.entity'
import { UserQuery } from './dto/get-user.dto'
// import { Logger } from 'nestjs-pino'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Logs) private readonly logsRepo: Repository<Logs>, // private logger: Logger,
  ) {}

  findOne(id: number) {
    return this.userRepo.findOne({ where: { id } })
  }

  findAll(query: UserQuery) {
    const { limit, page, gender, role, username } = query
    const take = limit || 10
    const skip = ((page || 1) - 1) * take
    return this.userRepo.find({
      select: {
        id: true,
        username: true,
        profile: {
          gender: true,
        },
      },
      relations: {
        profile: true,
        roles: true,
      },
      // join: {
      //   alias: 'user',
      //   leftJoinAndSelect: {
      //     profile: 'user.profile',
      //     roles: 'user.roles',
      //   },
      // },
      take,
      skip,
      where: {
        username,
        profile: {
          gender,
        },
        roles: {
          id: role,
        },
      },
    })
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

  async findUserLogs(id: number) {
    const user = await this.findOne(id)
    return this.logsRepo.find({
      where: {
        user,
      },
      relations: {
        user: true,
      },
    })
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
