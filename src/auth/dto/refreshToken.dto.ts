import { ApiProperty } from '@nestjs/swagger';

import {
  IsEmail,
  IsNotEmpty,
  IsEmpty,
  Matches,
  MaxLength,
  MinLength,
  IsNumber,
} from 'class-validator';

export class tokenDto {

  @IsNotEmpty()
  readonly tokenKey: string;
    
}
