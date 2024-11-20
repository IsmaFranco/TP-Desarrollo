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
  JoinColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
@Entity()
export class Purchase {
  @PrimaryGeneratedColumn('increment')
  idPu: number;

  @Column({ type: 'integer', nullable: false })
  amount: number;

  /* @Column({type: 'varchar', default: 'ENPROCESO', length:15;})
  status: string: */

  @CreateDateColumn({ type: 'timestamp', name: 'datePurchase' })
  datePu: Date;

  /* @Column({type: 'timestamp', name:'updatedPurchase' })
  updatedPu:Date; cuando cambia el estado */

  @ManyToOne(() => Shipment, { eager: true })
  @JoinColumn({ name: 'idSh' })
  shipment: Shipment;

  @ManyToMany(() => Clothe, { eager: true })
  @JoinTable({
    name: 'purchase_clothes',
    joinColumn: { name: 'purchase', referencedColumnName: 'idPu' },
    inverseJoinColumn: { name: 'clothe', referencedColumnName: 'idCl' }
  })
  clothes: Clothe[];

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'idUs' })
  user: User;
}
