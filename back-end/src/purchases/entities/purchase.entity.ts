import { PurchaseClothe } from 'src/purchase-clothe/entities/purchase-clothe.entity';
import { Shipment } from 'src/shipments/entities/shipment.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
@Entity()
export class Purchase {
  @PrimaryGeneratedColumn('increment')
  idPu: number;

  @Column({ type: 'integer', nullable: false })
  amount: number;

  @CreateDateColumn({ type: 'timestamp', name: 'datePurchase' })
  datePu: Date;

  @ManyToOne(() => Shipment, { eager: true })
  @JoinColumn({ name: 'idSh' })
  shipment: Shipment;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'idUs' })
  user: User;

  @Column({ nullable: true })
  paymentId: string;

  @OneToMany(() => PurchaseClothe, purchaseClothe => purchaseClothe.purchase)
  purchaseClothe: PurchaseClothe[];

}
