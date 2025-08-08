import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Shipment } from '../../shipments/entities/shipment.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Locality {
  @PrimaryGeneratedColumn('increment')
  idLo:number;

  @Column({ type: 'integer', unique: true, nullable: false })
  postalCode: number;

  @Column({ type: 'varchar', nullable: false, length: 100 })
  nameLo: string;

  @Column({ type: 'real', nullable: false })
  cost: number;

  @OneToMany(() => Shipment, (shipment) => shipment.locality)
  shipment: Shipment[];

  @OneToMany(() => User, (user) => user.locality)
  user: User[];

}
