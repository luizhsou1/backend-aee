import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsOptional, isPhoneNumber, MaxLength } from 'class-validator';

export function IsPhoneNumberCustom(required = true) {
  return applyDecorators(
    ApiProperty({ required }),
    required ? IsPhoneNumber('BR', { message: 'Informe um número de telefone válido' }) : IsOptional(),
  );
}
