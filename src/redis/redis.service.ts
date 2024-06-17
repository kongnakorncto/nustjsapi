import { Inject, Injectable } from '@nestjs/common';

import { Redis } from 'ioredis';

import { IORedisKey } from './redis.constants';

@Injectable()
export class RedisService {
  constructor(
    @Inject(IORedisKey)
    private readonly redisClient: Redis,
  ) {}

  async getKeys(pattern?: string): Promise<string[]> {
    return await this.redisClient.keys(pattern);
  }

  async insert(key: string, value: string | number): Promise<void> {
    //console.log('redis insert key:=> ' + key+' value:=> ' + value); 
    await this.redisClient.set(key, value);
  }

  async get(key: string): Promise<string> {
    //console.log('redis gey key:=> ' + key ); 
    //console.log('redis rs:=> ' + this.redisClient.get(key)); 
    return this.redisClient.get(key);
  }

  async delete(key: string): Promise<void> {
    await this.redisClient.del(key);
  }

  async validate(key: string, value: string): Promise<boolean> {
    const storedValue = await this.redisClient.get(key);
    return storedValue === value;
  }
}
