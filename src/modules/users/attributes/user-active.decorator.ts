import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export function IsUserActive(required = true) {
  return applyDecorators(
    ApiProperty({ required }),
    required ? IsBoolean({ message: "Informe um valor booleano para o campo 'active'" }) : IsOptional(),
  );
}
