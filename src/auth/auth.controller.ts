import { Controller, Post, Body, HttpCode, HttpStatus, Get, Put, Param, UseGuards, Req } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Request } from 'express';

import { ActiveUser } from '../common/decorators/active-user.decorator';
import { Public } from '../common/decorators/public.decorator';
import { User } from '../users/entities/user.entity';

import { AuthService } from './auth.service';

import { tokenDto } from './dto/refreshToken.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiConflictResponse({
    description: 'User already exists',
  })
  @ApiBadRequestResponse({
    description: 'Return errors for invalid sign up fields',
  })
  @ApiCreatedResponse({
    description: 'User has been successfully signed up',
  })
  @Public()
  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    return this.authService.signUp(signUpDto);
  }

  @ApiBadRequestResponse({
    description: 'Return errors for invalid sign in fields',
  })
  @ApiOkResponse({ description: 'User has been successfully signed in' })
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(signInDto);
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOkResponse({ description: 'User has been successfully signed out' })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('sign-out')
  signOut(@ActiveUser('id') userId: string): Promise<void> {
    return this.authService.signOut(userId);
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOkResponse({ description: "Get logged in user's details", type: User })
  @ApiBearerAuth()
  @Get('refreshtoken')
  async getMe(@ActiveUser('id') userId: string, @Req() request: Request): Promise<User> {
    const token = request.headers.authorization.replace('Bearer ', ''); 
    //console.log(('token:=> ' + token); 
    return this.authService.refashToken(token);
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOkResponse({ description: "Get logged in user's details", type: User })
  @ApiBearerAuth()
  @Get('userinfo')
  async userinfo(@ActiveUser('id') userId: string, @Req() request: Request): Promise<User> {
    const token = request.headers.authorization.replace('Bearer ', ''); 
    //console.log(('token:=> ' + token); 
    return this.authService.userinfo(token);
  }

}
