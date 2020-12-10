import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export function IsStudentExtraAeeActivity(required = true) {
  return applyDecorators(
    ApiProperty({ required }),
    required ? IsNotEmpty({ message: 'Informe um array de atividades extras do AEE' }) : IsOptional(),
    IsArray({ message: 'Informe um array de atividades extras do AEE' }),
  );
}
