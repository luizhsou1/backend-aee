import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, Max, Min } from 'class-validator';

export function IsStudentRegularClassYear(required = true) {
  return applyDecorators(
    ApiProperty({ required }),
    required ? IsNotEmpty({ message: 'Informe um ano para o aluno' }) : IsOptional(),
    IsInt({ message: 'Informe um valor inteiro para o ano' }),
    Min(1, { message: 'Informe um valor para o ano de [1..9]' }),
    Max(9, { message: 'Informe um valor para o ano de [1..9]' }),
  );
}
