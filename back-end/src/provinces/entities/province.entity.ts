export class Province {
   @PrimaryGeneratedColumn('increment')
    idPr: number;

    @Column({type: 'varchar', length: 200, nullable: false})
    name: string;
}
