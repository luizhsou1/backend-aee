import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export function IsUserPasswordConfirmation(optional: boolean = false) {
  return applyDecorators(
    optional ? IsOptional() : IsNotEmpty({ message: 'Informe uma confirmação de senha' }),
    MinLength(6, { message: 'A confirmação de senha deve ter no mínimo 6 caracteres' }),
  );
}
