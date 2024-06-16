import { Column } from 'typeorm';
import { User } from '../../users/entities/user.entity';
export class Admin extends User {
  @Column({ type: 'varchar', length: 20, nullable: true })
  rol: string; // ver bien los atr que vamos a usar
}
