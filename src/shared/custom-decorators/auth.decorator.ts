import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/modules/auth/role.decorator';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { UserRole } from 'src/modules/users/user-roles.enum';

export function Auth(...roles: UserRole[]) {
  return applyDecorators(
    ApiBearerAuth(),
    Roles(...roles),
    UseGuards(AuthGuard(), RolesGuard),
  );
}
