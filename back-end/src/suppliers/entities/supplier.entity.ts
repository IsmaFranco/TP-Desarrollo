import { Column } from 'typeorm';
import { User } from '../../users/entities/user.entity';
export class Supplier extends User {
  @Column({ type: 'varchar', length: 50, nullable: true })
  socialReason: string;
}
