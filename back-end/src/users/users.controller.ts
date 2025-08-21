import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs'

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':idUs')
  findOne(@Param('idUs') idUs: number): Promise<User> {
    return this.usersService.findOne(+idUs);
  }

  @Patch(':idUs')
  async update(
    @Param('idUs') idUs: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<{user: User, token: string}> {
      const updatedUser = await this.usersService.update(+idUs, updateUserDto);
      const payload = { user: updatedUser };
      const newToken = this.jwtService.sign(payload);
      
      return { user: updatedUser, token: newToken };
      }

  @Delete(':idUs')
  async remove(@Param('idUs') idUs: number, @Body() deleteDto: {password: string}): Promise<void> {
    const user = await this.usersService.findOne(+idUs);
    const isPasswordValid = await bcryptjs.compare(deleteDto.password, user.passwordUs);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Contraseña incorrecta');
      }
    await this.usersService.remove(+idUs);
    return;
  }

  @Patch(':id/password')
  async changePassword(
    @Param('id') idUs: number,
    @Body() changePasswordDto: { currentPassword: string; newPassword: string }
  ): Promise<{ message: string }> {
    return this.usersService.changePassword(
      +idUs, 
      changePasswordDto.currentPassword, 
      changePasswordDto.newPassword
    );
  }
}
