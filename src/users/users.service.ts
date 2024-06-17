import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; 

import { Repository } from 'typeorm';

import { RedisService } from '../redis/redis.service';
import { timeConvertermas,getRandomString,timeConverter} from '../common/helpers/format.helper';

import { User } from './entities/user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly redisService: RedisService 
  ) {}

  async getMe(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    //return user; 
    const ResponseUser: any = {
              //id: user.id,
              email: user.email, 
              createdAt: user.createdAt, 
              updatedAt: user.updatedAt, 
              //roleId: user.roleId,  
              //statusId: user.statusId, 
    }  
    //const Rediskey: any =await this.redisService.get(`user-${user.id}`);
 
      const Response: any = {
          statusCode: 200,
          message: "Successful.",
          error: null, 
          //userId: user.id,
          userkey: `user-${user.id}`,
          roleId: user.roleId, 
          // Rediskey: Rediskey, 
          payload: ResponseUser 
        };
    return await Response; 
  } 
}
