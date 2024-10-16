import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

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

  login() {
    return 'login';
  }
}
