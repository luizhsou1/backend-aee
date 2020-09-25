import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export function IsUserPasswordConfirmation(required = true) {
  return applyDecorators(
    ApiProperty({ required }),
    required ? IsNotEmpty({ message: 'Informe uma confirmação de senha' }) : IsOptional(),
    MinLength(6, { message: 'A confirmação de senha deve ter no mínimo 6 caracteres' }),
  );
}
