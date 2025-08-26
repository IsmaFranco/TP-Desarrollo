import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Locality } from 'src/localities/entities/locality.entity';
import * as bcryptjs from 'bcryptjs'

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
    return this.userRepository.findOneBy({ emailUs, isActive: true });
  }

  findByEmailWithPassword(emailUs: string): Promise<User> {
    return this.userRepository.findOne({
      where: { emailUs: emailUs, isActive: true } });
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({ where: { isActive: true } });
  }
  
  findOne(idUs: number): Promise<User> {
    return this.userRepository.findOne({ where: { idUs: idUs, isActive: true }, relations: ['locality'] });
  }

  async update(idUs: number, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.idLo) {
    const locality = await this.localitiesRepository.findOne({ 
      where: { idLo: updateUserDto.idLo } 
    });

    const { idLo, ...otherData } = updateUserDto;
    
    await this.userRepository.update(idUs, otherData);
    
    await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ locality: locality })
      .where("idUs = :idUs", { idUs })
      .execute();
      
  } else {
    await this.userRepository.update(idUs, updateUserDto);
  }

  return this.findOne(idUs);
}

  async changePassword(idUs: number, currentPassword: string, newPassword: string): Promise<{ message: string }> {
  const user = await this.userRepository.findOne({
    where: { idUs },
    select: ['idUs', 'passwordUs'] 
  });

  const isCurrentPasswordValid = await bcryptjs.compare(currentPassword, user.passwordUs);
  
  if (!isCurrentPasswordValid) {
    throw new BadRequestException('Contraseña actual incorrecta');
  }

  const hashedNewPassword = await bcryptjs.hash(newPassword, 12);

  await this.userRepository.update(idUs, { passwordUs: hashedNewPassword });

  return { message: 'Contraseña actualizada correctamente' };
}

  async remove(idUs: number): Promise<void> {
    await this.userRepository.update(idUs, { isActive: false });
  }
}
