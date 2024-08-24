import { Entity, Column } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Supplier extends User {
  @Column({ type: 'varchar', length: 50, nullable: true })
  socialReason: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  cuit: string;

  @Column({ type: 'varchar', length: 50, nullable: true, default: 'Proveedor' }) // default: 'Proveedor' => default: 'Supplier' se lo agregamos para saber el tipo de usuario
  typeSu: string; // creamos este tipo de atributo para saber que tipo de usuario es, pq le pusimos el id q lo herede de user
}
