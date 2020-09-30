import { School } from 'src/modules/schools/school.entity';
import { IsObjectWithId } from 'src/shared/custom-decorators/is-object-with-id';
import { IsAddressCep } from '../attributes/address-cep.decorator';
import { IsAddressComplement } from '../attributes/address-complement.decorator';
import { IsAddressDescription } from '../attributes/address-description.decorator';
import { IsAddressNeighborhood } from '../attributes/address-neighborhood.decorator';
import { IsAddressNumber } from '../attributes/address-number-house.decorator';
import { IsAddressStreet } from '../attributes/address-street.decorator';

export class CreateAddressDto {
  @IsAddressDescription(false)
  description: string;

  @IsAddressCep()
  cep: string;

  @IsAddressNeighborhood()
  neighborhood: string;

  @IsAddressStreet()
  street: string;

  @IsAddressNumber()
  addressNumber: number;

  @IsAddressComplement(false)
  complement: string;

  @IsObjectWithId('school', false)
  school: School;
}
