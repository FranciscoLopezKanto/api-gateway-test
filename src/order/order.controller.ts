import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ClientProxyTest } from 'src/common/proxy/client-proxy';
import { map, Observable } from 'rxjs';
import { IOrder } from 'src/common/interfaces/order.interface';
import { OrderMSG } from 'src/common/constants';




@Controller('order')
export class OrderController {
  constructor(private readonly clientProxy: ClientProxyTest) {}
  private _clientProxyOrder = this.clientProxy.clientProxy("orders");

  @Post()
  create(
    @Body() OrderDTO: {
      user_id: number;
      product_id: number;
      Quantity: number;
    }
  ): Observable<any> {
    return this._clientProxyOrder.send(OrderMSG.CREATE_ORDER_ITEM, OrderDTO).pipe(
      map((response) => {
        // decodificar "data" que está en base64
        const decodedData = Buffer.from(response.data, 'base64').toString('utf-8');
        
        // parsea la data decodificada de nuevo a un objeto JSON
        const product = JSON.parse(decodedData);

        return {
          success: response.success,
          message: response.message,
          data: product, // El objeto del producto ya decodificado
        };
      }),
    );
  }

  @Get()
  findAll(): Observable<any> {
    return this._clientProxyOrder.send(OrderMSG.FIND_ALL_OITEMS, '').pipe(
      map((response) => {
        // decodificar "data" que está en base64
        const decodedData = Buffer.from(response.data, 'base64').toString('utf-8');
        
        // parsea la data decodificada de nuevo a un objeto JSON
        const product = JSON.parse(decodedData);

        return {
          success: response.success,
          message: response.message,
          data: product, // El objeto del producto ya decodificado
        };
      }),
    );
  }
}