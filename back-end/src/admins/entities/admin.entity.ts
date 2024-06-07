import { PrimaryGeneratedColumn, Column } from 'typeorm';
import { User } from '../../users/entities/user.entity';
export class Admin extends User{
    @PrimaryGeneratedColumn('increment')
    idAdmin: number;
}