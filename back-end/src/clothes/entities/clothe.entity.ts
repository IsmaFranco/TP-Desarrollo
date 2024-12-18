import { Purchase } from 'src/purchases/entities/purchase.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany } from 'typeorm';

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
  image: string; 

  @Column({ type: 'integer', nullable: false })
  price: number;

  @ManyToMany(() => Purchase, (purchase) => purchase.clothes)
  purchase: Purchase;

  @OneToMany(() => User, (user) => user.clothes)
  user: User;
}
