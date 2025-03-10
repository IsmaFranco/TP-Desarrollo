import { applyDecorators, UseGuards } from '@nestjs/common';
import { Rol } from '../../common/enums/rol.enum';
import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../decorators/roles.decorators';

export function Auth(rol: Rol) {
  return applyDecorators(Roles(rol), UseGuards(AuthGuard, RolesGuard));
}
