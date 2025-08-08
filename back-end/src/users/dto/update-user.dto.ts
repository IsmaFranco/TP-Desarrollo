import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['dni']),
) {} // Omitimos el campo dni, ya que no se puede modificar
