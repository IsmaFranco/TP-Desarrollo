export class Locality {
   @PrimaryGeneratedColumn(//hay q ver si se le pone parametros)
    postalCode: number;

    @Column({type: 'varchar', nullable: false, length:100 })
    nameLo: string;

}
