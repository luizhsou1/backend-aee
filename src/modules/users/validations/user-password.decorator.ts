import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export function IsUserPassword(optional: boolean = false) {
  return applyDecorators(
    optional ? IsOptional() : IsNotEmpty({ message: 'Informe uma senha' }),
    MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
  );
}
