import { School } from 'src/modules/schools/school.entity';
import { IsObjectWithId } from 'src/shared/custom-decorators/is-object-with-id';
import { IsPhoneDescription } from '../attributes/phone-description.decorator';
import { IsPhoneNumberCustom } from '../attributes/phone-number-custom.decorator';

export class UpdatePhoneDto {
  @IsPhoneDescription(false)
  description: string;

  @IsPhoneNumberCustom(false)
  phoneNumber: string;

  @IsObjectWithId('school', false)
  school: School;
}
