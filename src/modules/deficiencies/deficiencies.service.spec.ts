import { Test, TestingModule } from '@nestjs/testing';
import { DeficienciesService } from './deficiencies.service';

describe('DeficienciesService', () => {
  let service: DeficienciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeficienciesService],
    }).compile();

    service = module.get<DeficienciesService>(DeficienciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
