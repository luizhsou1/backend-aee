import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export function IsUserActive(required = true) {
  return applyDecorators(
    ApiProperty({ required }),
    required ? IsNotEmpty({ message: 'Informe se o usuário está ativo' }) : IsOptional(),
    IsBoolean({ message: "Informe um valor booleano para o campo 'active'" }),
  );
}
