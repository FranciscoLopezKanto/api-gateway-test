import { Module } from '@nestjs/common';
import { GrpcProxyClient } from './grpc-proxy';

@Module({
  providers: [GrpcProxyClient],
  exports: [GrpcProxyClient],  // Exportamos el cliente gRPC
})
export class GrpcProxyModule {}
