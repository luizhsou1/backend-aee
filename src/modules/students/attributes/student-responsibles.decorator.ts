import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export function IsStudentResponsibles(required = true) {
  return applyDecorators(
    ApiProperty({ required }),
    required ? IsNotEmpty({ message: 'Informe um array de responsáveis' }) : IsOptional(),
    IsArray({ message: 'Informe um array de responsáveis' }),
  );
}
