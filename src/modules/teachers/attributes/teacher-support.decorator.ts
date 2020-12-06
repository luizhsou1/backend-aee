import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export function IsTeacherSupport(required = true) {
  return applyDecorators(
    ApiProperty({ required }),
    required ? IsBoolean({ message: "Campo 'supportTeacher' deve ser do tipo 'boolean'" }) : IsOptional(),
  );
}
