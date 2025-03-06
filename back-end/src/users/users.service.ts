import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Locality } from 'src/localities/entities/locality.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Locality)
    private localitiesRepository: Repository<Locality>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const locality = await this.localitiesRepository.findOne({ where: { idLo: createUserDto.idLo } });

    if (!locality) {
      throw new BadRequestException('Localidad no encontrada');
    }
    
    const user = this.userRepository.create({...createUserDto, locality: locality});
    return await this.userRepository.save(user);
  }

  findOneByEmail(emailUs: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ emailUs });
  }

  findByEmailWithPassword(emailUs: string): Promise<User> {
    return this.userRepository.findOne({
      where: { emailUs },
      select: ['idUs', 'nameUs', 'emailUs', 'passwordUs', 'rol'],
    });
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
