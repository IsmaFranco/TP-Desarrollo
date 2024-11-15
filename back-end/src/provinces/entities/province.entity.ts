import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class Province {
  @PrimaryGeneratedColumn('increment')
  idPr: number;

  @Column({ unique: true, type: 'varchar', length: 200, nullable: false })
  namePr: string;
}
