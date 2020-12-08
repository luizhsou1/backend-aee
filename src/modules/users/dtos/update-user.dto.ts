import { IsUserEmail, IsUserName } from '../attributes';
import { IsArrayOfPhone } from '../../../shared/dtos/attributes/array-of-phones.decorator';
import { Phone } from '../../phones/phone.entity';
import { IsObjectWithId } from '../../../shared/custom-decorators/is-object-with-id';
import { School } from '../../schools/school.entity';
import { Teacher } from '../../teachers/teacher.entity';

export class UpdateUserDto {
  @IsUserEmail()
  email: string;

  @IsUserName()
  name: string;

  @IsArrayOfPhone(false, false)
  phones: Phone[];

  @IsObjectWithId('sourceSchool', false)
  sourceSchool: School;

  @IsObjectWithId('teacher', false)
  teacher: Teacher;
}
