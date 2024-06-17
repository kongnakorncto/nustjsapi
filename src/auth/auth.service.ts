

 
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { randomUUID } from 'crypto';

import { Repository } from 'typeorm';

import { RedisService } from '../redis/redis.service';
import jwtConfig from '../common/config/jwt.config';
import { MysqlErrorCode } from '../common/enums/error-codes.enum';
import { timeConvertermas,getRandomString,timeConverter} from '../common/helpers/format.helper';
import { shuffleArray } from '../common/helpers/user.helper';
import { ActiveUserData } from '../common/interfaces/active-user-data.interface';
import { User } from '../users/entities/user.entity';

import { BcryptService } from './bcrypt.service';

import { tokenDto } from './dto/refreshToken.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
const EXPIRE_DAY = '1d'; 

@Injectable()
export class AuthService {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly redisService: RedisService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<void> {
    const { email, password,roleId,statusId } = signUpDto;
    try {
      const user = new User();
      user.email = email;
      user.roleId = roleId || 3;
      user.statusId = statusId || 1; 
      user.passwordTemp = password; 
      user.password = await this.bcryptService.hash(password);
      await this.userRepository.save(user);
    } catch (error) {
      if (error.code === MysqlErrorCode.UniqueViolation) {
        throw new ConflictException(`User [${email}] already exist`);
      }
      throw error;
    }
     
  }

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const query = await this.userRepository.createQueryBuilder('u');
    const { email, password } = signInDto;
    const statusIdSet: number = 1;
    if (!email) { 
      throw new BadRequestException('email is null Access denied!');
    }
    const user = await this.userRepository.findOne({
      where: {
        email 
      },
    });
    if (!user) {
      throw new BadRequestException('Invalid email');
    }
    query.select('u.*');
    query.where('1=1'); 
    //console.log((`email=>`, email); 
    if (email) {
      query.andWhere('u.email=:email', { email: email,});
    } else {
      throw new BadRequestException('email is null Access denied!');
    } 
    query.andWhere('u.statusId=:statusId', {
      statusId: statusIdSet,
    });
    query.orderBy('u.created_at', 'ASC');
    query.orderBy('u.created_at', 'ASC');
    query.printSql();
    //query.maxExecutionTime(10000);
    query.getSql();
    let rs = await query.getRawMany();
    let count = await query.getCount();  
    //console.log(`count=>`, count);
    //console.log(`rs=>`, rs);
    //console.log('getSql:=> ' + query.getSql()); 
    if (count < 1) {
      throw new BadRequestException('Access denied!');
    }
    
    const user2 = await this.userRepository.findOne({
      where: {
        email
      },
    });

    //statusIdSet

    if (!user2) {
      throw new BadRequestException('User Inactive');
    }
    const isPasswordMatch = await this.bcryptService.compare(
      password,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new BadRequestException('Invalid password');
    }

    return await this.generateAccessToken(user);
  }
  
  async refreshTokens(token: string): Promise<void> {
    const query = await this.userRepository.createQueryBuilder('u');
    //console.log(('token=> ' + token); 
    if (!token) { 
      throw new BadRequestException('token is null Access denied!');
    }  
    const Rediskey: any = await this.redisService.get(token);
    //console.log('Rediskey:=> ' +Rediskey); 
    query.select('u.id,u.email,u.created_at,u.updated_at,u.roleId,u.statusId');
    query.where('1=1'); 
    query.andWhere('u.id=:id', {
      id: Rediskey,
    });
    query.orderBy('u.created_at', 'ASC');
    query.orderBy('u.created_at', 'ASC');
    query.printSql();
    //query.maxExecutionTime(10000);
    query.getSql();
    let rs = await query.getRawMany();
    let count = await query.getCount();  
    //console.log((`count=>`, count);
    //console.log((`rs=>`, rs[0]);
    //console.log('getSql:=> ' + query.getSql()); 
    if (count < 1) {
      throw new BadRequestException('tokenKey is null Access denied!');
    } 

    const Response: any = {
            statusCode: 200,
            message: "Token Successful.",
            error: null,
            token: token
      };
      return await Response; 
  }

  async signOut(userId: string): Promise<void> {
    this.redisService.delete(`user-${userId}`);
    const Response: any = {
                statusCode: 200,
                message: "Sign Out Successful.",
                error: null
          };
      return await Response; 
  }

  async generateAccessToken(
    user: Partial<User>,
  ): Promise<{ accessToken: string }> {
    const tokenId = randomUUID();
 
    await this.redisService.insert(`user-${user.id}`, tokenId);
    //console.log('tokenId:=> ' + tokenId);  
    //console.log('accessTokenTtl:=> ' + this.jwtConfiguration.accessTokenTtl);  
    //console.log('EXPIRE_DAY:=> ' +  this.jwtConfiguration.accessTokenExpire);  
    const EXPIREIn: any = this.jwtConfiguration.accessTokenExpire || this.jwtConfiguration.accessTokenTtl; 
    let timeTokenRefash: any = this.jwtConfiguration.timeTokenRefash 
    const accessToken = await this.jwtService.signAsync(
      {
        id: user.id,
        roleId: user.roleId,
        email: user.email,
        tokenId,
      } as ActiveUserData,
      {
        secret: this.jwtConfiguration.secret, 
        expiresIn: EXPIREIn,
      },
    );
    var decoded: any = {};
    var decoded: any = this.jwtService.decode(accessToken);
    const id = decoded.id;
    const roleId = decoded.roleId;
    const email = decoded.email;
    const tokenIdx = decoded.tokenId;
    const iat = decoded.iat * 1000;
    const exp = decoded.exp * 1000;
    //console.log('tokenIdx:=> ' + tokenIdx); 
    //console.log('decoded:=> ' + decoded); 
    const d1 = new Date(iat);
    const d2 = new Date(exp); 
    const payload: any ={
            token: accessToken,
            // tokenId: tokenIdx,
            //roleId: roleId, 
            email: email,  
            expiresIn: exp,
            signin_date: timeConvertermas(d1), 
            expires_date: timeConvertermas(d2), 
    }
    
    return payload;
  }

  async userinfo(token: string): Promise<User> {
      //console.log('getMe userId:=> ' + userId); 
      //console.log('token:=> ' + token); 
      var decoded: any = {};
      var decoded: any = this.jwtService.decode(token);
      let id = decoded.id;
      let iat:number = decoded.iat * 1000;
      let exp: number = decoded.exp * 1000;
      let nowTime: number = Date.now();
      let expCount1: number = exp - nowTime;
      let expCount:number = expCount1;
      let timeTokenRefash: any = this.jwtConfiguration.timeTokenRefash 
      //console.log('tokenIdx:=> ' + tokenIdx); 
      //console.log('decoded:=> ' + decoded); 
      let d1 = new Date(iat);
      let d2 = new Date(exp); 
      /*
      const user:any = await this.userRepository.findOne({
        where: {
          id: id,
        },
      });
      if (!user) {
        throw new BadRequestException('User not found');
      }  
      */ 
    if (expCount>=timeTokenRefash) { 
              const payload: any ={
                            token: token,
                            id: id,   
                            email: decoded.email,  
                            roleId:  decoded.roleId,  
                            expiresIn: exp,
                            nowTimeRe:nowTime,
                            expCount:expCount,
                            signin_date: timeConvertermas(d1), 
                            expires_date: timeConvertermas(d2), 
                            info:decoded,   
                            timeTokenRefash:timeTokenRefash, 
                      } 
              return payload
    } else {
          var decoded: any = {};
          var decoded: any = this.jwtService.decode(token);
          const id = decoded.id;
          const user:any = await this.userRepository.findOne({
            where: {
              id: id,
            },
          });
          if (!user) {
            throw new BadRequestException('User not found');
          } 
          const users:any = await this.generateAccessrefashToken(user);
          return users
    }
  }

  async refashToken(token: string): Promise<User> {
    //console.log('getMe userId:=> ' + userId); 
    //console.log('token:=> ' + token); 
    var decoded: any = {};
    var decoded: any = this.jwtService.decode(token);
    const id = decoded.id;
    const user:any = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    } 
    const users:any = await this.generateAccessrefashToken(user);
    return users
  }
  
  async generateAccessrefashToken(
    user: Partial<User>,
  ): Promise<{ accessToken: string }> {
    const tokenId = randomUUID();
 
    await this.redisService.insert(`user-${user.id}`, tokenId);
    //console.log('tokenId:=> ' + tokenId);  
    //console.log('accessTokenTtl:=> ' + this.jwtConfiguration.accessTokenTtl);  
    //console.log('EXPIRE_DAY:=> ' +  this.jwtConfiguration.accessTokenExpire);  
    const EXPIREIn:any = this.jwtConfiguration.accessTokenRefash || this.jwtConfiguration.accessTokenTtl; 
    const accessToken = await this.jwtService.signAsync(
      {
        id: user.id,
        roleId: user.roleId,
        email: user.email,
        tokenId,
      } as ActiveUserData,
      {
        secret: this.jwtConfiguration.secret, 
        expiresIn: EXPIREIn,
      },
    );
    var decoded: any = {};
    var decoded: any = this.jwtService.decode(accessToken);
    const id = decoded.id;
    const roleId = decoded.roleId;
    const email = decoded.email;
    const tokenIdx = decoded.tokenId;
    const iat = decoded.iat * 1000;
    const exp = decoded.exp * 1000;
    //console.log('tokenIdx:=> ' + tokenIdx); 
    //console.log('decoded:=> ' + decoded); 
    const d1 = new Date(iat);
    const d2 = new Date(exp); 
    const payload: any ={
            token: accessToken,
            email: email,  
            expiresIn: exp,
            signin_date: timeConvertermas(d1), 
            expires_date: timeConvertermas(d2), 
    }
    //console.log('refashToken:=> ' + accessToken); 
    return payload;
  }

}
