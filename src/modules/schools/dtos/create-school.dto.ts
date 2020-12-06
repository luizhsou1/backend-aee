import { ApiProperty } from '@nestjs/swagger';
import { Address } from '../../adresses/address.entity';
import { IsSchoolHasAee } from '../attributes/school-has-aee.decorator';
import { IsSchoolName } from '../attributes/school-name.decorator';
import { Phone } from '../../phones/phone.entity';
import { IsArrayOfPhone } from '../../../shared/dtos/attributes/array-of-phones.decorator';

export class CreateSchoolDto {
  @IsSchoolName()
  name: string;

  @IsSchoolHasAee()
  hasAee: boolean;

  @ApiProperty({ required: true })
  address: Address;

  @IsArrayOfPhone()
  phones: Phone[];
}
