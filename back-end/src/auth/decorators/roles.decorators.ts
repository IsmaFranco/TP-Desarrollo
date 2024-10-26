import { SetMetadata } from '@nestjs/common';
import { Rol } from '../enums/rol.eneum';

export const ROLES_KEY = 'roles';
export const Roles = (...rol: Rol[]) => SetMetadata(ROLES_KEY, rol);
