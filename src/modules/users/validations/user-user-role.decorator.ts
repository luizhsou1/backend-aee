import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { UserRole } from '../user-roles.enum';

export function IsUserRole(required = true) {
  return applyDecorators(
    ApiProperty({ required }),
    required ? IsOptional() : IsNotEmpty({ message: 'Informe um papél para o usuário' }),
    IsEnum(UserRole, { message: `Informe um dos papéis a seguir: [${UserRole.ADMIN}, ${UserRole.SUPERVISOR}, ${UserRole.TEACHER}]` }),
  );
}
