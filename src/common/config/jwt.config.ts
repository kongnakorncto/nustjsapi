import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => {
  console.log('accessTokenTtl:=> ' + process.env.JWT_EXPIRE);  
  console.log('JWT_EXPIRE:=> ' + process.env.JWT_EXPIRE);  
  console.log('JWT_EXPIRE_REFASH:=> ' + process.env.JWT_EXPIRE_REFASH);  
  return {
    secret: process.env.JWT_SECRET,
    accessTokenTtl: process.env.JWT_ACCESS_TOKEN_TTL,
    accessTokenExpire: process.env.JWT_EXPIRE,
    accessTokenRefash: process.env.JWT_EXPIRE_REFASH,
    timeTokenRefash: process.env.JWT_Time_REFASH
  };
});
