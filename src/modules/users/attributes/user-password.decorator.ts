import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MinLength } from 'class-validator';

export function IsUserPassword(required = true) {
  return applyDecorators(
    ApiProperty({ required }),
    required ? MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' }) : IsOptional(),
  );
}
