import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Purchase } from 'src/purchases/entities/purchase.entity';
import { Locality } from 'src/localities/entities/locality.entity';

export enum STATUS {
  PENDING = 'Pendiente',
  SENT = 'Enviado',
  DELIVERED = 'Entregado',
}

@Entity()
export class Shipment {

  @PrimaryGeneratedColumn('increment')
  idSh: number;

  @Column({ type: 'timestamp', name: 'dateShipmentOut' })
  dateSh: Date;

  @Column({
    type: 'varchar',
    length: 50,
    default: STATUS.PENDING,
  })
  status: STATUS; 

  @ManyToOne(() => Locality, { eager: true })
  @JoinColumn({ name: 'idLo' })
  locality: Locality;

  @OneToMany(() => Purchase, (purchase) => purchase.shipment)
  purchases: Purchase[];
}
