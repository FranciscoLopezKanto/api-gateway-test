import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ProductMSG } from 'src/common/constants';
import { ClientProxyTest } from 'src/common/proxy/client-proxy';

@Controller('product')
export class ProductController {
  constructor(private readonly clientProxy: ClientProxyTest) {}

  private _clientProxyProduct = this.clientProxy.clientProxy("product");

  // Crear un Producto
  @Post()
  create(@Body() productDTO: { name: string }): Observable<any> {
  return this._clientProxyProduct.send(ProductMSG.CREATE_PRODUCT, productDTO).pipe(
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
    }),
  );
  } 
  // Obtener todos los Productos
  @Get()
  findAll(): Observable<any> {
    return this._clientProxyProduct.send(ProductMSG.FIND_ALL, '');
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
      productoIngresado: string;
      newnameProduct: string;
      newPrice: number;
      newStock: number;
      newDescription: string;
      newCategory: string;
    }
  ): Observable<any> {
    return this._clientProxyProduct.send(ProductMSG.UPDATE_PRODUCT, {
      updateDTO
    });
  }

  // Eliminar un Producto
  @Delete()
  delete(@Body() productDTO: { name: string }): Observable<any> {
    return this._clientProxyProduct.send(ProductMSG.DELETE_PRODUCT, productDTO);
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
