import { Module } from '@nestjs/common';
import { ClientProxyTest } from './client-proxy';
import { UserController } from 'src/user/user.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [ClientProxyTest],
  exports: [ClientProxyTest],
})
export class ProxyModule {}