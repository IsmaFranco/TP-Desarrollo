import { PrimaryGeneratedColumn, Column } from 'typeorm';
import { User } from '../../users/entities/user.entity';
export class Supplier extends User{
    @PrimaryGeneratedColumn('increment')
    idSupplier: number;
}