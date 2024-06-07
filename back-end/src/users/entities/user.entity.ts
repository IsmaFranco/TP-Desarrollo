import { PrimaryGeneratedColumn, Column } from 'typeorm';
export abstract class User {
    @Column({type: 'varchar', length: 20, nullable: true})
    nombre: string;
    @Column({type: 'varchar', length: 20, nullable: true})
    apellido: string;
    @Column({type: 'varchar', length: 50, nullable: true})
    email: string;
    @Column({type: 'varchar', length: 20, nullable: true})
    telefono: string;
    @Column({type: 'varchar', length: 20, nullable: true})
    contraseña: string;
}

