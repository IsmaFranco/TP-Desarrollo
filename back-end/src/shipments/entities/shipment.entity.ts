import { Locality } from 'src/localities/entities/locality.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Purchase } from 'src/purchases/entities/purchase.entity';

@Entity()
export class Shipment {
  @PrimaryGeneratedColumn('increment')
  idSh: number;

  @Column({ type: 'timestamp', name: 'dateShipmentOut' })
  dateSh: Date;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 200,
    default: 'Procesando Datos Envio',
  })
  status: string; // estado del envio

  @Column ({ type: 'real', nullable: false })
  postalCode: number;

  @OneToMany(() => Purchase, (purchase) => purchase.shipment)
  purchases: Purchase[];
}
