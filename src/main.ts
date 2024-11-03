import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { TimeOutInterceptor } from './common/interceptors/timeout.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Importamos los filtros
  app.useGlobalFilters(new AllExceptionFilter());
  //Importamos los interceptores
  app.useGlobalInterceptors(new TimeOutInterceptor())
  //Importamos para sawagger
  const options = new DocumentBuilder()
  .setTitle('API Microservicios Test')
  .setDescription('API UCN')
  .setVersion('2.0.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/api/docs', app, document, {
    swaggerOptions: {
      filter: true,
    },
  });
  //Ponemos el proces para conectar el env con el puerto 
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
