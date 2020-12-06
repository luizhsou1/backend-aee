import { IsObjectWithId } from '../../../shared/custom-decorators/is-object-with-id';
import { IsArrayOfPhone } from '../../../shared/dtos/attributes/array-of-phones.decorator';
import { Phone } from '../../phones/phone.entity';
import { School } from '../../schools/school.entity';
import { IsTeacherEmail } from '../attributes/teacher-email.decorator';
import { IsTeacherName } from '../attributes/teacher-name.decorator';
import { IsTeacherOccupationArea } from '../attributes/teacher-occupation-area.decorator';
import { IsTeacherShiftsAee } from '../attributes/teacher-shifts-aee.decorator';
import { IsTeacherSupport } from '../attributes/teacher-support.decorator';
import { TeacherShiftAee } from '../teacher-shift-aee.enum';

export class UpdateTeacherDto {
  @IsTeacherName(false)
  name: string;

  @IsTeacherEmail(false)
  email: string;

  @IsObjectWithId('school', false)
  school: School;

  @IsTeacherShiftsAee(false)
  shiftsAee: TeacherShiftAee[];

  @IsTeacherSupport(false)
  supportTeacher: boolean;

  @IsTeacherOccupationArea(false)
  occupationArea: string;

  @IsArrayOfPhone(false, false)
  phones: Phone[];
}
