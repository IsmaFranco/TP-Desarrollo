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
    private localityRepository: Repository<Locality>, //esto se hace para que pueda acceder a la tabla de localidades con un join??
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    //const user = this.userRepository.create(createUserDto); esto tambien deberia borrarlo creo
    const locality = await this.localityRepository.findOneBy({
      postalCode: createUserDto.postalCode,
    });
    if (!locality) {
      throw new BadRequestException('Locality not found');
    }
    return await this.userRepository.save({ ...createUserDto, locality }); // todo esto lo hice para que se guarde la localidad en la tabla de usuarios
    //return this.userRepository.save(user); creo q ya se deberia borrar por lo que hice arriba //este guarda en la base de datos ver si me conviene hacer un  async create y hacer un await de esto
  }

  findOneByEmail(emailUs: string): Promise<User|undefined> {
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
