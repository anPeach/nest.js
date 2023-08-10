import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 1, description: 'User id' })
  @IsNumber()
  readonly userId: number;

  @ApiProperty({ example: 'Some text', description: 'Text for user post' })
  @IsNotEmpty()
  readonly text: string;
}
