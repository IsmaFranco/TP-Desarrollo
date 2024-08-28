import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export abstract class User {
  @PrimaryGeneratedColumn('increment')
  idUs: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  nameUs: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  lastNameUs: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  emailUs: email;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phoneUs: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  addressUs: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  passwordUs: password; // ver bien como es lo de la contgraseña y si este atr esta bien pasado
}
