import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MaxLength } from 'class-validator';

export function IsStudentName(required = true) {
  const MAX_CHARACTERS = 100;
  return applyDecorators(
    ApiProperty({ required }),
    required ? MaxLength(MAX_CHARACTERS, { message: `Informe o nome do aluno com no máximo ${MAX_CHARACTERS} caracteres` }) : IsOptional(),
  );
}
