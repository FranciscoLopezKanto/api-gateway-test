import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ClientProxyTest } from 'src/common/proxy/client-proxy';
import { catchError, map, Observable, of } from 'rxjs';
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

  @Get('orders')
  findAllOrder(): Observable<any> {
  return this._clientProxyOrder.send(OrderMSG.FIND_ALL_ORDERS, '').pipe(
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

@Post('update')
  updateOrder(@Body() body: { order_id: number, new_status: string }): Observable<any> {
    return this._clientProxyOrder.send(OrderMSG.UPDATE_STATUS_ORDER, body).pipe(
      map((response) => {
        // Decodificar "data" que está en base64
        const decodedData = Buffer.from(response.data, 'base64').toString('utf-8');
        
        // Parsear la data decodificada de nuevo a un objeto JSON
        const updatedOrder = JSON.parse(decodedData);

        return {
          success: response.success,
          message: response.message,
          data: updatedOrder, // El objeto de la orden ya decodificado
        };
      }),
    );
  }

  



  @Post('findByID')
findOrderItemByID(@Body() body: { user_id: number }): Observable<any> {
  return this._clientProxyOrder.send(OrderMSG.FIND_OITEMSBYUSERID, { user_id: body.user_id }).pipe(
    map((response) => {
      const decodedData = Buffer.from(response.data, 'base64').toString('utf-8');
      const product = JSON.parse(decodedData);

      return {
        success: response.success,
        message: response.message,
        data: product, // Producto decodificado y parseado
      };
    }),
    catchError((err) => {
      console.error("Error from microservice:", err); // DEBUG
      throw new HttpException(
        {
          success: false,
          message: "Error communicating with microservice",
          error: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }),
  );
}

}