import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/modules/users/user-roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const userRole: UserRole = request.user.role;
    const requiredRoles: UserRole[] = this.reflector.get<UserRole[]>(
      'roles',
      context.getHandler(),
    );

    if (!requiredRoles) return true;
    if (userRole === UserRole.ADMIN) return true;

    const containsRole = requiredRoles.includes(userRole);

    return containsRole;
  }
}
