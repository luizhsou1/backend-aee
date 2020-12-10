import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, Max, Min } from 'class-validator';

export function IsStudentRegularClassRoom(required = true) {
  return applyDecorators(
    ApiProperty({ required }),
    required ? IsNotEmpty({ message: 'Informe uma sala para o aluno' }) : IsOptional(),
    IsInt({ message: 'Informe uma valor inteiro para a sala' }),
    Min(1, { message: 'Informe um valor para a sala de [1..19]' }),
    Max(19, { message: 'Informe um valor para a sala de [1..19]' }),
  );
}
