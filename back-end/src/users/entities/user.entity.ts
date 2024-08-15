import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export abstract class User {
  @PrimaryGeneratedColumn('increment')
  idUs: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  nombre: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  apellido: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  contraseña: string; // ver bien como es lo de la contgraseña y si este atr esta bien pasado
}
