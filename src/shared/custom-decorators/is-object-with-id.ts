import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ObjectWithIdDto } from '../dtos/object-with-id.dto';

export function IsObjectWithId(field: string, required = true) {
  return applyDecorators(
    ApiProperty({ type: () => ObjectWithIdDto, required }),
    required ? IsNotEmpty({ message: `Informe o campo '${field}' com pelo menos o campo 'id' preenchido` }) : IsOptional(),
  );
}
