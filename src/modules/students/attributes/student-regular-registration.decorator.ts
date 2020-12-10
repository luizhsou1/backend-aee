import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MaxLength } from 'class-validator';

export function IsStudentRegularRegistration(required = true) {
  const MAX_CHARACTERS = 30;
  return applyDecorators(
    ApiProperty({ required }),
    required ? MaxLength(MAX_CHARACTERS, { message: `Informe a matrícula regular do aluno com no máximo ${MAX_CHARACTERS} caracteres` }) : IsOptional(),
  );
}
