import { Test, TestingModule } from '@nestjs/testing';
import { LocalitiesController } from './localities.controller';
import { LocalitiesService } from './localities.service';

describe('LocalitiesController', () => {
  let controller: LocalitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocalitiesController],
      providers: [LocalitiesService],
    }).compile();

    controller = module.get<LocalitiesController>(LocalitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
