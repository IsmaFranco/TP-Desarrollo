import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>, // Cambiado a adminRepository
  ) {}

  create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const admin = this.adminRepository.create(createAdminDto); //Cambiado a adminRepository, decia admins y era admin
    return this.adminRepository.save(admin); // Cambiado a adminRepository, decia admins y era admin
  }

  findAll(): Promise<Admin[]> {
    return this.adminRepository.find(); // Cambiado a adminRepository, decia admins y era admin
  }

  findOne(idUs: number): Promise<Admin> {
    return this.adminRepository.findOne({ where: { idUs: idUs } }); // Cambiado a adminRepository, decia admins y era admin
  }

  async update(idUs: number, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    await this.adminRepository.update(idUs, updateAdminDto); // Cambiado a adminRepository, decia admins y era admin
    return this.findOne(idUs);
  }

  async remove(idUs: number): Promise<void> {
    await this.adminRepository.delete(idUs);
  }
}
