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

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (user && (await bcryptjs.compare(password, user.passwordUs))) {
      return { message: 'Login exitoso', user };
    }
    throw new Error('Credenciales incorrectas');
  }

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.findOneByEmail(registerDto.emailUs);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    // Hash de la contraseña antes de guardar el usuario
    const hashedPassword = await bcryptjs.hash(registerDto.passwordUs, 10);
    registerDto.passwordUs = hashedPassword;

    await this.usersService.create(registerDto); //lo almacena en la base de datos

    return { emailUs: registerDto.emailUs, nameUs: registerDto.nameUs }; // devuelve el nombre y el email
  }

  async login({ emailUs, passwordUs }: Logindto) {
    const user = await this.usersService.findByEmailWithPassword(emailUs);
    if (!user) {
      throw new UnauthorizedException('Email incorrecto');
    }

    const isPasswordValid = await bcryptjs.compare(passwordUs, user.passwordUs);
    if (!isPasswordValid) {
      console.log('Contraseña incorrecta');
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const payload = {emailUs: user.emailUs, rol: user.rol, idUs: user.idUs};
    const token = this.jwtService.sign(payload);

    return { token, emailUs };
  }
  async profile({ emailUs, rol }: { emailUs: string; rol: string[] }) {
    return await this.usersService.findOneByEmail(emailUs);
  }
}
