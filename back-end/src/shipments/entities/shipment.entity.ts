export class Shipment { 
  
    @PrimaryGeneratedColumn('increment')
    idSh: number;

    @Column({type: 'real', nullable: false})
    shipmentCost: real;

    @Column({type: 'timestamp', name:'dateShipmentOut' })
    dateSh:Date;
  
    @Column({type: 'real', nullable: false })
    actualWeight: real;
  
    @Column({type: 'real', nullable: false })
    volumetricWeight: real: 


    /* @Column({type: 'timestamp', name:'updatedPurchase' })
    updatedPu:Date; cuando cambia el estado */}
