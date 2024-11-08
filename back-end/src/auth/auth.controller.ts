import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Logindto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Request } from 'express';
import { Roles } from './decorators/roles.decorators';
import { RolesGuard } from './guard/roles.guard';
import { Rol } from '../common/enums/rol.enum';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';

interface RequestWithUser extends Request {
  user: {
    // id: number; ver si es necesario agregarlo
    emailUs: string;
    rol: string[];
  };
}
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  register(
    @Body()
    registerDto: RegisterDto,
  ) {
    console.log(registerDto); //lo dejo para verlo dsp ya que no esta validando los datos (creo)
    return this.authService.register(registerDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(
    @Body()
    loginDto: Logindto,
  ) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @Roles(Rol.ADMIN, Rol.USER, Rol.SUPPLIER)
  @UseGuards(AuthGuard, RolesGuard)
  profile(@ActiveUser() user: UserActiveInterface) {
    return this.authService.profile(user);
  }
}
