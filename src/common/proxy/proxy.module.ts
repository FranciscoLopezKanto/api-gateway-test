import { Module } from '@nestjs/common';
import { ClientProxyTest } from './client-proxy';

@Module({
  providers: [ClientProxyTest],
  exports: [ClientProxyTest],
})
export class ProxyModule {}