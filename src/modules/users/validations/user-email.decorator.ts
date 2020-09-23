import { applyDecorators } from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export function IsUserEmail(optional: boolean = false) {
  const MAX_CHARACTERS = 100;
  return applyDecorators(
    optional ? IsOptional() : IsNotEmpty({ message: 'Informe um endereço de email' }),
    IsEmail({}, { message: 'Informe um endereço de email válido' }),
    MaxLength(MAX_CHARACTERS, { message: `O endereço de email deve ter no máximo ${MAX_CHARACTERS} caracteres` }),
  );
}
