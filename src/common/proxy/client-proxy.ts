import { Injectable } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ClientProxyTest {
  constructor(private configService: ConfigService) {}

  clientProxy(queueName: string) {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get<string>('AMQP_URL')], // Cargar la URL desde .env
        queue: queueName,
        queueOptions: {
          durable: true, // Las colas en CloudAMQP deben ser durables
        },
      },
    });
  }
}
