import {
  ClientGrpcProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


export class GrpcProxyClient {
  constructor(private readonly configService: ConfigService) {}

  createClientProxyUsers(): ClientGrpcProxy {
    return ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        url: 'localhost:50051', // Usa ConfigService para obtener la URL del servidor gRPC
        package: 'users',  
        protoPath: 'node_modules/myprotos/protos/users.proto', // Ruta correcta al archivo .proto
      },
    }) as ClientGrpcProxy;
  }
}
