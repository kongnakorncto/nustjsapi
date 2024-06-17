import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { Request } from 'express';

import { REQUEST_USER_KEY } from '../../common/constants';
import { RedisService } from '../../redis/redis.service';
import jwtConfig from '../../common/config/jwt.config';
import { ActiveUserData } from '../../common/interfaces/active-user-data.interface';

export function timeConvertermas(a: any) {
  let year: any = a.getFullYear();
  var month: any = (a.getMonth() + 1).toString().padStart(2, '0');
  var date: any = a.getDate().toString().padStart(2, '0');
  var hour: any = a.getHours().toString().padStart(2, '0');
  var min: any = a.getMinutes().toString().padStart(2, '0');
  var sec: any = a.getSeconds().toString().padStart(2, '0');
  //var time: any = date + '-' + month + '-' + year + ' ' + hour + ':' + min + ':' + sec;
  var time: any =
    year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + sec;
  //console.log('timeConvertermas a: ' + a)
  //console.log('timeConvertermas time: ' + time)
  return time;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.getToken(request);
    if (!token) {
      throw new UnauthorizedException('Authorization token is required');
    }

    try {
      const payload = await this.jwtService.verifyAsync<ActiveUserData>(
        token,
        this.jwtConfiguration,
      );

      const isValidToken = await this.redisService.validate(
        `user-${payload.id}`,
        payload.tokenId,
      );
      if (!isValidToken) {
        throw new UnauthorizedException('Authorization token is not valid');
      }

      request[REQUEST_USER_KEY] = payload;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }

    return true;
  }

  private getToken(request: Request) {
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    var decoded: any = {};
    var decoded: any = this.jwtService.decode(token);
    const id = decoded.id;
    const roleId = decoded.roleId;
    const email = decoded.email;
    const tokenIdx = decoded.tokenId;
    const iat = decoded.iat * 1000;
    const exp = decoded.exp * 1000;
    const d1 = new Date(iat);
    const d2 = new Date(exp);
    //console.log(('token=> ' + token); 
    //console.log(('iat=> ' + iat); 
    //console.log(('exp=> ' + exp); 
    //console.log(('signin_date:=> ' + timeConvertermas(d1)); 
    //console.log(('expires_date:=> ' + timeConvertermas(d2)); 
    const payload: any ={
          token: token,
          tokenId: tokenIdx,
          roleId: roleId, 
          email: email,  
          expiresIn: exp,
          signin_date: timeConvertermas(d1), 
          expires_date: timeConvertermas(d2), 
          decoded: decoded,
        }   
    return token;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization.split(' ') ?? [];
    //console.log('extractTokenFromHeader token : '+token);
    return type === 'Bearer' ? token : undefined;
  }
  
}
