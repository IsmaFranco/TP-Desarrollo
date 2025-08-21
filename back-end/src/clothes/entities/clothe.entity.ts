import { PurchaseClothe } from 'src/purchase-clothe/entities/purchase-clothe.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

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

  @Column({ type: 'varchar', nullable: false, length: 700 })
  image: string; 

  @Column({ type: 'integer', nullable: false })
  price: number;

  @OneToMany(() => PurchaseClothe, purchaseClothe => purchaseClothe.clothe)
  purchaseClothe: PurchaseClothe;
}
