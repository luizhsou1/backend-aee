import { ApiProperty } from '@nestjs/swagger';
import { IsObjectWithId } from '../../../shared/custom-decorators/is-object-with-id';
import { Address } from '../../../shared/entities/address.entity';
import { Gender } from '../../../shared/enums/gender.enum';
import { Shift } from '../../../shared/enums/shift.enum';
import { Deficiency } from '../../deficiencies/deficiency.entity';
import { Teacher } from '../../users/teacher.entity';
import { IsStudentAeeClass } from '../attributes/student-aee-class.decorator';
import { IsStudentAeeRegistration } from '../attributes/student-aee-registration.decorator';
import { IsStudentBirthDate } from '../attributes/student-birth-date.decorator';
import { IsStudentDeficiencies } from '../attributes/student-deficiencies.decorator';
import { IsStudentDocumentos } from '../attributes/student-documents.decorator';
import { IsStudentGender } from '../attributes/student-gender.decorator';
import { IsStudentName } from '../attributes/student-name.decorator';
import { IsStudentRegularClassRoom } from '../attributes/student-regular-class-room.decorator';
import { IsStudentRegularClassYear } from '../attributes/student-regular-class-year.decorator';
import { IsStudentRegularClass } from '../attributes/student-regular-class.decorator';
import { IsStudentRegularRegistration } from '../attributes/student-regular-registration.decorator';
import { IsStudentResponsibles } from '../attributes/student-responsibles.decorator';
import { IsStudentShift } from '../attributes/student-shift.decorator';
import { IsStudentTeachers } from '../attributes/student-teachers.decorator';
import { IsStudentExtraAeeActivity } from '../attributes/student-teachers.decorator copy';
import { ExtraAeeActivity } from '../extra-aee-activity.enum';
import { Responsible } from '../responsible.entity';
import { Document } from '../document.entity';

export class CreateStudentDto {
  @IsStudentName()
  name: string;

  @IsStudentAeeRegistration()
  aeeRegistration: string;

  @IsStudentRegularRegistration()
  regularRegistration: string;

  @IsStudentBirthDate()
  birthDate: string;

  @IsStudentGender()
  gender: Gender;

  @IsStudentDeficiencies(false)
  deficiencies: Deficiency[];

  @IsStudentShift()
  regularShift: Shift;

  @IsStudentRegularClassYear()
  regularClassYear: number;

  @IsStudentRegularClass()
  regularClass: string;

  @IsStudentRegularClassRoom()
  regularClassRoom: number;

  @IsStudentAeeClass()
  aeeClass: string;

  // @Column({ length: 300, nullable: true })
  // urlImage: string;

  @IsStudentTeachers(false)
  teachers: Teacher[];

  @IsObjectWithId('supportTeacher', false)
  supportTeacher: Teacher;

  @IsStudentResponsibles(false)
  responsibles: Responsible[];

  @IsStudentDocumentos(false)
  documents: Document[];

  @IsStudentExtraAeeActivity(false)
  extraAeeActivity: ExtraAeeActivity[];

  @ApiProperty({ required: false })
  address: Address;
}
