import { IsUserEmail, IsUserName } from '../attributes';
import { IsArrayOfPhone } from '../../../shared/dtos/attributes/array-of-phones.decorator';
import { IsObjectWithId } from '../../../shared/custom-decorators/is-object-with-id';
import { School } from '../../schools/school.entity';
import { Phone } from '../../../shared/entities/phone.entity';
import { Teacher } from '../teacher.entity';

export class UpdateUserDto {
  @IsUserEmail()
  email: string;

  @IsUserName()
  name: string;

  @IsArrayOfPhone(false, false)
  phones: Phone[];

  @IsObjectWithId('teacher', false)
  teacher: Teacher;
}
