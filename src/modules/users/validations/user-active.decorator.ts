import { applyDecorators } from '@nestjs/common';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export function IsUserActive(optional: boolean = false) {
  return applyDecorators(
    optional ? IsOptional() : IsNotEmpty({ message: 'Informe se o usuário está ativo' }),
    IsBoolean({ message: "Informe um valor booleano para o campo 'active'" }),
  );
}
