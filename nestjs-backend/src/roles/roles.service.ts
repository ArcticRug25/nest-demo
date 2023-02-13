import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { Repository } from 'typeorm'
import { Roles } from './role.entity'

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Roles) private readonly roleRepo: Repository<Roles>) {}
  async create(createRoleDto: CreateRoleDto) {
    const role = await this.roleRepo.create(createRoleDto)
    return this.roleRepo.save(role)
  }

  findAll() {
    return this.roleRepo.find()
  }

  findOne(id: number) {
    return this.roleRepo.findOne({
      where: {
        id,
      },
    })
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.findOne(id)
    const newRole = this.roleRepo.merge(role, updateRoleDto)
    return this.roleRepo.save(newRole)
  }

  remove(id: number) {
    return this.roleRepo.delete(id)
  }
}
