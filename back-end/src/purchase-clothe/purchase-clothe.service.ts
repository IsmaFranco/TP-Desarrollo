import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseClothe } from './entities/purchase-clothe.entity';
import { CreatePurchaseClotheDto } from './dto/create-purchase-clothe.dto';

@Injectable()
export class PurchaseClotheService {
    constructor(
        @InjectRepository(PurchaseClothe)
        private purchaseClotheRepository: Repository<PurchaseClothe>
    ) { }

    async create(createPurchaseClotheDto: CreatePurchaseClotheDto): Promise<PurchaseClothe> {
        const purchaseClothe = this.purchaseClotheRepository.create(createPurchaseClotheDto);
        return await this.purchaseClotheRepository.save(purchaseClothe);
    }

    async findAll(): Promise<PurchaseClothe[]> {
        return await this.purchaseClotheRepository.find();
    }

    findByPurchaseId(purchaseId: number): Promise<PurchaseClothe[]> {
        return this.purchaseClotheRepository.find({
            where: {
                purchase: { idPu: purchaseId }
            },
            relations: ['purchase']
        });
    }
}
