import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'Email address' })
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Invalid email address' })
  readonly email: string;

  @ApiProperty({ example: '1234_abcd', description: 'Password' })
  @Length(4, 16, {
    message: 'Password length must be in a range of digits: 4-16',
  })
  readonly password: string;

  @ApiProperty({ example: 'Anastasiia', description: 'Name' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'anPeach', description: 'Nickname' })
  @IsNotEmpty()
  readonly nickname: string;
}
