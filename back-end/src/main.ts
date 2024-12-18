import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // agregue esta línea para que el front-end pueda hacer peticiones a la api
  await app.listen(3000);
  // app.setGlobalPrefix('api/v1'); ver si es necesaria// agregue esta línea para que todas las rutas tengan el prefijo /api/v1 y ademas para que el front-end pueda hacer peticiones a la api
  app.useGlobalPipes(
    // agregue esta línea para que las validaciones de los DTOs funcionen correctamente, sirve para que los campos que no esten en el DTO no se envien a la base de datos, osea los valida
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
}
bootstrap();
