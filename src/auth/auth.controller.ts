import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { AuthUserDto } from 'src/users/dto/auth-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

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
    const { id, name, nickname, email } = await this.userService.getByEmail(
      dto.email,
    );

    return { id, name, nickname, email, token };
  }

  @Post('/registration')
  async registration(@Body() dto: CreateUserDto) {
    const { token } = await this.authService.registration(dto);
    const { id, name, nickname, email } = await this.userService.getByEmail(
      dto.email,
    );

    return { id, name, nickname, email, token };
  }
}
