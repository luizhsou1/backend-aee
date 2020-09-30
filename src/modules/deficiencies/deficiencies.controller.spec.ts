import { Test, TestingModule } from '@nestjs/testing';
import { DeficienciesController } from './deficiencies.controller';

describe('DeficienciesController', () => {
  let controller: DeficienciesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeficienciesController],
    }).compile();

    controller = module.get<DeficienciesController>(DeficienciesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
