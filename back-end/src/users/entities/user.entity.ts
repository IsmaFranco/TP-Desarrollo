import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Locality } from '../../localities/entities/locality.entity';
import { Rol } from '../../common/enums/rol.enum';
import { Clothe } from 'src/clothes/entities/clothe.entity';
import { Purchase } from 'src/purchases/entities/purchase.entity';

@Entity()
export abstract class User {
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

  @Column({ type: 'varchar', length: 200, nullable: false, select: false }) //nullabe false significa que no puede ser nulo
  passwordUs: string; // ver bien como es lo de la contgraseña y si este atr esta bien pasado

  @Column({ type: 'enum', default: Rol.USER, enum: Rol })
  rol: Rol; //tendria que haber sido role, pero ya avanzamos bastante y no quiero cambiarlo

  @Column({ type: 'int', nullable: false })
  postalCode: number;

  @ManyToOne(() => Clothe, (clothe) => clothe.user)
  clothes: Clothe[];

  @OneToMany(() => Purchase, (purchase) => purchase.user)
  purchases: Purchase[];
}
