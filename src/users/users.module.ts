import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from '../auth/auth.service';
import { BcryptService } from '../auth/bcrypt.service';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { User } from './entities/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService,AuthService, BcryptService,JwtService],
})
export class UsersModule {}
