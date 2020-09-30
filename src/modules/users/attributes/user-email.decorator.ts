import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, MaxLength } from 'class-validator';

export function IsUserEmail(required = true) {
  const MAX_CHARACTERS = 100;
  return applyDecorators(
    ApiProperty({ required }),
    required ? IsEmail({}, { message: 'Informe um endereço de email válido' }) : IsOptional(),
    MaxLength(MAX_CHARACTERS, { message: `Informe um endereço de email com no máximo ${MAX_CHARACTERS} caracteres` }),
  );
}
