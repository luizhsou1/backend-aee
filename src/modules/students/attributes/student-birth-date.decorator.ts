import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsCustomDate } from '../../../shared/custom-decorators/is-custom-date';

export function IsStudentBirthDate(required = true) {
  return applyDecorators(
    ApiProperty({ required }),
    required ? IsNotEmpty({ message: 'Informe uma data de nascimento para o aluno' }) : IsOptional(),
    IsCustomDate({ message: 'Data de nascimento no formato Inválido' }),
  );
}
