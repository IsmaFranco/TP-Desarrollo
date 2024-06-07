import { PrimaryGeneratedColumn, Column } from 'typeorm';
import { User } from '../../users/entities/user.entity';
export class Customer extends User{
    @PrimaryGeneratedColumn('increment')
    idCustomer: number;
}