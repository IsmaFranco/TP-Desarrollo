import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Rol } from '../../common/enums/rol.enum';
import { Purchase } from 'src/purchases/entities/purchase.entity';
import { Locality } from 'src/localities/entities/locality.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  idUs: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  nameUs: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  lastNameUs: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  emailUs: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  phoneUs: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  addressUs: string;

  @Column({ type: 'varchar', length: 200, nullable: false }) //nullabe false significa que no puede ser nulo
  passwordUs: string;

  @Column({ type: 'enum', default: Rol.USER, enum: Rol })
  rol: Rol; //tendria que haber sido role, pero ya avanzamos bastante y no quiero cambiarlo

  @ManyToOne(() => Locality, { eager: true })
  @JoinColumn({ name: 'idLo' })
  locality: Locality;

  @OneToMany(() => Purchase, (purchase) => purchase.user)
  purchases: Purchase[];

  @Column({ default: true })
  isActive: boolean;
}
