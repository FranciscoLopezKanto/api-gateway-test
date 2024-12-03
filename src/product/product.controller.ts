import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { catchError, map, Observable, switchMap } from 'rxjs';
import { OrderMSG, ProductMSG } from 'src/common/constants';
import { ClientProxyTest } from 'src/common/proxy/client-proxy';

@Controller('product')
export class ProductController {
  constructor(private readonly clientProxy: ClientProxyTest) {}

  private _clientProxyProduct = this.clientProxy.clientProxy("product");
  private _clientProxyOrder = this.clientProxy.clientProxy("orders");

  // Crear un Producto y enviar mensajes a ambas colas
  @Post()
  create(@Body() productDTO: { name: string }): Observable<any> {
  // Enviar mensaje a la cola de productos
    const productMessage$ = this._clientProxyProduct
    .send(ProductMSG.CREATE_PRODUCT, productDTO)
    .pipe(
      map((response) => {
        // Decodificar el campo 'data' que está en base64
        const decodedData = Buffer.from(response.data, 'base64').toString('utf-8');

        // Parsear la data decodificada de nuevo a un objeto JSON
        const product = JSON.parse(decodedData);

        // Retornar la respuesta con los datos decodificados
        return {
          success: response.success,
          message: response.message,
          data: product, // El objeto del producto ya decodificado
        };
      })
    );

  // Enviar mensaje a la cola de órdenes
  const orderMessage$ = this._clientProxyOrder.send(OrderMSG.CREATE_PRODUCT, productDTO);

  // Combinar ambos mensajes y manejar las respuestas
  return productMessage$.pipe(
    switchMap((productResponse) => {
      return orderMessage$.pipe(
        map(() => ({
          success: productResponse.success,
          message: `Product and order created successfully: ${productResponse.message}`,
          data: productResponse.data,
        }))
      );
    }),
    catchError((error) => {
      console.error('Error creating product or order:', error);
      throw new Error('Error processing the request');
    })
  );
}

  // Obtener todos los Productos
  @Get()
  findAll(): Observable<any> {
    return this._clientProxyProduct.send(ProductMSG.FIND_ALL, '').pipe(
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

  // Obtener Producto por nombre de usuario (equivalente a GetByUser)
  @Post('findByID')
  findProductByID(@Body() body: { id: string }): Observable<any> {
    return this._clientProxyProduct.send(ProductMSG.GET_PRODUCT, body.id).pipe(
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

  // Actualizar un Producto
  @Put()
  update(
    @Body() updateDTO: {
      product: string;
      newnameProduct: string;
      newPrice: number;
      newStock: number;
      newDescription: string;
      newCategory: string;
    }
  ): Observable<any> {
    // Enviar mensaje para actualizar el producto
    const updateProduct$ = this._clientProxyProduct.send(ProductMSG.UPDATE_PRODUCT, {
      updateDTO: {
        product: updateDTO.product,
        newnameProduct: updateDTO.newnameProduct,
        newPrice: updateDTO.newPrice,
        newStock: updateDTO.newStock,
        newDescription: updateDTO.newDescription,
        newCategory: updateDTO.newCategory,
      }
    });
  
    // Enviar mensaje para actualizar la orden
    const updateOrder$ = this._clientProxyOrder.send(OrderMSG.UPDATE_PRODUCT, {
      updateOrderDTO: {
        product: updateDTO.product,               // Verifica que el 'product' no esté vacío
        newnameProduct: updateDTO.newnameProduct, // Asegúrate de que estos campos estén siendo correctamente enviados
        newPrice: updateDTO.newPrice,
        newDescription: updateDTO.newDescription,
      }
    });
  
    // Combinar ambos mensajes y manejar las respuestas
    return updateProduct$.pipe(
      switchMap((productResponse) => {
        return updateOrder$.pipe(
          map((orderResponse) => ({
            success: productResponse.success && orderResponse.success,
            message: `Product and order updated successfully: ${productResponse.message}`,
            data: {
              product: productResponse.data,
              order: orderResponse.data,
            }
          }))
        );
      }),
      catchError((error) => {
        console.error('Error updating product or order:', error);
        throw new Error('Error processing the request');
      })
    );
  }
  

  // Eliminar un Producto
  @Delete()
  delete(@Body() productDTO: { name: string }): Observable<any> {
    // Enviar mensaje a la cola para eliminar el producto
    const deleteProduct$ = this._clientProxyProduct.send(ProductMSG.DELETE_PRODUCT, productDTO);
  
    // Enviar mensaje a la cola para eliminar el producto de la orden
    const deleteOrder$ = this._clientProxyOrder.send(OrderMSG.DELETE_PRODUCT, productDTO);
  
    // Combinar ambos mensajes y manejar las respuestas
    return deleteProduct$.pipe(
      switchMap((productResponse) => {
        return deleteOrder$.pipe(
          map((orderResponse) => ({
            success: productResponse.success && orderResponse.success,
            message: `Product and order deleted successfully: ${productResponse.message}`,
            data: {
              product: productResponse.data,
              order: orderResponse.data,
            },
          }))
        );
      }),
      catchError((error) => {
        console.error('Error deleting product or order:', error);
        throw new Error('Error processing the request');
      })
    );
  }
  

  // Crear un Usuario
  @Post('user')
  createUser(@Body() username: string): Observable<any> {
    return this._clientProxyProduct.send(ProductMSG.CREATE_USER_MSP, username);
  }

  // Editar un Usuario
  @Put('user/:currentUsername')
  editUser(
    @Param('currentUsername') currentUsername: string, 
    @Body() newUsernameDTO: { newUsername: string }
  ): Observable<any> {
    return this._clientProxyProduct.send(ProductMSG.UPDATE_USER_MSP, {
      currentUsername,
      newUsername: newUsernameDTO.newUsername
    });
  }

  // Eliminar un Usuario
  @Delete('user/:username')
  deleteUser(@Param('username') username: string): Observable<any> {
    return this._clientProxyProduct.send(ProductMSG.DELETE_USER_MSP, username);
  }
}