import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { Clothe } from 'src/clothes/entities/clothe.entity';
import { Purchase } from 'src/purchases/entities/purchase.entity';

@Entity('purchase_clothe')
export class PurchaseClothe {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => Purchase, (purchase) => purchase.purchaseClothe, { onDelete: 'CASCADE', eager: true })
    @JoinColumn({ name: 'purchase_id' })
    purchase: Purchase;

    @ManyToOne(() => Clothe, (clothe) => clothe.purchaseClothe, { eager: true })
    @JoinColumn({ name: 'clothe_id' })
    clothe: Clothe;

    @Column({ type: 'integer', nullable: false })
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    unitPrice: number;
}
