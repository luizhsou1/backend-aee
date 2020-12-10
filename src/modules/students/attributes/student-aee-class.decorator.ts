import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsNotEmpty, IsOptional } from 'class-validator';

export function IsStudentAeeClass(required = true) {
  return applyDecorators(
    ApiProperty({ required }),
    required ? IsNotEmpty({ message: 'Informe uma turma AEE de [A..Z]' }) : IsOptional(),
    IsAlpha('en-US', { message: 'Informe uma turma AEE de [A..Z]' }),
  );
}
