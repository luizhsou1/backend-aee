import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export function IsAddressNumber(required = true) {
  return applyDecorators(
    ApiProperty({ required }),
    required ? IsInt({ message: 'Informe um número de endereço do tipo inteiro' }) : IsOptional(),
  );
}
