import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Gender } from '../../../shared/enums/gender.enum';

export function IsStudentGender(required = true) {
  return applyDecorators(
    ApiProperty({ required }),
    required ? IsNotEmpty({ message: 'Informe um sexo masculino (M) ou Feminino (F) para o estudante' }) : IsOptional(),
    IsEnum(Gender, { message: 'Informe um sexo masculino (M) ou Feminino (F) para o estudante' }),
  );
}
