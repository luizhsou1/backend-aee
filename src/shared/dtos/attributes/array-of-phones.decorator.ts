import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer/decorators';
import { IsArray, ValidateNested } from 'class-validator';
import { Phone } from '../../../modules/old/phones/phone.entity';

export function IsArrayOfPhone(required = true, insert = true) {
  return applyDecorators(
    ApiProperty({ required }),
    IsArray({ message: insert ? 'Informe ao menos um telefone para escola' : 'É preciso ter pelo menos um telefone vinculado a escola' }),
    ValidateNested({ each: true }),
    Type(() => Phone),
  );
}
