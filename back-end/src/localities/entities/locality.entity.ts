import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Shipment } from '../../shipments/entities/shipment.entity';
@Entity()
export class Locality {
  @PrimaryGeneratedColumn()
  postalCode: number;

  @Column({ type: 'varchar', nullable: false, length: 100 })
  nameLo: string;


  //eager: true;ver si usamos esto es para que traiga los datos de la relacion en un findone
}
