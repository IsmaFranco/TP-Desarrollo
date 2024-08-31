import { Purchase } from 'src/purchases/entities/purchase.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Clothe {
  @PrimaryGeneratedColumn('increment')
  idCl: number;

  @Column({ type: 'varchar', length: 200, nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: false, length: 3 })
  size: string;

  @Column({ type: 'varchar', nullable: false, length: 200 })
  typeCl: string;

  @Column({ type: 'integer', nullable: false })
  stock: number;

  @Column({ type: 'varchar', nullable: false, length: 200 })
  image: string; //ver bien el tipo de string osea no se si estaria bien que sea tipo string

  @ManyToOne(() => Purchase, (purchase) => purchase.clothes)
  purchase: Purchase;
}
