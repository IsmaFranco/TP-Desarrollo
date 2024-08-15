import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class PriceHistory {
  @PrimaryGeneratedColumn({ type: 'number', name: 'datePurchase' })
  fechaPh: number; // ver bien q onda con esta columna

  @Column({ type: 'number', nullable: false })
  total: number;
}
