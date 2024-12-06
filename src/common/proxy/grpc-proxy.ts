import {
    ClientGrpcProxy,
    ClientProxyFactory,
    Transport,
  } from '@nestjs/microservices';
  import * as dotenv  from 'dotenv';
  
  dotenv.config();
  
  import { USERS_PACKAGE_NAME } from '../../users/users.pb';
  
  export const clientProxyUsers = (): ClientGrpcProxy => {
    return ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        url: "localhost:50051",
        package: USERS_PACKAGE_NAME,
        protoPath: 'node_modules/myprotos/protos/users.proto',
      },
    });
  };
  