import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class Purchase {
  @PrimaryGeneratedColumn('increment')
  idPu: number;

  @Column({ type: 'varchar', length: 200, nullable: true })
  observation: string;

  @Column({ type: 'integer', nullable: false })
  amount: number;

  /* @Column({type: 'varchar', default: 'ENPROCESO', length:15;})
  status: string: */

  @Column({ type: 'timestamp', name: 'datePurchase' })
  datePu: Date;

  /* @Column({type: 'timestamp', name:'updatedPurchase' })
  updatedPu:Date; cuando cambia el estado */
}
