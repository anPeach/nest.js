import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { AuthUserDto } from 'src/users/dto/auth-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { omit } from 'src/utils/utils';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('/login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() dto: AuthUserDto,
  ) {
    const { token } = await this.authService.login(dto);
    const user = await this.userService.getByEmail(dto.email);
    const res = omit('password', user.dataValues);

    return { ...res, token };
  }

  @Post('/registration')
  async registration(@Body() dto: CreateUserDto) {
    const { token } = await this.authService.registration(dto);
    const user = await this.userService.getByEmail(dto.email);
    const res = omit('password', user.dataValues);

    return { ...res, token };
  }
}
