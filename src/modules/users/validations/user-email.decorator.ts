import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export function IsUserEmail(required = true) {
  const MAX_CHARACTERS = 100;
  return applyDecorators(
    ApiProperty({ required }),
    required ? IsNotEmpty({ message: 'Informe um endereço de email' }) : IsOptional(),
    IsEmail({}, { message: 'Informe um endereço de email válido' }),
    MaxLength(MAX_CHARACTERS, { message: `O endereço de email deve ter no máximo ${MAX_CHARACTERS} caracteres` }),
  );
}
