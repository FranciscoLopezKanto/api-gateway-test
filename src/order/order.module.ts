import { Module } from '@nestjs/common';
import { ProxyModule } from '../common/proxy/proxy.module'; // Importa el ProxyModule correctamente
import { OrderController } from './order.controller';

@Module({
  imports: [ProxyModule],          // Asegúrate de importar ProxyModule
  controllers: [OrderController],  // Registra el controlador
})
export class OrderModule {}