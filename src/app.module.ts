import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { AuthModule } from '@src/auth/auth.module';
import appConfig from '@src/common/config/app.config';
import databaseConfig from '@src/common/config/database.config';
import jwtConfig from '@src/common/config/jwt.config';
import { validate } from '@src/common/validation/env.validation';
import { DatabaseModule } from '@src/database/database.module';
import { UsersModule } from '@src/users/users.module';
import { JwtAuthGuard } from '@src/auth/guards/jwt-auth.guard';
import redisConfig from '@src/common/config/redis.config';
import { RedisModule } from '@src/redis/redis.module';
import swaggerConfig from '@src/common/config/swagger.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      
      isGlobal: true,
      load: [appConfig, jwtConfig, databaseConfig, redisConfig, swaggerConfig],
      validate,
    }),
    DatabaseModule,
    RedisModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
