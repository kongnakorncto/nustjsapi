import { Controller, Get, Put, Body, Param, UseGuards, Req } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Request } from 'express';

import { AuthService } from '../auth/auth.service';
import { ActiveUser } from '../common/decorators/active-user.decorator';

import { UsersService } from './users.service';

import { User } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,private readonly authService: AuthService) {}

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOkResponse({ description: "Get logged in user's details", type: User })
  @ApiBearerAuth()
  @Get('me')
  async getMe(@ActiveUser('id') userId: string, @Req() request: Request): Promise<User> {
    const token = request.headers.authorization.replace('Bearer ', ''); 
    //console.log('token:=> ' + token); 
    const userinfo: any = await this.authService.userinfo(token);
    const roleId: any = userinfo.roleId;
    const email: any = userinfo.email
    const id: any = userinfo.id
    console.log('userinfo.email:=> ' + email); 
    console.log('userinfo.id:=> ' + id); 
    console.log('userinfo.roleId:=> ' + roleId); 
    return this.usersService.getMe(userId);
  }
}
