import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { AuthUserDto } from 'src/users/dto/auth-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() dto: AuthUserDto,
  ) {
    const { token } = await this.authService.login(dto);

    // response.cookie('jwt', token, { httpOnly: true }).send();
    return token;
  }

  @Post('/registration')
  registration(@Body() dto: CreateUserDto) {
    return this.authService.registration(dto);
  }
}
