import { Global, Logger, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { connectionParams } from '../ormconfig'
import { getConfig } from './common/configuration'
import { LogsModule } from './logs/logs.module'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { RolesModule } from './roles/roles.module';
import { MenusModule } from './menus/menus.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [getConfig],
    }),
    TypeOrmModule.forRoot(connectionParams as TypeOrmModuleOptions),
    LogsModule,
    UserModule,
    AuthModule,
    RolesModule,
    MenusModule,
  ],
  providers: [Logger],
  exports: [Logger],
})
export class AppModule {}
