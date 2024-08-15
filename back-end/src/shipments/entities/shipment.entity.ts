import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Shipment {
  @PrimaryGeneratedColumn('increment')
  idSh: number;

  @Column({ type: 'real', nullable: false })
  shipmentCost: number;

  @Column({ type: 'timestamp', name: 'dateShipmentOut' })
  dateSh: Date;

  @Column({ type: 'real', nullable: false })
  actualWeight: number;

  @Column({ type: 'real', nullable: false })
  volumetricWeight: number;

  /* @Column({type: 'timestamp', name:'updatedPurchase' })
  updatedPu:Date; cuando cambia el estado */
}
