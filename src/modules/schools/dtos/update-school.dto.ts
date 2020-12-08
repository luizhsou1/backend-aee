import { ApiProperty } from '@nestjs/swagger';
import { IsSchoolHasAee } from '../attributes/school-has-aee.decorator';
import { IsSchoolName } from '../attributes/school-name.decorator';
import { IsArrayOfPhone } from '../../../shared/dtos/attributes/array-of-phones.decorator';
import { Address } from '../../../shared/entities/address.entity';
import { Phone } from '../../../shared/entities/phone.entity';

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
