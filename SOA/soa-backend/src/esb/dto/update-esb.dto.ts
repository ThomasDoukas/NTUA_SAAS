import { PartialType } from '@nestjs/mapped-types';
import { CreateEsbDto } from './create-esb.dto';

export class UpdateEsbDto extends PartialType(CreateEsbDto) {}
