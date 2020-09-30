import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MaxLength } from 'class-validator';

export function IsAddressUf(required = true) {
  const MAX_CHARACTERS = 2;
  return applyDecorators(
    ApiProperty({ required }),
    required ? MaxLength(MAX_CHARACTERS, { message: `Informe uma UF com no máximo ${MAX_CHARACTERS} caracteres` }) : IsOptional(),
  );
}
