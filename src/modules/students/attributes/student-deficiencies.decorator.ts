import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export function IsStudentDeficiencies(required = true) {
  return applyDecorators(
    ApiProperty({ required }),
    required ? IsNotEmpty({ message: 'Informe um array de deficiências' }) : IsOptional(),
    IsArray({ message: 'Informe um array de deficiências' }),
  );
}
