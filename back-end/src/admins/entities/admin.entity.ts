import { User } from '../../users/entities/user.entity';
import { Entity, Column } from 'typeorm';
@Entity()
export class Admin extends User {
  @Column({ type: 'int', length: 50, nullable: true })
  dni: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    default: 'Administrador',
  }) // default: 'Administrador' => default: 'Admin' se lo agregamos para saber el tipo de usuario
  typeAd: string; // creamos este tipo de atributo para saber que tipo de usuario es, pq le pusimos el id q lo herede de user
}
