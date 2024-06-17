import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

import { Exclude } from 'class-transformer';

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @ApiProperty({
    description: 'ID of user', 
  }) 
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Email of user', example: 'atest@email.com' })
  @Column({ unique: true })
  email!: string;

  @ApiHideProperty()
  @Column({type: "varchar",length: 120})
  @Exclude({ toPlainOnly: true })
  password: string;

  @ApiHideProperty()
  @Column({type: "varchar",length: 120}) 
  passwordTemp: string;
  
  @ApiProperty({ description: 'Created date of user' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: 'Updated date of user' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
  
  @ApiProperty({description: 'Role ID',example: '2'})
  @Column({ type: 'int',nullable: true}) 
  roleId!: number; 

  @ApiProperty({ description: 'Status ID', example: '0' })
  @Column({type: "int",nullable: true})
  statusId!: number; 
  
}
