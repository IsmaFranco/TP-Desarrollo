export class Clothe {
   @PrimaryGeneratedColumn('increment')
    idCl: number;

    @Column({type: 'varchar', length: 200, nullable: true})
    description: string;

    @Column({type: 'varchar', nullable: false, length:3 })
    size: string;

    @Column({type: 'varchar', nullable: false, length:200 })
    typeCl: string;

    @Column ({type: 'integer', nullable: false })
    stock: integer;
    }
