import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer/decorators';
import { IsArray, ValidateNested } from 'class-validator';
import { Address } from '../../../modules/old/adresses/address.entity';

export function IsArrayOfAddress(required = true, insert = true) {
  return applyDecorators(
    ApiProperty({ required }),
    IsArray({ message: insert ? 'Informe ao menos um endereço para escola' : 'É preciso ter pelo menos um endereço vinculado a escola' }),
    ValidateNested({ each: true }),
    Type(() => Address),
  );
}
