import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class Locality {
  @PrimaryGeneratedColumn()
  postalCode: number;

  @Column({ type: 'varchar', nullable: false, length: 100 })
  nameLo: string;
}
