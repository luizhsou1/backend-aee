import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsNotEmpty, IsOptional } from 'class-validator';

export function IsStudentRegularClass(required = true) {
  return applyDecorators(
    ApiProperty({ required }),
    required ? IsNotEmpty({ message: 'Informe uma turma de [A..Z]' }) : IsOptional(),
    IsAlpha('en-US', { message: 'Informe uma turma de [A..Z]' }),
  );
}
