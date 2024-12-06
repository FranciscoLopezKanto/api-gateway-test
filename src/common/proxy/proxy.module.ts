import { Module } from '@nestjs/common';
import { ClientProxyTest } from './client-proxy';
import { UsersController } from 'src/users/users.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [ClientProxyTest],
  exports: [ClientProxyTest],
})
export class ProxyModule {}