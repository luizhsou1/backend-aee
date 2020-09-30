import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MaxLength } from 'class-validator';

export function IsAddressCep(required = true) {
  const MAX_CHARACTERS = 10;
  return applyDecorators(
    ApiProperty({ required }),
    required ? MaxLength(MAX_CHARACTERS, { message: `O CEP deve ter no máximo ${MAX_CHARACTERS} caracteres` }) : IsOptional(),
  );
}
