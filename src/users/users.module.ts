import { Module } from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';

import { UsersController } from './users.controller';
import { clientProxyUsers } from '../common/proxy/grpc-proxy';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: 'UsersServiceClient',
      useFactory: (): ClientGrpcProxy => {
        return clientProxyUsers();
      },
    }
  ],
  exports: [],
})
export class UsersModule {}
