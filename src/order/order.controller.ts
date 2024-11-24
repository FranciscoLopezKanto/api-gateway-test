import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ClientProxyTest } from 'src/common/proxy/client-proxy';
import { OrderDTO } from './dto/order.dto';
import { Observable } from 'rxjs';
import { IOrder } from 'src/common/interfaces/order.interface';
import { OrderMSG } from 'src/common/constants';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('orders')
@UseGuards(JwtAuthGuard)
@Controller('api/v2/order')
export class OrderController {
  constructor(private readonly clientProxy: ClientProxyTest) {}
  private _clientProxyOrder = this.clientProxy.clientProxy("orders");

  @Post()
  create(@Body() orderDTO: OrderDTO): Observable<IOrder> {
    return this._clientProxyOrder.send(OrderMSG.CREATE, orderDTO);
  }

  @Get()
  findAll(): Observable<IOrder[]> {
    return this._clientProxyOrder.send(OrderMSG.FIND_ALL, '');
  }

}