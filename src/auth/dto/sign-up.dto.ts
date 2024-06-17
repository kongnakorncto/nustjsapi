import { ApiProperty } from '@nestjs/swagger';

import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
  IsNumber,
} from 'class-validator';

import { Match } from '../../common/decorators/match.decorator';

export class SignUpDto {
  @ApiProperty({
    required: true, 
    example: 'Admin@gmail.com',
    description: 'Email of user',
  })
  @IsEmail()
  @MaxLength(255)
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    required: true ,
    description: 'Password of user',
    example: 'Pass#123',
  })
  @MinLength(8, {
    message: 'password too short',
  })
  @MaxLength(20, {
    message: 'password too long',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({
    description: 'Repeat same value as in password field',
    example: 'Pass#123',
  })
  @Match('password')
  @IsNotEmpty()
  readonly passwordConfirm: string;

  @IsNumber()
  @ApiProperty({
    required: true ,
    description: 'Role Id',
    example: '3',
  })
  roleId: number;

  @IsNumber()
  @ApiProperty({
    required: true ,
    description: 'Status Id',
    example: '1',
  })
  statusId: number;
  
}
