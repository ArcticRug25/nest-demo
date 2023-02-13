import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateMenuDto } from './dto/create-menu.dto'
import { UpdateMenuDto } from './dto/update-menu.dto'
import { Menus } from './menu.entity'

@Injectable()
export class MenusService {
  constructor(@InjectRepository(Menus) private readonly menuRepo: Repository<Menus>) {}
  async create(createMenuDto: CreateMenuDto) {
    const role = await this.menuRepo.create(createMenuDto)
    return this.menuRepo.save(role)
  }

  findAll() {
    return this.menuRepo.find()
  }

  findOne(id: number) {
    return this.menuRepo.findOne({
      where: {
        id,
      },
    })
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    const menu = await this.findOne(id)
    const newRole = this.menuRepo.merge(menu, updateMenuDto)
    return this.menuRepo.save(newRole)
  }

  remove(id: number) {
    return this.menuRepo.delete(id)
  }
}
