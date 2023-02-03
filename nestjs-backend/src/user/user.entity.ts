import {
  AfterInsert,
  AfterRemove,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Logs } from '../logs/logs.entity'
import { Roles } from '../roles/roles.entity'
import { Profile } from './profile.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  username: string

  @Column()
  password: string

  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: true,
  })
  profile: Profile

  @OneToMany(() => Logs, (logs) => logs.user, {
    cascade: true,
  })
  logs: Logs[]

  @ManyToMany(() => Roles, (role) => role.users, { cascade: true })
  @JoinTable({ name: 'users_roles' })
  roles: Roles[]

  @AfterInsert()
  afterInsert() {
    console.log('🚀 ~ file: user.entity.ts:39 ~ User ~ afterInsert', 'afterInsert')
  }

  @AfterRemove()
  afterRemove() {
    console.log('this', this)
    console.log('🚀 ~ file: user.entity.ts:44 ~ User ~ afterRemove', this.username, this.id)
  }
}
