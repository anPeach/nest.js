import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class AuthUserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'Email address' })
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Invalid email address' })
  readonly email: string;

  @ApiProperty({ example: '1234_abcd', description: 'Password' })
  @Length(4, 16, {
    message: 'Password length must be in a range of digits: 4-16',
  })
  readonly password: string;
}
