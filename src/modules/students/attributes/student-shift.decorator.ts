import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Shift } from '../../../shared/enums/shift.enum';

export function IsStudentShift(required = true) {
  return applyDecorators(
    ApiProperty({ required }),
    required ? IsNotEmpty({ message: 'Informe um turno regular para o aluno' }) : IsOptional(),
    IsEnum(Shift, { message: 'Informe um turno regular para o aluno' }),
  );
}
