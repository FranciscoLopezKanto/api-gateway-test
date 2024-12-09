import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USERS_PACKAGE_NAME } from './users.pb';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50051', // Configura esta URL según tus necesidades
          package: USERS_PACKAGE_NAME,
          protoPath: 'node_modules/myprotos/protos/users.proto',
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [ConfigService], // Si usas variables de entorno
})
export class UsersModule {}

