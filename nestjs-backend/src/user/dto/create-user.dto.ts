import { IsNotEmpty, IsString, Length } from 'class-validator'
import { Roles } from '../../roles/role.entity'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  username: string

  @IsString()
  @IsNotEmpty()
  @Length(6, 32)
  password: string

  roles?: number[] | Roles[]
}
