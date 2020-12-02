import { Address } from '../../adresses/address.entity';
import { IsSchoolHasAee } from '../attributes/school-has-aee.decorator';
import { IsSchoolName } from '../attributes/school-name.decorator';
import { IsArrayOfAddress } from '../attributes/school-array-of-address.decorator';
import { IsArrayOfPhone } from '../attributes/school-array-of-phones.decorator';
import { Phone } from '../../phones/phone.entity';

export class UpdateSchoolDto {
  @IsSchoolName(false)
  name: string;

  @IsSchoolHasAee(false)
  hasAee: boolean;

  @IsArrayOfAddress(false, false)
  addresses: Address[];

  @IsArrayOfPhone(false, false)
  phones: Phone[];
}
