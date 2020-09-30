import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MinLength } from 'class-validator';

export function IsUserPassword(required = true) {
  return applyDecorators(
    ApiProperty({ required }),
    required ? MinLength(6, { message: 'Informe uma senha com no mínimo 6 caracteres' }) : IsOptional(),
  );
}
