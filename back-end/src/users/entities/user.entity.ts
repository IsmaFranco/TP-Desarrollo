import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Locality } from '../../localities/entities/locality.entity';

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

  @Column({ type: 'varchar', length: 20, nullable: false }) //nullabe false significa que no puede ser nulo
  passwordUs: string; // ver bien como es lo de la contgraseña y si este atr esta bien pasado

  @Column({ default: 'user' })
  rol: string;

  @ManyToOne(() => Locality, (locality) => locality.users)
  locality: Locality;
}
