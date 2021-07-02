import { HttpModule, Module } from '@nestjs/common';
import { EsbService } from './esb.service';
import { EsbController } from './esb.controller';

@Module({
  controllers: [EsbController],
  providers: [EsbService]
})
export class EsbModule {}
