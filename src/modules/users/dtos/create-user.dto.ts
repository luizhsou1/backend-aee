import { IsUserEmail, IsUserName, IsUserPassword, IsUserPasswordConfirmation } from '../attributes';
import { IsObjectWithId } from '../../../shared/custom-decorators/is-object-with-id';
import { School } from '../../schools/school.entity';
import { IsArrayOfPhone } from '../../../shared/dtos/attributes/array-of-phones.decorator';
import { Phone } from '../../../shared/entities/phone.entity';
import { Teacher } from '../teacher.entity';

export class CreateUserDto {
  @IsUserEmail()
  email: string;

  @IsUserName()
  name: string;

  @IsUserPassword()
  password: string;

  @IsUserPasswordConfirmation()
  passwordConfirmation: string;

  @IsArrayOfPhone(false, false)
  phones: Phone[];

  @IsObjectWithId('sourceSchool', false)
  sourceSchool: School;

  @IsObjectWithId('teacher', false)
  teacher: Teacher;
}
