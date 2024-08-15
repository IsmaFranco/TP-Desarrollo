import { Entity, Column } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Customer extends User {
  @Column({ type: 'varchar', length: 40, nullable: true })
  address: string;
}
