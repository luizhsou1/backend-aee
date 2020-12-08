import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MaxLength } from 'class-validator';

export function IsAddressCep(required = true) {
  const MAX_CHARACTERS = 10;
  return applyDecorators(
    ApiProperty({ required }),
    required ? MaxLength(MAX_CHARACTERS, { message: `Informe um CEP com no máximo ${MAX_CHARACTERS} caracteres` }) : IsOptional(),
  );
}
