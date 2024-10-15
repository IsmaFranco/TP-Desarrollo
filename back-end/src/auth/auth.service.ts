import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  register() {
    return 'register';
  }
  login() {
    return 'login';
  }
}
