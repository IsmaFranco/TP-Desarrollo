import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Rol } from '../../common/enums/rol.enum';
import { ROLES_KEY } from '../decorators/roles.decorators';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<Rol[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    // El payload del JWT tiene estructura { user: { rol: '...' } }
    // Por eso accedemos a user.user.rol
    const userRole = user?.user?.rol;

    if (userRole === Rol.ADMIN) {
      return true;
    }

    // check if user.rol is in roles
    return roles.indexOf(userRole) >= 0;
  }
}
