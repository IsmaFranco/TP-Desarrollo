import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Locality } from '../../localities/entities/locality.entity';

@Entity()
export abstract class User {
  @PrimaryGeneratedColumn('increment')
  idUs: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  nameUs: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  lastNameUs: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  emailUs: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phoneUs: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  addressUs: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  passwordUs: string; // ver bien como es lo de la contgraseña y si este atr esta bien pasado

  @ManyToOne(() => Locality, (locality) => locality.users)
  locality: Locality;
}
