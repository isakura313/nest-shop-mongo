import { Test, TestingModule } from '@nestjs/testing';
import { QuestService } from './product.service';

describe('QuestService', () => {
  let service: QuestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestService],
    }).compile();

    service = module.get<QuestService>(QuestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
