import { User } from '../../users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Admin extends User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  rol: string; // ver bien los atr que vamos a usar
}
