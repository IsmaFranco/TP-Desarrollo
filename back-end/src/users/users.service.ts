import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user); //este guarda en la base de datos ver si me conviene hacer un  async create y hacer un await de esto
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(idUs: number): Promise<User> {
    return this.userRepository.findOne({ where: { idUs: idUs } });
  }

  async update(idUs: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(idUs, updateUserDto);
    return this.findOne(idUs);
  }

  async remove(idUs: number): Promise<void> {
    await this.userRepository.delete(idUs);
  }
}
