import { Test, TestingModule } from '@nestjs/testing';
import { EsbService } from './esb.service';

describe('EsbService', () => {
  let service: EsbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EsbService],
    }).compile();

    service = module.get<EsbService>(EsbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
