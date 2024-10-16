import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Logindto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body()
    registerDto: RegisterDto,
  ) {
    //console.log(registerDto); lo dejo para verlo dsp ya que no esta validando los datos (creo)
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(
    @Body()
    loginDto: Logindto,
  ) {
    return this.authService.login(loginDto);
  }
}
