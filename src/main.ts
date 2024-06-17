import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from '@src/app.module';
import { TransformInterceptor } from '@src/common/interceptors/transform.interceptor';
import { setupSwagger } from '@src/swagger';
//import * as hbs from 'hbs';
import * as hbs from 'express-handlebars';
import { join } from 'path'; 
import { printName } from '@src/hbs/helpers';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  setupSwagger(app);

  app.useGlobalInterceptors(new TransformInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidUnknownValues: true,
      stopAtFirstError: true,
      validateCustomDecorators: true,
    }),
  );
  
  
  app.useStaticAssets(join(__dirname, '@src', 'public'));
  app.setBaseViewsDir(join(__dirname, '@src', 'views')); 
  const configService = app.get(ConfigService);

  const port = configService.get('PORT');
 
  await app.listen(port, () => {
    console.log(`Application running at ${port}`);
  });
}
bootstrap();