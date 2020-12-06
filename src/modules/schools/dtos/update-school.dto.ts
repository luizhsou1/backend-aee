import { ApiProperty } from '@nestjs/swagger';
import { Address } from '../../adresses/address.entity';
import { IsSchoolHasAee } from '../attributes/school-has-aee.decorator';
import { IsSchoolName } from '../attributes/school-name.decorator';
import { Phone } from '../../phones/phone.entity';
import { IsArrayOfPhone } from '../../../shared/dtos/attributes/array-of-phones.decorator';

export class UpdateSchoolDto {
  @IsSchoolName(false)
  name: string;

  @IsSchoolHasAee(false)
  hasAee: boolean;

  @ApiProperty({ required: false })
  address: Address;

  @IsArrayOfPhone(false, false)
  phones: Phone[];
}
