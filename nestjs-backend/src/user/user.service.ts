import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'
import { Logs } from '../logs/logs.entity'
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

  findAll() {
    return this.userRepo.find()
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
