import { Clothe } from 'src/clothes/entities/clothe.entity';
import { Shipment } from 'src/shipments/entities/shipment.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
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

  @CreateDateColumn({ type: 'timestamp', name: 'datePurchase' })
  datePu: Date;

  /* @Column({type: 'timestamp', name:'updatedPurchase' })
  updatedPu:Date; cuando cambia el estado */

  @ManyToOne(() => Shipment, (shipment) => shipment.purchases)
  shipment: Shipment;

  @OneToMany(() => Clothe, (clothe) => clothe.purchase)
  clothes: Clothe[];

  @ManyToOne(() => User, (user) => user.purchases)
  user: User;
}
