import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

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
  update(
    @Param('idUs') idUs: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(idUs, updateUserDto);
  }

  @Delete(':idUs')
  remove(@Param('idUs') idUs: number): Promise<void> {
    return this.usersService.remove(idUs);
  }
}
