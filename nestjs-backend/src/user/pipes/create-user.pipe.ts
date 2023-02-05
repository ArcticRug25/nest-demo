import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import { CreateUserDto } from '../dto/create-user.dto'

@Injectable()
export class CreateUserPipe implements PipeTransform {
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    console.log('🚀 ~ file: create-user.pipe.ts:6 ~ CreateUserPipe ~ transform ~ metadata', metadata)

    console.log('🚀 ~ file: create-user.pipe.ts:6 ~ CreateUserPipe ~ transform ~ value', value)
    const roles = value.roles
    if (roles && Array.isArray(roles) && roles.length) {
      if (roles[0]['id']) {
        value.roles = roles.map((role) => role.id)
      }
    }
    return value
  }
}
