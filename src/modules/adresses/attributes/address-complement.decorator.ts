import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MaxLength } from 'class-validator';

export function IsAddressComplement(required = true) {
  const MAX_CHARACTERS = 100;
  return applyDecorators(
    ApiProperty({ required }),
    required ? MaxLength(MAX_CHARACTERS, { message: `Informe um complemento do endereço com no máximo ${MAX_CHARACTERS} caracteres` }) : IsOptional(),
  );
}