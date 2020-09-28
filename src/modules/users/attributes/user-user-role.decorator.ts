import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { UserRole } from '../user-roles.enum';

export function IsUserRole(required = true) {
  return applyDecorators(
    ApiProperty({ required }),
    required ? IsEnum(UserRole, { message: `Informe um dos papéis a seguir: [${UserRole.ADMIN}, ${UserRole.SUPERVISOR}, ${UserRole.TEACHER}]` }) : IsOptional(),
  );
}
