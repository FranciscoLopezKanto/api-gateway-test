import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ProxyModule } from './common/proxy/proxy.module';
import { UsersModule } from './users/users.module';  ;
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { GrpcProxyModule } from './common/proxy/grpc-proxy.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
    }),
    //Importamos el proxy
    ProxyModule,
    GrpcProxyModule,
    //Importamos el user
    UsersModule,
    //Importamos el product
    ProductModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}