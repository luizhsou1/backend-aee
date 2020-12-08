import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export function IsTeacherOccupationArea(required = true) {
  return applyDecorators(
    ApiProperty({ required }),
    required ? IsNotEmpty({ message: 'Informe à area de atuação do professor' }) : IsOptional(),
  );
}
