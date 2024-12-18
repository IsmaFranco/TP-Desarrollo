import { PartialType } from '@nestjs/mapped-types';
import { CreateLocalityDto } from './create-locality.dto';

export class UpdateLocalityDto extends PartialType(CreateLocalityDto) {}
