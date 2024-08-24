import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class PriceHistory {
  //ver como se llama a la clave externa para que este unida con la ropa
  @PrimaryGeneratedColumn({ type: 'number', name: 'datePurchase' })
  fechaPh: number; // ver bien q onda con esta columna pq no se puede q la fecha sea la CP

  @Column({ type: 'number', nullable: false })
  total: number;

  @Column({ type: 'number', nullable: false })
  idCl: number; // ver bien como pasar las relaciones
}
