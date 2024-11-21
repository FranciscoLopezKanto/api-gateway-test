import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ProductMSG } from 'src/common/constants';
import { ClientProxyTest } from 'src/common/proxy/client-proxy';

@Controller('product')
export class ProductController {
  constructor(private readonly clientProxy: ClientProxyTest) {}

  private _clientProxyProduct = this.clientProxy.clientProxy("product");

  // Crear un Producto
  @Post()
  create(@Body() productDTO: { name: string }): Observable<any> {
  return this._clientProxyProduct.send(ProductMSG.CREATE_PRODUCT, productDTO);
  } 
  // Obtener todos los Productos
  @Get()
  findAll(): Observable<any> {
    return this._clientProxyProduct.send(ProductMSG.FIND_ALL, '');
  }

  // Obtener Producto por nombre de usuario (equivalente a GetByUser)
  @Get(':username')
  findByUsername(@Param('username') username: string): Observable<any> {
    return this._clientProxyProduct.send(ProductMSG.FIND_BY_USERNAME, username);
  }

  // Actualizar un Producto
  @Put(':productoIngresado')
  update(
    @Param('productoIngresado') productoIngresado: string, 
    @Body() updateDTO: { newnameProduct: string }
  ): Observable<any> {
    return this._clientProxyProduct.send(ProductMSG.UPDATE_PRODUCT, {
      productoIngresado,
      newnameProduct: updateDTO.newnameProduct
    });
  }

  // Eliminar un Producto
  @Delete(':nameProduct')
  delete(@Param('nameProduct') nameProduct: string): Observable<any> {
    return this._clientProxyProduct.send(ProductMSG.DELETE_PRODUCT, nameProduct);
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
