import { ApiProperty } from '@nestjs/swagger';
import { IsSchoolHasAee } from '../attributes/school-has-aee.decorator';
import { IsSchoolName } from '../attributes/school-name.decorator';
import { IsArrayOfPhone } from '../../../shared/dtos/attributes/array-of-phones.decorator';
import { Address } from '../../../shared/entities/address.entity';
import { Phone } from '../../../shared/entities/phone.entity';

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
