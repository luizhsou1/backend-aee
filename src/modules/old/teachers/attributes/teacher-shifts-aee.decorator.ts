import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { TeacherShiftAee } from '../teacher-shift-aee.enum';

export function IsTeacherShiftsAee(required = true) {
  return applyDecorators(
    ApiProperty({ required }),
    required
      ? IsEnum(TeacherShiftAee, {
        each: true,
        message: `A lista de turnos deve conter apenas os valores a seguir: [${TeacherShiftAee.MORNING}, ${TeacherShiftAee.AFTERNOON}]`,
      })
      : IsOptional(),
    ArrayNotEmpty({ message: 'Informe uma lista com pelo menos um turno AEE' }),
  );
}
