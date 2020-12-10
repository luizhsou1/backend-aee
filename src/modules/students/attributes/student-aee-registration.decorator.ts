import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MaxLength } from 'class-validator';

export function IsStudentAeeRegistration(required = true) {
  const MAX_CHARACTERS = 30;
  return applyDecorators(
    ApiProperty({ required }),
    required ? MaxLength(MAX_CHARACTERS, { message: `Informe a matrícula AEE do aluno com no máximo ${MAX_CHARACTERS} caracteres` }) : IsOptional(),
  );
}
