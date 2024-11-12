import { Purchase } from 'src/purchases/entities/purchase.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Clothe {
  @PrimaryGeneratedColumn('increment')
  idCl: number;

  @Column({ type: 'varchar', nullable: false, length: 70 })
  nameCl: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: false, length: 3 })
  size: string;

  @Column({ type: 'varchar', nullable: false, length: 200 })
  typeCl: string;

  @Column({ type: 'integer', nullable: false })
  stock: number;

  @Column({ type: 'varchar', nullable: false, length: 500 })
  image: string; //ver bien el tipo de string osea no se si estaria bien que sea tipo string

  @Column({ type: 'integer', nullable: false })
  price: number;

  @ManyToOne(() => Purchase, (purchase) => purchase.clothes)
  purchase: Purchase;

  @ManyToOne(() => User, (user) => user.clothes)
  user: User;
}
