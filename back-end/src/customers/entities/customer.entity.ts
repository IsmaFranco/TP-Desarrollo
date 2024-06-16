import { Column } from 'typeorm';
import { User } from '../../users/entities/user.entity';
export class Customer extends User {
  @Column({ type: 'varchar', length: 40, nullable: true })
  address: string;
}
