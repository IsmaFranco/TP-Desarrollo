export class PriceHistory {
   @PrimaryGeneratedColumn({type: 'timestamp', name:'datePurchase' })
    fechaPh: date;

    @Column({type: 'real', nullable: false})
    total: real;
  
}
