import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateMenuDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  path: string

  @IsNumber()
  @IsNotEmpty()
  order: number

  @IsString()
  @IsNotEmpty()
  acl: string
}
