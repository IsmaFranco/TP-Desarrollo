import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { Logindto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.findOneByEmail(registerDto.emailUs);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    // Hash de la contraseña antes de guardar el usuario
    const hashedPassword = await bcryptjs.hash(registerDto.passwordUs, 10);
    registerDto.passwordUs = hashedPassword;

    return await this.usersService.create(registerDto);
  }

  async login({ emailUs, passwordUs }: Logindto) {
    const user = await this.usersService.findOneByEmail(emailUs);
    if (!user) {
      throw new UnauthorizedException('Email incorrecto');
    }

    const isPasswordValid = bcryptjs.compare(passwordUs, user.passwordUs);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const payload = { emailUs: user.emailUs };

    const token = await this.jwtService.sign(payload);

    return { emailUs, token };
  }
}
