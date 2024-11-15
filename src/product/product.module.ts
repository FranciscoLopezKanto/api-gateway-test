import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module'; // Suponiendo que el proxy está en este módulo

@Module({
  imports: [ProxyModule],  // Aquí se importa el ProxyModule para acceder a las conexiones de RabbitMQ
  controllers: [ProductController],
})
export class ProductModule {}