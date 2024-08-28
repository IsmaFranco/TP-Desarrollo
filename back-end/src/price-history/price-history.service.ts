import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePriceHistoryDto } from './dto/create-price-history.dto';
import { UpdatePriceHistoryDto } from './dto/update-price-history.dto';
import { PriceHistory } from './entities/price-history.entity';

@Injectable()
export class PriceHistoryService {
  create(createPriceHistoryDto: CreatePriceHistoryDto) {
    return 'This action adds a new priceHistory';
  }

  findAll() {
    return `This action returns all priceHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} priceHistory`;
  }

  update(id: number, updatePriceHistoryDto: UpdatePriceHistoryDto) {
    return `This action updates a #${id} priceHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} priceHistory`;
  }
}
