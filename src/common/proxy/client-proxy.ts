import { Injectable } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ClientProxyTest {
  constructor(private configService: ConfigService) {}

  // Configura el cliente proxy para un servicio dado (productos o cualquier otro)
  clientProxy(queueName: string) {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: this.configService.get('AMQP_URL'),
        queue: queueName,  // Nombre de la cola
        queueOptions: {
          durable: false,  // Definir si la cola es durable
        },
      },
    });
  }
}