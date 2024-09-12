import { Entity, Column } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Customer extends User {
  @Column({ type: 'varchar', length: 50, nullable: true, default: 'Cliente' }) // default: 'Cliente' => default: 'Customer' se lo agregamos para saber el tipo de usuario
  typeCu: string; // creamos este tipo de atributo para saber que tipo de usuario es, pq le pusimos el id q lo herede de user

  /*  @Column({ type: 'date', nullable: true })
  DateB: Timestamp; fecha de nacimiento ver como hacer este*/
  // podemos ponerle una categoria de cliente, por ej: vip, gold, silver, etc. segun la cantidad de compras que haga o algun beneficio especial que tenga
  @Column({ type: 'varchar', length: 50, nullable: true })
  categoryCu: string;
}
