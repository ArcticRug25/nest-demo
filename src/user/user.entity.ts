import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Logs } from '../logs/logs.entity'
import { Roles } from '../roles/roles.entity'
import { Profile } from './profile.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  password: string

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile

  @OneToMany(() => Logs, (logs) => logs.user)
  logs: Logs[]

  @ManyToMany(() => Roles, (role) => role.users)
  @JoinTable({ name: 'users_roles' })
  roles: Roles[]
}
