import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export function IsUserName(optional: boolean = false) {
  const MAX_CHARACTERS = 100;
  return applyDecorators(
    optional ? IsOptional() : IsNotEmpty({ message: 'Informe um nome de usuário' }),
    MaxLength(MAX_CHARACTERS, { message: `O nome do usuário deve ter no máximo ${MAX_CHARACTERS} caracteres` }),
  );
}
