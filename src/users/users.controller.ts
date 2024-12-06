/* eslint-disable */
import {
  Inject,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  OnModuleInit,
  Req,
  Headers,
} from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Request } from 'express';

import { UsersClient, USERS_SERVICE_NAME } from './users.pb';
import type {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  GetUsersRequest,
  GetUsersResponse,
  GetUserByIdRequest,
  GetUserByIdResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  DeleteUserRequest,
  DeleteUserResponse,
} from './users.pb';

@Controller('users')
export class UsersController implements OnModuleInit {
  constructor(
    @Inject('UsersServiceClient')
    private readonly usersServiceClient: ClientGrpcProxy,
  ) {}

  private usersService: UsersClient;

  onModuleInit(): void {
    this.usersService =
      this.usersServiceClient.getService<UsersClient>(USERS_SERVICE_NAME);
  }

  /** Registro de usuario */
  @Post('register')
  async register(
    @Body() req: RegisterRequest,
  ): Promise<RegisterResponse> {
    return firstValueFrom(this.usersService.register(req));
  }

  /** Inicio de sesión */
  @Post('login')
  async login(
    @Body() req: LoginRequest,
  ): Promise<LoginResponse> {
    return firstValueFrom(this.usersService.login(req));
  }

  /** Obtener todos los usuarios con token */
  @Get()
  async getUsers(@Headers('authorization') authorization?: string): Promise<GetUsersResponse> {
    // Extraer el token eliminando el prefijo 'Bearer'
    const token = authorization?.split(' ')[1] || '';

    if (!token) {
      throw new Error('Token de autenticación no proporcionado');
    }

    // Crear el objeto de solicitud incluyendo el token
    const request: GetUsersRequest = { token };  // Asegúrate de que esto sea un objeto con una propiedad 'token'

    // Llamar al servicio gRPC y devolver la respuesta
    return firstValueFrom(this.usersService.getUsers(request));
  }


  /** Obtener un usuario por ID con token */
  @Get(':id')
  async getUserById(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<GetUserByIdResponse> {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new Error('Token de autenticación no proporcionado');
    }

    const request: GetUserByIdRequest = { id };

    return firstValueFrom(this.usersService.getUserById(request));
  }

  /** Actualizar un usuario con token */
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() user: Omit<UpdateUserRequest['user'], 'id'>,
    @Req() req: Request,
  ): Promise<UpdateUserResponse> {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new Error('Token de autenticación no proporcionado');
    }

    const request: UpdateUserRequest = {
      user: { id, ...user },
    };

    return firstValueFrom(
      this.usersService.updateUser(request),
    );
  }

  /** Eliminar un usuario con token */
  @Delete(':id')
  async deleteUser(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<DeleteUserResponse> {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new Error('Token de autenticación no proporcionado');
    }

    const request: DeleteUserRequest = { id };

    return firstValueFrom(
      this.usersService.deleteUser(request),
    );
  }
}
