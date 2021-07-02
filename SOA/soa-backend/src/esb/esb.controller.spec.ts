import { Test, TestingModule } from '@nestjs/testing';
import { EsbController } from './esb.controller';
import { EsbService } from './esb.service';

describe('EsbController', () => {
  let controller: EsbController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EsbController],
      providers: [EsbService],
    }).compile();

    controller = module.get<EsbController>(EsbController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
